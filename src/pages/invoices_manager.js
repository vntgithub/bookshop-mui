import React, { useState, useEffect } from 'react'
import invoiceApi from '../api/invoice.api'
import AdminMenu from '../components/admin_menu.component'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core';
import InvoiceTable from '../components/InvoicesTable.component';
import AdminAppBar from '../components/admin_app_bar.component';

const useStyles = makeStyles((theme) => ({
    marginTop: {
        marginTop: theme.spacing(20),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBookButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },


    pagination: {
        marginTop: theme.spacing(2)
    }

}));

const InvoicesManagerPage = () => {
    const classes = useStyles()
    const [invoices, setInvoices] = useState([]);
    const [page, setPage] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)

    const getInvoices = async (page) => {
        const response = await invoiceApi.getAllInvoices(page)
        setInvoices(response.invoices)
        setNumberOfPages(response.count)
    }

    const toPage = (event, value) => {
        setPage(value)
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    useEffect(() => {
        getInvoices(page)
    }, [page])
    return (
        <Container className={classes.marginTop} mt={5} maxWidth='xl'>
            <AdminAppBar />
            <Grid container spacing={2} >
                <Grid item xs={3}>
                    <AdminMenu />
                </Grid>
                <Grid item xs={8}>
                    <InvoiceTable
                        setInvoices={setInvoices}
                        invoices={invoices} />
                    <Pagination className={classes.pagination} onChange={toPage} size="medium" count={numberOfPages} color="primary" />
                </Grid>
            </Grid>

        </Container>
    )
}

export default InvoicesManagerPage