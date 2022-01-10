/**
 * src/api/store.js
 *
 * @class Store
 *
 * A singleton instance of this class can be used as a centralized
 * store of state for all components in a project. As with setState
 * for React you can use...
 *
 *   store.setState({ property: value })
 *
 * ... to update property at the root of the store object.
 *
 * You can also use...
 *
 *   store.setState({ property:value }, ["path","to","nested","data"])
 *
 * ... where the filter array provides a path into the store where the
 * property should be saved. If the filter path does not already exist
 * it will be created.
 *
 * WARNING: If the value of any but the last of the items in the
 * filter list is not an object, then an error will be thrown
 *
 * Setting state will update the store, and will trigger any listeners
 * that are filtering for a particular path that is changed. Your
 * listeners should call this.setState() locally in the component
 * they belong to, so that the component will re-render when the
 * watched values in the store are updated.
 * 
 * Example:
 * 
 *   import { Component } from "react"
 *   import Store from "./api/store";
 * 
 *   class Example extends Component{
 *     constructor() {
 *       this.state = {}
 *       this.storeUpdated = this.storeUpdated.bind(this)
 *       Store.addListener(storeUpdated)
 *     }
 *     
 *     storeUpdated( updateObject ) {
 *       this.setState( updateObject )
 *     }
 * 
 *     render() {
 *       ...
 *     }
 *   }
 *   
 */


let storeState = {};
// <<< REMOVE WHEN NOT DEBBUGGING
window.storeState = storeState
// REMOVE WHEN NOT DEBBUGGING >>>



class Store {
  constructor() {
    this.initializeState(storeState);
    this.listeners = new Set();
    this.removeListener = this.removeListener.bind(this);
  }

  initializeState(state) {
    const keys = Object.keys(storeState)
    keys.forEach(key => delete storeState[key])

    Object.assign(storeState, state)

    return valuesMatch(storeState, state);
  }

  setState(newState, filter) {
    filter = this._sanitizeFilter(filter);
    newState = this._sanitizeState(newState, filter);

    const blocked = this._ensureFilterPathExists(storeState, filter);
    if (blocked) {
      throw new Error(
        "Cannot create path to " +
          filter +
          `\nValue ${blocked.data} found where ${blocked.filter} is requested`
      );
    }
    this.useLiveState = true;
    const result = this._getState(filter);
    if (!result) {
      debugger;
    }
    let [state, parent] = result;
    this.useLiveState = false;
    const before = JSON.parse(JSON.stringify(storeState));

    // Current state at this depth may be a stub string or number
    if (typeof state !== "object") {
      debugger;
      state = {};
      const key = filter[filter.length - 1];
      parent[key] = state;
    }

    Object.assign(state, newState);
    this._pushState(before);

    return true;
  }

  addListener(listener, filter, callNow) {
    if (typeof listener !== "function") {
      return;
    }

    filter = this._sanitizeFilter(filter); // array or false

    this.listeners.add({ listener, filter });

    if (callNow) {
      const state = this._getState(filter)
      listener(state)
    }

    return () => this.removeListener(listener, filter);
  }

  removeListener(listener, filter) {
    let listeners = this._findListenerObjects(listener, filter);

    const removed = listeners.length;

    listeners.forEach((listenerObject) => {
      this.listeners.delete(listenerObject);
      listenerObject.listener("deleted"); // debugging only
    });

    return removed;
  }

  _getState(filter) {
    filter = this._sanitizeFilter(filter);
    const state = filter
                ? this._getFilteredState(filter)
                : [storeState, null]; // storeState will always be an object

    return state;
  }

  _sanitizeFilter(filter) {
    if (typeof filter === "string") {
      // Allow a top-level key to be provide as a simple string
      filter = [filter];
    } else if (Array.isArray(filter)) {
      // Ensure that caller cannot alter filter inadvertently
      filter = [...filter];
    } else {
      filter = false;
    }

    return filter;
  }

