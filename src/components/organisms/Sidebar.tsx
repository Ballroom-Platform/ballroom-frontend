import { IconButton, Paper } from '@mui/material'
import SidebarLinks from '../../configs/sidebarLinks'
import { SidebarSection, ProfileCard } from '../molecules'
import { KeyboardDoubleArrowLeft } from '@mui/icons-material'
import { ISidebarItem } from '../../helpers/interfaces'
import { FRONTEND_PUBLIC } from '../../links'
import { useApp } from '../../hooks/useApp'

export const Sidebar: React.FC = () => {
  let links: Record<string, Array<ISidebarItem>>
  const {appState} = useApp();
  links = SidebarLinks[appState.auth.userRole!];

  return (
    <Paper
      sx={{ height: '100vh', padding: '1rem', width: '20%', position: 'fixed' }}
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
        <img
          alt="Logo"
          src={FRONTEND_PUBLIC.logo.black}
          style={{objectFit:"contain"}}
          width="220px"
          height="93px"
        />
      </Paper>
      <div style={{ paddingTop: '2rem' }}>
        {Object.keys(links).map((key, index) => (
          <SidebarSection section={key} key={index} itemsArray={links[key]} />
        ))}
      </div>
    </Paper>
  )
}