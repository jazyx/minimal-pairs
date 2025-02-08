/**
 * /imports/tools/generic/utilities.js
 *
 * Provides a set of re-usable functions which can be imported
 * anywhere
 */

/// COLOR FUNCTIONS //

/**
 * @param {String} color     Accepted formats:
 *                           HEX
 *                             "RGB"
 *                             "#RGB"
 *                             "RRGGBB"
 *                             "#RRGGBB"
 *                           HSL
 *                             "hsl(412.523,50%,40%)"   <<< percentages
 *                             "HSL(412.523, 0.5, 0.4)" <<< ratios
 * @return ["RR", "GG", "BB"]
 */
export const rgbify = (color) => {
  if (color.substring(0, 3).toLowerCase() === "hsl") {
    return HSLtoRGB(color);
  }

  if (color[0] === "#") {
    color = color.slice(1);
  }

  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }

  const hex = parseInt(color, 16);

  return [
    hex >> 16, // red
    (hex >> 8) & 0x00ff, // green
    hex & 0xff, // blue
  ];
};

export const tweenColor = (color1, color2, ratio) => {
  const rgb1 = rgbify(color1);
  const rgb2 = rgbify(color2);

  const hex = rgb1.map((value, index) => {
    value = Math.round(value - (value - rgb2[index]) * ratio);
    value = Math.max(0, Math.min(value, 255));

    return (value < 16 ? "0" : "") + value.toString(16);
  });

  return "#" + hex.join("");
};

export const toneColor = (color, ratio) => {
  const prefix = color[0] === "#";

  if (prefix) {
    color = color.slice(1);
  }

  const rgb = rgbify(color).map((value) => {
    value = Math.floor(Math.max(0, Math.min(255, value * ratio)));
    return (value < 16 ? "0" : "") + value.toString(16);
  });

  return (prefix ? "#" : "") + rgb.join("");
};


/**
 * @param {String} color     Accepted formats:
 *                           HEX
 *                             "RGB"
 *                             "#RGB"
 *                             "RRGGBB"
 *                             "#RRGGBB"
 *                           HSL
 *                             "hsl(412.523,50%,40%)"   <<< percentages
 *                             "HSL(412.523, 0.5, 0.4)" <<< ratios
 * @param {Number} opacity   0.0 - 1.0
 * @return "rgba(rrr, ggg, bbb, aaa)", where values are numbers
 */
export const translucify = (color, opacity) => {
  if (color[0] === "#") {
    color = color.slice(1);
  }

  const rgb = rgbify(color);

  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
};

// https://stackoverflow.com/a/20129594/1927589
// https://qph.fs.quoracdn.net/main-qimg-aaa9a544d797f1109b29c55814319195.webp
export const getColor = ({ number, s = 0.5, l = 0.33, format = "hsl" }) => {
  const h = number * 137.50776405; // ≈ golden angle: 180*(3-√5)

  s = Math.max(0, Math.min(s, 1));
  l = Math.max(0, Math.min(l, 1));

  switch (format.toLowerCase()) {
    case "rgb":
      return hsl2rgb(h, s, l);

    case "hex":
      return hsl2hex(h, s * 100, l * 100);

    default:
      // "hsl"
      return `hsl(${h},${s * 100}%,${l * 100}%)`;
  }
};

// https://stackoverflow.com/a/54014428/1927589
// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
export const hsl2rgb = (h, s, l) => {
  let a = s * Math.min(l, 1 - l);
  let f = (n, k = (n + h / 30) % 12) =>
    l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
};

// https://stackoverflow.com/a/44134328/1927589
export const hsl2hex = (h, s, l) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * @param {String} color     Accepted formats:
 *                           HSL
 *                             "hsl(412.523,50%,40%)" <<< percentages
 *                             "412.523, 0.5, 0.4"    <<< ratios
 * @return ["RR", "GG", "BB"]
 */