  _sanitizeState(stateObject, filter) {
    if (typeof stateObject !== "object") {
      if (!filter) {
        throw new Error("Cannot setState for " + stateObject);
      } else {
        const key = filter.pop();
        stateObject = { [key]: stateObject };
      }
    }

    return stateObject;
  }

  _ensureFilterPathExists(state, filter) {
    if (!filter || !filter.length) {
      return;
    }

    filter = filter.slice();
    const key = filter.shift();
    let data = state[key];

    if (data === undefined) {
      // Add an empty stub
      state[key] = data = {};
    }

    if (filter.length) {
      if (typeof data !== "object") {
        // Cannot overwrite existing data
        filter.unshift(key);
        return { data, filter };
      } else {
        return this._ensureFilterPathExists(data, filter);
      }
    }
  }

  /**
   * Called by _getState, _pushState and recursively
   * 
   * @param {array|undefined}  filter 
   * @param {object|undefined} state 
   * @param {array|undefined}  error 
   * @param {integer }         depth 
   * 
   * @returns array: [<filtered state>, ]
   * 
   * May throw an error if the filter is not valid.
   */
  _getFilteredState(filter, state = storeState, error = [], depth = 0) {
    let branch;

    if (!Array.isArray(filter)) {
      const type = typeof filter;
      throw new Error(`Unexpected filter type: ${type}\n${filter}`);
    } else if (!filter.length) {
      return [state, null];
    }

    // Tunnel into state, but don't modify the original filter
    filter = filter.slice();
    const key = filter.shift();

    if (typeof key !== "string") {
      error.push(`Filter contains non-string key at index (${depth})`);
      return;
    }

    branch = state[key];

    if (filter.length) {
      // We should go deeper, if we can...
      if (typeof branch !== "object") {
        return; // the requested state data doesn't exist
      }

      // We can go deeper, but there may be an error deeper in
      const result = this._getFilteredState(filter, branch, error, depth + 1);

      if (error.length && !depth) {
        // The recursive action completed, but there was an error deeper in
        filter.unshift(key);
        const message = error[0] + `\nfilter: ${JSON.stringify(filter)}`;
        throw new Error(message);
      }

      return result;
    } else {
      // We've reached the end of the filter array
      if (!this.useLiveState) {
        // Return a clone so that storeState cannot be altered externally
        branch = JSON.parse(JSON.stringify({ [key]: branch }));
        return branch;
      }

      return [branch, state];
    }
  }

  _findListenerObjects(listener, filter) {
    const listeners = Array.from(this.listeners).filter((listenerObject) => {
      if (!listener || listenerObject.listener === listener) {
        return !filter || listenerObject.filter === filter;
      }
      return false // unnecessary but it keeps the linter happy
    });

    return listeners;
  }

  _pushState(before) {
    const after = storeState;

    this.listeners.forEach(({ listener, filter }) => {
      if (filter) {
        const oldState = this._getFilteredState(filter, before);
        const newState = this._getFilteredState(filter, after);
        if (!valuesMatch(oldState, newState)) {
          listener(newState);
        }
      } else {
        listener(after);
      }
    });
  }
}

const store = new Store(); // creates a singleton instance
export default store;



//  UTILITY // UTILITY // UTILITY /*/ UTILITY // UTILITY // UTILITY  //
// ******** See ~/Repos/lib/utilities.js for latest version ******** //

function valuesMatch(a, b) {
  if (!a || typeof a !== "object" || !b || typeof b !== "object") {
    return false;
  }

  const propsA = Object.getOwnPropertyNames(a);
  const propsB = Object.getOwnPropertyNames(b);

  if (propsA.length !== propsB.length) {
    return false;
  }

  const total = propsA.length;
  for (let ii = 0; ii < total; ii += 1) {
    const prop = propsA[ii];

    if (a[prop] !== b[prop]) {
      return false;
    }

    if (!removeFrom(propsB, prop)) {
      // prop is undefined in a and missing in b
      return false;
    }
  }

  return true;
};