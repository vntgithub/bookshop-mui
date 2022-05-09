import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Book from '@mui/icons-material/Book';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import Cloud from '@mui/icons-material/Cloud';
import CategoryIcon from '@mui/icons-material/Category';

export default function AdminMenu() {
    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <Book fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Books</ListItemText>

                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Users</ListItemText>

                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DocumentScannerIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Invoices</ListItemText>

                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <CategoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Categories</ListItemText>

                </MenuItem>

            </MenuList>
        </Paper>
    );
}