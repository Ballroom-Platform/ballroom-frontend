import { useTheme } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ISidebarItem } from '../../helpers/interfaces'
import React from 'react'
import { useHistory, useLocation } from 'react-router'

export const SidebarItem: React.FC<
ISidebarItem & { itemMeta: ISidebarItem }
> = ({ label, icon, url, subSections }) => {
  const theme = useTheme();
  const location = useLocation()
  const history = useHistory()

  const selected =
  location.pathname === url || subSections.indexOf(location.pathname) > -1
      ? true
      : false

  const handleSelectedSection = () => {
    history.push(url);
  }

  const styles = {
    borderRadius: '0.75rem',
    padding: '0.5rem 0.5rem',
  }
  const IconElement = icon
  const fontColor = selected
    ? theme.palette.primary.main
    : theme.palette.grey[600]

  return (
    <ListItem
    disablePadding
    sx={{ color: fontColor, margin: { xs: '1rem 0', lg: '0' } }}
    >
    <ListItemButton
        selected={selected}
        onClick={() => handleSelectedSection()}
        sx={styles}
    >
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconElement sx={{ color: fontColor }} />
        </ListItemIcon>
        <ListItemText
        primary={label}
        sx={{ display: { xs: 'none', lg: 'block' } }}
        />
    </ListItemButton>
    </ListItem>
  )
}