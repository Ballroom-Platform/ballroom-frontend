import { List, Typography } from '@mui/material'
import { ISidebarItem } from '../../helpers/interfaces'
import { SidebarItem } from '../atoms'

interface IProps {
  section: string
  itemsArray: Array<ISidebarItem>
}

export const SidebarSection: React.FC<IProps> = ({ section, itemsArray }) => {
  section = section.toUpperCase()

  return (
    <>
        <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ display: { xs: 'none', lg: 'block' } }}
        >
            {section}
        </Typography>
        <List sx={{ paddingBottom: '7.25rem' }}>
            {itemsArray.map((item: ISidebarItem) => (
            <SidebarItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                url={item.url}
                parent={item.parent}
                subSections={item.subSections}
                itemMeta={item}
            />
            ))}
        </List>
    </>
      

  )
}