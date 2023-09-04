import React, { useState } from "react"

const UserContext = React.createContext([{}, () => {}])

let initialState = {
  records: [],
  token: "",
}

const UserProvider = props => {
  const [state, setState] = useState(initialState)

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
