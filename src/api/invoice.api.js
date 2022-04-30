import axios from 'axios'
const baseURL = process.env.REACT_APP_URL_BACKEND + "invoices"
const invoiceApi = {
    create: async (invoice) => {
        const response = await axios.post(baseURL, invoice)
        console.log(response.data)
    },
    getIvoices: async () => {
        const response = await axios.get(baseURL)
        console.log(response.data)
    }
}

export default invoiceApi