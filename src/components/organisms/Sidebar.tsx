import { IconButton, Paper } from '@mui/material'
import SidebarLinks from '../../configs/sidebarLinks'
import { SidebarSection, ProfileCard } from '../molecules'
import { KeyboardDoubleArrowLeft } from '@mui/icons-material'
import { ISidebarItem } from '../../helpers/interfaces'
import Image from 'mui-image'

export const Sidebar: React.FC = () => {
  let links: Record<string, Array<ISidebarItem>>
  links = SidebarLinks.staff

  return (
    <Paper
      sx={{ height: '100vh', padding: '1rem', width: '18%', position: 'fixed' }}
      elevation={3}
    >
      <Paper
        sx={{
          display: { xs: 'none', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
        elevation={0}
      >
        <Image
          alt="Logo"
          src="https://localhost:3000/logo.png"
          fit="contain"
          width="220px"
          height="93px"
        />
      </Paper>
      <ProfileCard
        name="John Edmond"
        userType="Contestant"
        url="https://localhost:3000/avatar.png"
        minimized={false}
      />
      <div style={{ paddingTop: '2rem' }}>
        {Object.keys(links).map((key, index) => (
          <SidebarSection section={key} key={index} itemsArray={links[key]} />
        ))}
      </div>
    </Paper>
  )
}