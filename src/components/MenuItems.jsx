/**
 * /src/components/MenuItems.jsx
 */


import React, { Fragment } from 'react';
import { FullScreenButton } from './FullScreen'

const MenuItems = ({ itemSelected }) => {
  return (
    <>
      <FullScreenButton
        onClick={itemSelected}
      />
      <li
        className="unselectable"
        key="index"
        onClick={() => itemSelected("Index")}
      >
        Select minimal pair
      </li>

      <li
        className="unselectable"
        key="activity"
        onClick={() => itemSelected("Activity")}
      >
        Return to activity
      </li>

      <li
        className="unselectable"
        key="preferencs"
        onClick={() => itemSelected("Preferences")}
      >
        Preferences
      </li>

      <li
        className="unselectable"
        key="about"
        onClick={() => itemSelected("About")}
      >
        About this activity
      </li>

      <li
        className="unselectable"
        key="contact"
        onClick={() => itemSelected("Contact")}
      >
        Contact us
      </li>
    </>
  )
}


export default MenuItems