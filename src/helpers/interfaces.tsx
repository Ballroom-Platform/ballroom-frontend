import { SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

export interface ISidebarItem{
  label: string
  icon: OverridableComponent<SvgIconTypeMap>
  url: string
  id: number
  parent: string
  subSections: Array<string>
}


export interface IAppState {
    auth : {
      status : "active" | "inactive";
      accessToken? : string;
      userID? : string;
    },
    page : {
      section : string,
      subsection : string
    }
}