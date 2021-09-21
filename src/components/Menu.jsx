/**
 * /imports/ui/Menu.jsx
 *
 * The Menu consists of three parts:
 * 1. A full-height background that slides in and out
 * 2. A list of clickable item that is a child of the background
 * 3. A hamburger icon which:
 *    • Is always visible
 *    • Slides out in sync with the background when the background's
 *      right edge is flush with the icon's right edge
 *    • Slides back in in sync with the background, until the
 *      background's right edge is less than the icon's width
 *    • Becomes semi-transparent when the background is not showing
 *    • Brightenes to full opacity when the background slides out
 * Clicking on the hamburger icon makes the background slide out or
 * back in again. Clicking anywhere outside the background while it
 * is visible will make it slide back in again.
 *
 * Clicking on on of the clickable items in the list will trigger
 * that item and slide the menu back in.
 */

import React, { Component } from 'react';
import './Menu.css';
import Icon from './MenuIcon'
import MenuItems from './MenuItems'


const CLOSE_MENU_DELAY = 1000


const Items = (props) => {
  const { closeMenu, selectFromMenu, pane, className } = props

  const itemSelected = (item) => {
    closeMenu(true) // force menu to close even if timeOut is active
    if (typeof item === "string") {
      selectFromMenu(item)
    }
  }

  return <ul
    id="items"
    className={className}
    ref={pane}
  >
    <MenuItems
      itemSelected={itemSelected}
    />
  </ul>
}



class Menu extends Component {
  constructor(props) {
    super(props)

    this.pane = React.createRef()

    this.callback = props.callback // <<<<<

    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.state = { open: true }

    this.openMenu()
    setTimeout(this.closeMenu, CLOSE_MENU_DELAY)
  }


  openMenu(event) {
    if (this.ignoreOpen) {
      return
    }

    if (event) {
      this.toggleMenu(true)
    }

    const listener = this.closeMenu
    document.body.addEventListener("touchstart", listener, true)
    document.body.addEventListener("mousedown", listener, true)
  }


  closeMenu(event) {
    // Check if the click was inside the slide-out menu. If not,
    // close the menu

    if (event && (event === true || event.type === "touchstart")) {
      // Prevent the mouseup from firing right behind
      this.timeout = setTimeout(() => {
        this.timeout = 0
      }, 300)
      // console.log("Menu closeMenu timeout", this.timeOut)
    } else if (this.timeout) {
      return
    }

    const pane = this.pane.current
    if (!event || (pane && !pane.contains(event.target))) {
      this.toggleMenu(false)
      // Prevent the menu from reopening immediately if the click to
      // close was on the Icon

      this.ignoreOpen = true
      setTimeout(() => this.ignoreOpen = false, 100)
      // console.log("Menu closeMenu timeout", timeOut)

      const listener = this.closeMenu
      document.body.removeEventListener("touchstart", listener,true)
      document.body.removeEventListener("mousedown", listener, true)
    }
  }


  toggleMenu(menu_open) {
    const open = !this.state.open
    this.setState({ open })
  }


  render() {
    const itemClass = this.state.open ? "open" : ""

    return <div
        id="menu"
      >
        <Items
          {...this.props}
          className={itemClass}
          pane={this.pane}
          closeMenu={this.closeMenu}
        />
        <svg
          id="openMenu"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"

          onClick={this.openMenu}
        >
          <Icon />
        </svg>
      </div>
  }
}

export default Menu