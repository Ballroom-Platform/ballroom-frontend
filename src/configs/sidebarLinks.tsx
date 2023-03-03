import {
    DirectionsCar,
    EmojiEvents,
    History,
    LocalCarWash,
    Settings,
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
          label: 'Contests',
          icon: EmojiEvents,
          url: '/dashboard',
          id: getId(),
          parent: 'General',
          subSections: ['Test1', 'Test2'],
        },
        {
            label: 'Settings',
            icon: Settings,
            url: '/settings',
            id: getId(),
            parent: 'General',
            subSections: [],
          }
      ],
    }
    
  }
  
  export default SidbarLinks