export const HSLtoRGB = (colorString) => {
  // "hsl(412.523,50%,40%)" <<< percentages
  // "412.523, 0.5, 0.4"    <<< ratios
  let rgb = [0, 0, 0];

  const regex =
    /(hsl\s*\(\s*)?([0-9.]+)\s*,\s*([0-9.]+)(%?)\s*,\s*([0-9.]+)(%?)\s*\)?/;
  const match = regex.exec(colorString);

  if (match) {
    let h = parseFloat(match[2], 10);
    let s = parseFloat(match[3], 10);
    let l = parseFloat(match[5], 10);

    while (h > 360) {
      h -= 360;
    }
    while (h < 0) {
      h += 360;
    }
    if (match[4]) {
      s /= 100;
    }
    s = Math.max(0, Math.min(s, 1));
    if (match[6]) {
      l /= 100;
    }
    l = Math.max(0, Math.min(l, 1));

    rgb = hsl2rgb(h, s, l) // [<0.0-1.0>, <0.0-1.0>, <0.0-1.0>]
      .map((number) => Math.round(number * 255));
  }

  return rgb;
};

/**
 * @param   {<type>}  color   Must be a color (rgb or hex)
 * @param   {object}  values  May be an object with the same
 *                            structure as defaults
 * @return  {object}  Returns an object with the same structure as
 *                    defaults, but where each value is a color
 */
export const buttonColors = (color, values) => {
  const output = {
    restBg: 1,
    restTint: 1.5,
    restShade: 0.75,

    overBg: 1.1,
    overTint: 1.65,
    overShade: 0.667,

    downBg: 0.95,
    downTint: 1.333,
    downShade: 0.6,
  };
  const keys = Object.keys(output);

  (function merge(input) {
    if (typeof input === "object") {
      keys.forEach((key) => {
        const value = input[key];
        if (!isNaN(value)) {
          if (value > 0) {
            output[key] = value;
          }
        }
      });
    }
  })();

  keys.forEach((key) => (output[key] = toneColor(color, output[key])));

  return output;
};

/// ARRAY FUNCTIONS ///

export const removeFrom = (array, item, removeAll) => {
  let removed = 0;

  // If `item` is an array of items or functions, treat recursively
  if (Array.isArray(item)) {
    removed = item.reduce((excess, entry) => {
      excess += removeFrom(array, entry, removeAll);
      return excess;
    }, 0);

    return removed;
  }

  // If we get here, item is an individual items or function
  let index, found;

  do {
    if (typeof item === "function") {
      index = array.findIndex(item);
    } else {
      index = array.indexOf(item);
    }

    found = !(index < 0);
    if (found) {
      array.splice(index, 1);
      removed += 1;
    }
  } while (removeAll && found);

  return removed;
};

export const getDifferences = () => {
  let previous = [];

  return (array) => {
    const plus = array.filter((item) => previous.indexOf(item) < 0);
    const minus = previous.filter((item) => array.indexOf(item) < 0);
    previous = [...array];

    return { plus, minus };
  };
};

export const trackChanges = (array) => {
  let previous = [...array];

  return () => {
    const plus = array.filter((item) => previous.indexOf(item) < 0);
    const minus = previous.filter((item) => array.indexOf(item) < 0);
    previous = [...array];

    return { plus, minus };
  };
};

export const shuffle = (a) => {
  let ii = a.length;

  while (ii) {
    const jj = Math.floor(Math.random() * ii);
    ii -= 1;
    [a[ii], a[jj]] = [a[jj], a[ii]];
  }

  return a; // for chaining
};

export const getRandom = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * @returns either 0 or 1 but never more than 4 0s or 1s in a row
 *          and most likely not more than 3 in a row
 */
export const getBooleanGenerator = () => {
  const lastFourValues = [0, 1, 0, 1];

  const randomBoolean = (hint = 0) => {
    const random = Math.max(0, Math.min(1, Math.random() * 2 + hint));
    return Math.floor(random); // 0 | 1
  };

  return function booleanGenerator() {
    let output;

    const sum = lastFourValues.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    switch (sum) {
      case 0:
        output = 1;
        break;
      case 1:
        output = randomBoolean(0.5);
        break;
      case 3:
        output = randomBoolean(-0.5);
        break;
      case 4:
        output = 0;
        break;
      default:
        output = randomBoolean();
    }

    lastFourValues.shift();
    lastFourValues.push(output);

    return output;
  };
};

