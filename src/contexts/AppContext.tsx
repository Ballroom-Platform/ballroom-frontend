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
    redirectURL: "/contests"
  },
  contests : {
    "001" : {
      contestId : "001",
      title : "Game Jam",
      description : "The problem is a fun problem about problems that you can try when you are full of problems cuz problems are cool.",
      constraints : "There are a lot of contraints for this particular problem so be careful.",
      startTime : Date.now().toString(),
      endTime : Date.now().toString() + 10000,
      contestImageURL : "contest_image.jpg",
      problemFiles : "",
      forcedState : "active",
      challenges : ["001", "001"]
    }
  },
  challenges : {
    "001" : {
      challengeId : "001",
      title : "Challenge 1",
      difficulty : "Hard",
      tags : ["REST API", "Ballerina"],
      status : "Incomplete"
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