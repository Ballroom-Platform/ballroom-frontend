import {
    DirectionsCar,
    EmojiEvents,
    History,
    LocalCarWash,
    Settings,
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
  staff: {
    General: [
      getItem("contests", "Contests", EmojiEvents, "General", ["/contests/contest"]),
      getItem("settings", "Settings", Settings, "General", [])]
  }
  
}

export default SidbarLinks