export const arrayOverlap = (array1, array2) => {
  if (!array1 || !array1.length || !array2 || !array2.length) {
    return [];
  }

  return array1.filter((item) => array2.includes(item));
};

export const getUnused = (source, used, tolerateDuplicates) => {
  const unused = source.slice(0);
  used.forEach((item) => removeFrom(unused, item));
  let item = getRandomFromArray(unused);

  if (!item && tolerateDuplicates) {
    // May return the same item multiple times,
    // rather than creating a smooth spread
    item = getRandomFromArray(source);
  }

  return item;
};

// MOUSE/TOUCH EVENT FUNCTIONS ///
// https://gist.github.com/blackslate/6f77d3acd2edc2a286cff6d607cf3ce8

/**
 * DETECT MOVEMENT
 * ---------------
 * Sometimes you want a simple click to perform one action and a drag
 * on the same element to perform a different action. You can create two
 * methods, (say) startDrag() and clickAction(), and use the following
 * function (plus the functions below) to determine which of the two
 * actions will be triggered.
 *
 * let dragMe = <your draggable element>
 *   , cancelDrag // set to a function that will cancel dragging
 *
 * const drop = () => {
 *   // Do whatever needs to be done when dragged element is dropped
 * }
 *
 * const startDrag = (event) => {
 *   const options = {
 *     event
 *   , drop
 *   }
 *
 *   startTracking(options)
 * }
 *
 * const checkForDrag = (event) => {
 *   event.preventDefault()
 *
 *   detectMovement(event, 10, 250)
 *   .then(() => startDrag(event) )
 *   .catch(clickAction)
 * }
 *
 * startDrag will be called if the mouse or touch point moves 10 pixels
 * or more within 250 milliseconds; clickAction will be called if there
 * is no movement within this time, or if the mouse/touch pressure is
 * released before this time.
 *
 * TRACKING
 * --------
 * When dragging an element, you generally want one function to be
 * called for any movement, and another to be triggered when the element
 * is dropped. You don't want to have to create separate code for
 * mouse events and touch events, even if these events generate
 * the current x and y positions in different ways.
 *
 * The startTracking() function allows you to provide a starting
 * event (mouseDown or touchStart) and two functions that should be
 * called: one for mousemove|touchmove and the other for mouseup|
 * touchend.
 *
 * X and Y COORDINATES
 * -------------------
 * You can use getPageXY() to get the current mouse position or the
 * position of the first touch point, without worrying about whether
 * the input is from a mouse or a touch screen.
 *
 * ===============================================================
 * NOTE FOR REACT USERS CREATING WEB APPS FOR TOUCH SCREEN DEVICES
 * ===============================================================
 * React refuses to add non-passive (cancellable) event listeners for
 * touchstart. With a passive event listener, the whole page is likely
 * to move at the same time as the dragged element, which is probably
 * not what you want.
 *
 * As a result, you should NOT use React to pass an onTouchStart
 * function the same way that you would pass an onMouseDown function to
 *  your draggable element.
 *
 * Instead, you need to apply your touchstart event listener directly
 * to the DOM element that you want to drag with useEffect, as shown
 * below.
 *
 * const dragRef = useRef()
 *
 * return (
 *   <main>
 *     <div
 *       onMouseDown={checkForDrag}
 *       ref={dragRef}
 *     />
 *   </main>
 * );
 *
 * useEffect(() => {
 *   dragMe = dragRef.current
 *   dragMe.addEventListener("touchstart", checkForDrag, false)
 * })
 */

export const getPageXY = (event) => {
  if (event.targetTouches && event.targetTouches.length) {
    event = event.targetTouches[0] || {};
  }

  return { x: event.pageX, y: event.pageY };
};

/**
 * Returns a promise which will be:
 * * resolved if the mouse or touch moves more than triggerDelta
 *   pixels in any direction
 * * rejected if the mouse is released or the touch gesture ends before
 *   moving that far, or if <timeOut> number of milliseconds elapses
 *   before any movement occurs.
 *
 * @param  {event}  event should be a mousedown or touchstart event
 * @param  {number} triggerDelta should be the number of pixels of
 *                          movement that will resolve the promise
 * @param  {number} timeOut may be a number of milliseconds. Defaults
 *                          to 250. Use 0 for no timeOut rejection.
 *
 * @return  {promise}
 */
