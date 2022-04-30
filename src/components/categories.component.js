import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function Categories(props) {
    const { categories, setCategory, setPage, setSearch } = props

    const changeCategory = (categoryName) => {
        return function () {
            setCategory(categoryName)
            setSearch(null)
            setPage(0)
        }
    }
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <ListItem onClick={changeCategory(null)} disablePadding>
                        <ListItemButton>
                            <ListItemText primary="All category" />
                        </ListItemButton>
                    </ListItem>
                    {categories.map((category, index) =>
                        <ListItem onClick={changeCategory(category.name)} key={index} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={category.name} />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </nav>
            <Divider />
        </Box>
    );
}
