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
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';

export default function AdminMenu() {
    const navigate = useNavigate()
    const toUsersManagerPage = () => navigate('/users-manager')
    const toCategoriesManagerPage = () => navigate('/categories-manager')
    const toInvoicesManagerPage = () => navigate('/invoices-manager')
    const toBooksManagerPage = () => navigate('/books-manager')
    return (
        <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList>
                <MenuItem onClick={toBooksManagerPage}>
                    <ListItemIcon>
                        <Book fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Books</ListItemText>

                </MenuItem>
                <MenuItem onClick={toUsersManagerPage}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Users</ListItemText>

                </MenuItem>
                <MenuItem onClick={toInvoicesManagerPage}>
                    <ListItemIcon>
                        <DocumentScannerIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Invoices</ListItemText>

                </MenuItem>
                <MenuItem onClick={toCategoriesManagerPage}>
                    <ListItemIcon>
                        <CategoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Categories</ListItemText>

                </MenuItem>

            </MenuList>
        </Paper>
    );
}