export const detectMovement = (event, triggerDelta, timeOut) => {
  const trigger2 = triggerDelta * triggerDelta;
  timeOut = isNaN(timeOut) ? 250 : Math.abs(timeOut);

  function movementDetected(resolve, reject) {
    const { x: startX, y: startY } = getPageXY(event);
    const options = { event, drag, drop };
    const cancelDrag = startTracking(options);

    // Check if the mouse/touch has moved more than triggerDelta
    // pixels in any direction, and resolve promise if so.
    function drag(event) {
      const { x, y } = getPageXY(event);
      const deltaX = startX - x;
      const deltaY = startY - y;
      const delta2 = deltaX * deltaX + deltaY * deltaY;

      if (delta2 > trigger2) {
        cancelDrag();
        resolve();
      }
    }

    // Reject promise if the mouse is released before the mouse/touch
    // moved triggerDelta pixels in any direction.
    function drop() {
      cancelDrag();
      reject("release");
    }

    if (timeOut) {
      setTimeout(() => reject("timeOut"), timeOut);
    }
  }

  return new Promise(movementDetected);
};

/**
 * Called by defaultDragAction
 *
 * @param {DOMElement} element
 * @returns  element's closest parent which has a position other than
 *           static
 */
const getNonStaticParent = (element) => {
  let parent;
  while (element.tagName !== "BODY" && (parent = element.parentNode)) {
    const style = getComputedStyle(parent);
    if (style.getPropertyValue("position") !== "static") {
      break;
    }

    element = parent;
  }

  return parent;
};

/**
 * If no drag function is supplied, move the target (or its parent)
 * with the mouse or touch. Called by startTracking.
 *
 * @param {MouseEvent | TouchEvent} event
 * @param {String?} selector
 *                  If selector is a string, it will be used to find
 *                  the closest matching parent (or the target itself)
 *                  as the element to drag
 * @param {Objec?}  offset
 *                  If offset is an object with the format
 *                  { x: <Number>, y: <Number> }, then it will be used
 *                  for defining the offset from the drag point to the
 *                  top left of the dragged element.
 * @returns         a function in a closure, which knows which target
 *                  and offset to use
 */
const defaultDragAction = (event, selector, rider, offset) => {
  const target =
    typeof selector === "string"
      ? event.target.closest(selector) // select an ancestor
      : event.target;

  const offsetGiven =
    typeof offset === "object" && !isNaN(offset.x) && !isNaN(offset.y);

  if (!offsetGiven) {
    // Move target relative to its closest non-static parent
    const fix = getNonStaticParent(target);
    const { left: fixLeft, top: fixTop } = fix.getBoundingClientRect();
    const { x, y } = getPageXY(event);
    const { left, top } = target.getBoundingClientRect();
    offset = { x: left - fixLeft - x, y: top - fixTop - y };
  }

  const drag = (event) => {
    let { x, y } = getPageXY(event);
    x += offset.x;
    y += offset.y;

    target.style.left = x + "px";
    target.style.top = y + "px";

    if (typeof rider === "function") {
      rider(event, { x, y });
    }
  };

  return drag;
};

// The prevent default function needs to be outside startTracking
// so that the exact same listener function (rather than a duplicate)
// can be  removed later.
const noDefault = (event) => event.preventDefault();

/**
 * Starts listening for a drag and drop operation, and follows it
 * through to the end. The operation can be cancelled at any time
 * by calling the function returned by startTracking.
 *
 * @param {Object}
 *          event: may be either a MouseDown event or a TouchStart event
 *           drag: may be a custom function to call for dragging. If
 *                 not, a generic function will be used. It may also be
 *                 a CSS selector to define which parent of the clicked
 *                 target should be dragged.
 *           drop: a callback function that will be called when the
 *                 dragging stops
 *         offset: may be an object of the form { x: Number, y: Number}
 *                 to be used by the defaultDragAction function.
 *
 * @returns        a function that can be called to cancelDrag
 *                 (before it starts). However, this function will be
 *                 called automatically when the drag process ends.
 */
