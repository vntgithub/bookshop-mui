import React, { useEffect, useState } from 'react'
import invoiceApi from '../api/invoice.api';
import { Container } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Invoice from '../components/invoices.component';


const useStyles = makeStyles((theme) => ({
    containerInvoice: {
        display: 'block',
        marginTop: theme.spacing(20)
    },
    titleCreateInvoice: {
        textAlign: 'center',
        fontFamily: ''
    }

}));



const CreateInvoicePage = () => {
    const classes = useStyles();
    const [invoices, seInvoices] = useState([])

    const getInvoices = async () => {
        const invoiceData = await invoiceApi.getIvoices()
        seInvoices(invoiceData)
    }
    useEffect(() => {
        getInvoices()
    }, [])


    return (
        <Container className={classes.containerInvoice}>
            {invoices.map(invoice => <Invoice invoice={invoice} />)}
        </Container>
    )
}

export default CreateInvoicePage