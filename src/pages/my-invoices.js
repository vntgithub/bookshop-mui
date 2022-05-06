import React, { useEffect, useState } from 'react'
import invoiceApi from '../api/invoice.api';
import { Container } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Invoice from '../components/invoice.component';


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
    const [invoices, setInvoices] = useState([])

    const getInvoices = async () => {
        const invoiceData = await invoiceApi.getIvoices()
        setInvoices(invoiceData)
    }
    useEffect(() => {
        getInvoices()
    }, [])


    return (
        <Container className={classes.containerInvoice}>
            {invoices.map((invoice, index) =>
                <Invoice
                    index={index}
                    key={invoice._id}
                    invoice={invoice}
                    setInvoices={setInvoices}
                    invoices={invoices} />)}
        </Container>
    )
}

export default CreateInvoicePage