export function startTracking({ event, drag, rider, drop, offset }) {
  const body = document.body;
  const dragOption = { passive: false }; // capture is false by default

  let move, end;

  if (event.type === "touchstart") {
    move = "touchmove";
    end = "touchend";
  } else {
    move = "mousemove";
    end = "mouseup";
  }

  switch (typeof drag) {
    case "function":
      // Use the custom function
      break;
    default:
      // case "string":
      // Use the default function. `drag` may be a parent selector.
      drag = defaultDragAction(event, drag, rider, offset);
      break;
  }

  // cancelDrag may be called from outside, before any drag or
  // drop events have occurred, in which case `event` may be
  // undefined. If the call was triggeerd by an `end` event, then
  // the drop function will be called.
  const cancelDrag = (event) => {
    body.removeEventListener(move, drag, false);
    body.removeEventListener(end, cancelDrag, false);
    // Restore page scrolling on touch devices now that drag is over
    document.removeEventListener("touchstart", noDefault);

    if (event && typeof drop === "function") {
      drop(event);
    }
  };

  body.addEventListener(move, drag, false);
  body.addEventListener(end, cancelDrag, false);
  // Prevent the page scrolling during drag, on touch devices
  document.addEventListener("touchstart", noDefault, dragOption);

  return cancelDrag;
}

/// RECT & OBJECT FUNCTIONS ///

export const intersect = (rect1, rect2) => {
  return (
    rect1.x < rect2.right &&
    rect2.x < rect1.right &&
    rect1.y < rect2.bottom &&
    rect2.y < rect1.bottom
  );
};

export const intersection = (rect1, rect2) => {
  const left = Math.max(rect1.left || rect1.x || 0, rect2.left || rect2.x || 0);
  const right = Math.min(
    rect1.right || rect1.left + rect1.width || 0,
    rect2.right || rect2.left + rect2.width || 0
  );
  if (!(left < right)) {
    return 0;
  }

  const top = Math.max(rect1.top || rect1.y || 0, rect2.top || rect2.y || 0);
  const bottom = Math.min(
    rect1.bottom || rect1.top + rect1.height || 0,
    rect2.bottom || rect2.top + rect2.height || 0
  );
  if (!(top < bottom)) {
    return 0;
  }

  const x = left;
  const y = top;
  const width = right - x;
  const height = bottom - y;

  return { x, y, left, right, top, bottom, width, height };
};

export const union = (rects) => {
  const [rect, ...rest] = rects;
  let { left, right, top, bottom } = rect;

  rest.forEach((rect) => {
    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
    top = Math.min(top, rect.top);
    bottom = Math.max(bottom, rect.bottom);
  });

  const x = left;
  const y = top;
  const width = right - left;
  const height = bottom - top;

  return { x, y, left, right, top, bottom, width, height };
};

export const pointWithin = (x, y, rect) => {
  if (typeof x === "object") {
    if (typeof rect !== "object" && typeof y === "object") {
      rect = y;
      y = x.y;
      x = x.x;
    }
  }
  return rect.x <= x && rect.y <= y && rect.right > x && rect.bottom > y;
};

/**
 * Calculates which fraction of rect shares it area with container
 */
export const overlap = (rect, container) => {
  let overlap = intersection(rect, container); // 0 or rect object

  if (overlap) {
    const width = rect.width || rect.left - rect.right;
    const height = rect.height || rect.bottom - rect.top;
    overlap = (overlap.width * overlap.height) / (width * height);
  }

  return overlap;
};

