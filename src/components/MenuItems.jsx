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
        onClick={() => itemSelected("Select")}
      >
        Select phoneme pair
      </li>

      <li
        className="unselectable"
        key="preferences"
        onClick={() => itemSelected("Preferences")}
      >
        Preferences
      </li>

      { window.location.hostname === "localhost" && <li
        className="unselectable"
        key="users"
        onClick={() => itemSelected("Users")}
      >
        Manage users
      </li>}

      <li
        className="unselectable"
        key="review"
        onClick={() => itemSelected("Review")}
      >
        Review
      </li>

      <li
        className="unselectable primary"
        key="activity"
        onClick={() => itemSelected("Activity")}
      >
        Return to activity
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