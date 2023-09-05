import {
    DirectionsCar,
    EmojiEvents,
    Event,
    History,
    LocalCarWash,
    ReceiptLong,
    Settings,
    Stadium,
    AddCircleTwoTone,
  } from '@mui/icons-material'
import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { FunctionDeclaration } from 'typescript'
import { ISidebarItem } from '../helpers/interfaces'
import { URL_LIST } from '../links/frontend'

let idCount = -1
const getId = () => {
  idCount += 1
  return idCount
}


interface IGetItem {
  (
    key: string,
    label: string,
    icon : OverridableComponent<SvgIconTypeMap>,
    parent : string,
    subSections : Array<string>
  ) : ISidebarItem
}

const getItem : IGetItem = (key, label, icon, parent, subSections)=> {
  return {
    label,
    icon,
    url : URL_LIST[key],
    id: getId(),
    parent,
    subSections,
  }
}

const SidbarLinks: Record<string, Record<string, Array<ISidebarItem>>> = {
  contestant: {
    Home: [
      getItem("contests", "Contests", EmojiEvents, "General", ["/contests/contest"])]
  },
  admin: {
    Contests: [
      getItem("createContest", "Create a Contest", AddCircleTwoTone, "General", []),
      getItem("upcomingContests", "Upcoming Contests", Event, "General", []),
      getItem("ongoingContests", "Ongoing Contests", Event, "General", []),
      getItem("pastContests", "Past Contests", Event, "General", []),

    ],
    Challenges: [
      getItem("createChallenge", "Create a Challenge", AddCircleTwoTone, "General", []),
      getItem("myChallenges", "My Challenges", ReceiptLong, "General", []),
      getItem("sharedChallenges", "Shared Challenges", ReceiptLong, "General", []),
    ]
  }
  
}

export default SidbarLinks