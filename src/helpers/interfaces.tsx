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
      section? : string,
      subsection? : string,
      selectedItem? : string,
      redirectURL? : string,
    },
    contests : Record<string, IContest>,
    challenges : Record<string, IChallenge>
}

export interface IContest {
  contestId : string,
  title : string,
  description : string,
  constraints : string,
  startTime : string,
  endTime : string,
  contestImageURL : string,
  problemFiles : string,
  forcedState : string,
  challenges : Array<string>
}

export interface IChallenge {
  challengeId : string,
  title : string,
  tags : Array<string>,
  difficulty : string;
  status : string;
}