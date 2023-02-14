import {
    DirectionsCar,
    History,
    LocalCarWash,
  } from '@mui/icons-material'
  import { ISidebarItem } from '../helpers/interfaces'
  
  let idCount = -1
  const getId = () => {
    idCount += 1
    return idCount
  }
  
  const SidbarLinks: Record<string, Record<string, Array<ISidebarItem>>> = {
    staff: {
      General: [
        {
          label: 'Find vehicle',
          icon: DirectionsCar,
          url: '/staff/dashboard/general/findVehicle',
          id: getId(),
          parent: 'General',
          subSections: [],
        },
        {
          label: 'In Process',
          icon: LocalCarWash,
          url: '/staff/dashboard/general/inProcess',
          id: getId(),
          parent: 'General',
          subSections: ['/staff/dashboard/general/inProcess/process'],
        },
        {
          label: 'History',
          icon: History,
          url: '/staff/dashboard/general/history',
          id: getId(),
          parent: 'General',
          subSections: ['/staff/dashboard/general/history/jobHistory'],
        },
      ],
    }
    
  }
  
  export default SidbarLinks