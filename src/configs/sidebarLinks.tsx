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
  
  let idCount = -1
  const getId = () => {
    idCount += 1
    return idCount
  }

  export const URL_LIST : Record<string, string> = {
    contests : "/contests",
    settings : "/settings"
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
        getItem("contests", "Contests", EmojiEvents, "General", ['Test1', 'Test2']),
        getItem("settings", "Settings", Settings, "General", [])]
    }
    
  }
  
  export default SidbarLinks