export const valuesMatch = (a, b) => {
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

export const valuesDontMatch = (a, b) => {
  const nonMatching = {};

  if (!a || typeof a !== "object" || !b || typeof b !== "object") {
    return { a, b };
  }

  const propsA = Object.getOwnPropertyNames(a);
  const propsB = Object.getOwnPropertyNames(b);

  propsA.forEach((prop) => {
    if (propsB.indexOf(prop) < 0) {
      nonMatching[prop] = ["delete", a[prop]];
    } else {
      removeFrom(propsB, prop);

      const valueA = a[prop];
      const valueB = b[prop];

      // if (path) {
      //   prop = path + "."+ prop
      // }

      if (typeof valueA === "object" && typeof valueB === "object") {
        const nested = valuesDontMatch(valueA, valueB);
        if (nested) {
          nonMatching[prop] = nested;
        }
      } else if (valueA !== valueB) {
        nonMatching[prop] = ["change", getString(valueA), getString(valueB)];
      }
    }
  });

  propsB.forEach((prop) => {
    if (propsA.indexOf(prop) < 0) {
      // if (path) {
      //   prop = path + "."+ prop
      // }

      nonMatching[prop] = ["insert", getString(b[prop])];
    }
  });

  if (Object.keys(nonMatching).length) {
    return nonMatching;
  }
};

export const deleteFrom = (object, key, removed) => {
  if (typeof removed !== "object") {
    removed = {};
  }

  // If `key` is an array of keys, treat recursively
  if (Array.isArray(key)) {
    key.forEach((entry) => deleteFrom(object, entry, removed));
    return removed;
  } else if (key === undefined) {
    key = (key, value) => value === undefined || value === null;
  }

  // If we get here, key is an individual item
  if (typeof key === "function") {
    const keys = Object.keys(object);
    keys.forEach((property) => {
      const value = object[property];
      const deleteIt = key(property, value);
      if (deleteIt) {
        removed[property] = value;
        delete object[property];
      }
    });
  } else if (object.hasOwnProperty(key)) {
    removed[key] = object[key];
    delete object[key];
  }

  return removed;
};

// FONTS //

export const getFontFamily = (ff) => {
  const start = ff.indexOf("family=");
  if (start === -1) return "sans-serif";
  let end = ff.indexOf("&", start);
  if (end === -1) end = undefined;
  ff = ff.slice(start + 7, end).replace("+", " ");
  ff = '"' + ff + '"';
  return ff; // + ', sans-serif'
};

// ENCRYPTION

// by bryc https://stackoverflow.com/a/52171480/1927589
export const hash = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

// IMAGES //

// Inspired by https://ourcodeworld.com/articles/read/683/how-to-remove-the-transparent-pixels-that-surrounds-a-canvas-in-javascript
// MIT http://rem.mit-license.org
export const trimImage = (image) => {
  const c = document.createElement("canvas");
  c.width = image.width;
  c.height = image.height;

  const ctx = c.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const copy = document.createElement("canvas").getContext("2d");
  const pixels = ctx.getImageData(0, 0, c.width, c.height);
  const l = pixels.data.length;
  const bound = {
    top: null,
    left: null,
    right: null,
    bottom: null,
  };
  let ii, x, y;

  // Iterate over every pixel to find the highest
  // and where it ends on every axis ()
  for (ii = 0; ii < l; ii += 4) {
    if (pixels.data[ii + 3] !== 0) {
      x = (ii / 4) % c.width;
      y = ~~(ii / 4 / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  // Calculate the height and width of the content
  const trimHeight = bound.bottom - bound.top;
  const trimWidth = bound.right - bound.left;
  const trimmed = ctx.getImageData(
    bound.left,
    bound.top,
    trimWidth,
    trimHeight
  );

  // console.log(bound)

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);

  // Return an image
  const trimmedImage = new Image();
  trimmedImage.src = copy.canvas.toDataURL();

  return trimmedImage;
};
//
// window.trimImage = trimImage

// STRINGS //

/** Adds customizable inserts to a string (e.g. Welcome <username>)
 *
 * @param      {string}  phrase   string OR
 *                                { simple:  "Log in"
 *                                , replace: "Log in as ^0"
 *                                }
 * @param     {object}   options  { "^0": "admin", ... }
 *
 * @return    {string}   string (with customized inserts)
 */
export const substitute = (phrase, options) => {
  if (options && typeof options === "object") {
    if (typeof phrase === "object") {
      phrase = phrase.replace;
    }

    for (let key in options) {
      phrase = phrase.replace(key, options[key]);
    }
  } else if (typeof phrase === "object") {
    phrase = phrase.simple;
  }

  // Replace underscores with non-breaking spaces
  phrase = phrase.replace(/_/g, " ");

  return phrase;
};

/**
 * Returns the best localized string from a map of phrases
 *
 * @param   {object}  phraseData   { ...
 *                                 , "co-DE": "regional string"
 *                                 , "co": "generic string"
 *                                 , "xx": {
 *                                     simple:  "Log in"
 *                                   , replace: "Log in as ^0"
 *                                   }
 *                                 , "zz": "String with ^0 to replace"
 *                                 , ...
 *                                 }
 * @param   {string}  code         language code ≈ "co" or "co-DE"
 * @param   {object}  options      { "^0": "admin", ... }
 *                                 OR
 *                                 "as_is", in which case any object
 *                                 containing simple and replace
 *                                 strings will be returned as an
 *                                 object
 *                                 OR
 *                                 other values are ignored
 *
 * @return  {string}  "<Missing>" or the localized string
 */
export const getLocalized = (phraseData, code = "en", options) => {
  let phrase = phraseData[code];

  if (!phrase) {
    // Check if there is a more generic phrase without the region
    const stripRegex = /-\w+/;
    code = code.replace(stripRegex, ""); // "co-DE" => "co"
    phrase = phraseData[code];

    if (!phrase) {
      // Use any regional dialect of English as a fallback
      const available = Object.keys(phraseData);
      code = available.find((key) => key.replace(stripRegex) === "en");

      if (code) {
        phrase = phraseData[code];
      } else {
        // Use the first available language
        phrase = phraseData[available[0]];
      }

      if (!phrase) {
        phrase = "<Missing>";
      }
    }
  }

  if (options !== "as_is") {
    phrase = substitute(phrase, options);
  }

  return phrase;
};

/** Selects a localized string from an array and customizes it
 *  replacing any (visible) underscores with (invisible)
 *  non-breaking spaces
 *
 * @param      {string}  cue     string cue value from corpus
 * @param      {string}  code    string language code, like "co-DE"
 * @param      {array}   corpus  [ { "cue": "unique_string"
 *                                 , "co-DE": "fixed string"
 *                                 , "co":    "variable string ^0"
 *                                 , ...
 *                                 }
 *                               , ...
 *                               ]
 * @param     {object}   options  { "^0": "changeable part", ...}
 *
 * @return    {string}   '***cue***' or localized string with &nbsp;
 */
export const localize = (cue, code, corpus, options) => {
  let phrase;

  const phraseData = corpus.find((phrase) => phrase.cue === cue);

  if (phraseData) {
    phrase = getLocalized(phraseData, code, options);
  }

  if (!phrase) {
    console.log(
      "Not found — cue:",
      cue,
      "code:",
      code,
      "phraseData:",
      phraseData
    );
    phrase = "***" + cue + "***";
  }

  return phrase;
};

export const getString = (item) => {
  const type = typeof item;
  try {
    switch (type) {
      case "undefined":
        return "undefined";
      case "string":
      case "object":
        return item;
      default:
        if (item.toString) {
          return item.toString();
        } else {
          return item;
        }
    }
  } catch {
    return "Unable to convert " + type + ": " + item;
  }
};

// HTML ELEMENTS //

/** Returns index of the child of parentTag that contains element
 *
 * This is useful when you want to find (for instance) which list
 * item was selected, given that the event occurred on a child of the
 * list item.
 *
 * @param    {<type>}          element    An HTML element
 * @param    {string}          parentTag  The string tag of the parent
 *                                        of the element that contains
 *                                        `element`. "UL" by default.
 * @return   {integer}  -1 if element is not valid or if it does not
 *                      have a parent with the given tag, Non-negative
 *                      integer if the element's parent is found.
 */
export const getElementIndex = (element, parentTag) => {
  let index = -1;

  if (element instanceof HTMLElement) {
    parentTag = typeof parentTag === "string" ? parentTag.toUpperCase() : "UL";

    while (element && element.parentNode.tagName !== parentTag) {
      element = element.parentNode;
    }

    if (element) {
      const siblings = [].slice.call(element.parentNode.children);
      index = siblings.indexOf(element);
    }
  }

  return index;
};
