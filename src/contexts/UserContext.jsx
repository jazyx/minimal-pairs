/**
 * src/contexts/UserContext.jsx
 *
 * description
 */


import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'
import { PreferencesContext, PairsContext } from './'


const START_ERROR = 7
const MAX_ERROR = (START_ERROR + 1) * 2

// 8, 68, 98, 124, 126, 127, ... after each mistake
// 8,  4,  2,   1,   0...        after each correct answer
// Four mistakes followed by seven right answers
// 3, 6.1, 6.95, 6.99, 7, 6, 5, 4, 3, 2, 1, 0

export const UserContext = createContext()


export const UserProvider = ({ children }) => {
  const {
    users,
    saveUsers,
    storeScore
  } = useContext(PreferencesContext)
  const {
    pairs,
    pair,
    phonemePairs,
    setPhonemePair
  } = useContext(PairsContext)
      
  const [ user, setUser ] = useState(0)
  const [ mark, setMark ] = useState(START_ERROR)
  
  const score = users[user]?.score || {}


  const setScore = (wordPair, correct) => {
    // wordPair = "bitch:beach"
    // correct  = <boolean>
    // pair     = "ɪi" (from PairsContext)
    // score    = current user's score:
    //            { <phonemePair> : {
    //                <word:pair>: <number>,
    //                ...},
    //            ...}

    const scoreNow = score[pair][wordPair]
    const newScore = (!correct * MAX_ERROR) + (scoreNow >> 1)
    score[pair][wordPair] = newScore
    storeScore(user)

    return newScore
  }


  const chooseUser = (userId) => {
    // userId = parseInt(userId, 10)
    const entries = Object.entries(users)
    entries.forEach( ([ id, userData ]) => {
      userData.isDefault = id === userId
    })

    saveUsers()

    setUser(userId)
    const pair = users[userId]?.pair
    setPhonemePair(pair)
  }


  const setDefaultUser = () => {
    
  }
  

  // For the first 7 phoneme pairs, a score card will be just
  // over 1 KB. Local Storage can hold up to 5 MB per site.
  const getDefaultUserData = () => {
    const name = "Guest"
    const entries = Object.entries(pairs)

    const score = entries.reduce(( score, [phoneme, pairs]) => {
      const pairings = Object.entries(pairs)

      score[phoneme] = pairings.reduce(( marks, [ a, b ] ) => {
        marks[`${a}:${b}`] = START_ERROR
        return marks
      },  {})
      
      return score
    }, {})

    return {
      name,
      score,
      isDefault: false,
      pair: phonemePairs[0]
    }
  }


  const ensureAUserExists = () => {
    const ids = Object.keys(users)
    const userData = getDefaultUserData()

    // Get the oldest id to use as default if none is given
    const key = ids.sort(numerically).slice(0)[0] // undefined?

    if (!ids.length) {
      // Add an anonymous user as default, with no state change
      users[1] = { ...userData, isDefault: true, name: "You" }
    }

    // Add a Guest user with default user data
    users[0] = userData

    // Choose the first user with isDefault: true, or failing
    // that (because the last user last time was Guest), the
    // user with the oldest id
     // [ <id>, { name, score, isDefault, pair } ]
    const user = Object.entries(users).find(([ user, data ]) => {
      return data.isDefault
    }) || [ key ]

    const id = user[0]
    chooseUser(id)

    saveUsers(users) // in PreferencesContext
  }


  // eslint-disable-next-line
  useEffect(ensureAUserExists, [])


  return (
    <UserContext.Provider
      value ={{
        user,
        score,
        mark,
        setScore,
        setDefaultUser,
        chooseUser
      }}
    >
      {children}
    </UserContext.Provider>
  )


  // UTILITIES //

  function numerically(a, b) {
    return Number(a) - Number(b)
  }
}