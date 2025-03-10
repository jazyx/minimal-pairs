/**
 * src/views/Users.jsx
 */


import React, { useContext, useState, useEffect } from 'react'
import { PreferencesContext, UserContext } from '../contexts/'
import './Users.css'


const Users = ({ startActivity }) => {
  const { users } = useContext(PreferencesContext)
  const { user, chooseUser } = useContext(UserContext)
  const [ id, setId ] = useState(user)
  

  const prepareUser = ({ target }) => {
    const { dataset } = target
    const { id } = dataset
    const userData = users[id]
    const { name } = userData
    setId(id)
  }


  const selectUser = event => {
    event.preventDefault()
    console.log("id:", id)
    chooseUser(id)
    startActivity()
  }


  // Ensure the default user is shown first and the Guest user
  // (id: "0") is at the end of the list.
  const defaultFirstGuestLast = ([a, A], [b, B]) => {
    if (a === "0") {
      return 1 // always place Guest with id: "0" last

    } else if (b === "0") {
      return -1

    } else if (A.isDefault) {
      return -1

    } else if (B.isDefault) {
      return 1
    } 
  }


  const userList = (() => {
    const entries = Object.entries(users)
      .sort(defaultFirstGuestLast)

    return entries.map(([ userId, { name, isDefault }]) => {
      let className = ( (isDefault ? "default" : "")
                      + ((userId == id) ? " selected" : "")
                      ).trim()
      if (!className) {
        className = null
      }

      return (
        <li
          key={userId}
          className={className}
          data-id={userId}
          onClick={prepareUser}
        >
          {name}
        </li>
      )
    })
  })()


  const applyEnterKey = () => {
    const treatKeyDown = event => {
      if (event.key === "Enter") {
        selectUser(event)
      }
    }

    document.body.addEventListener("keydown", treatKeyDown)
    
    return () => {
      document.body.removeEventListener("keydown", treatKeyDown)
    }
  }



  useEffect(applyEnterKey, [])



  return (
    <fieldset id="users">
      <legend>Manage Users</legend>
      <ul className="current">
        {userList}
      </ul>
      <div className="buttons">
        <button type="button" disabled>Edit</button>
        <button type="button" disabled>Set as Default</button>
        <button type="button" disabled>Delete</button>
      </div>
      <input
        type="text"
        name="new-user"
        placeholder="New User"
        disabled
      />
      <button
        type="button"
        className="add"
        disabled
      >
        Add User
      </button>
      <button
        type="submit"
        onClick={selectUser}
      >
        Start
      </button>
    </fieldset>
  )
}


export default Users