import React, { useState } from 'react'
import { IAppState } from '../helpers/interfaces'

interface IProps {
  children: React.ReactNode
}

const initialAppState : IAppState = {
  auth : {
    status : "inactive"
  },
  page : {
    redirectURL: {
      contestant : "/contests",
      admin : "/upcomingContests"
    }
  }
}


const useValues = () => {
  const [appState, setAppState] = useState<IAppState>(initialAppState as IAppState)

  return {
    appState,
    setAppState,
  }
}

export const AppContext = React.createContext({} as ReturnType<typeof useValues>)

export const AppContextProvider: React.FC<IProps> = ({ children }) => {
  return (
    <AppContext.Provider value={useValues()}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider