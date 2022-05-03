import axios from 'axios'
const baseURL = process.env.REACT_APP_URL_BACKEND + "invoices"
const invoiceApi = {
    create: async (invoice) => {
        const response = await axios.post(baseURL, invoice)
        return response.data

    },
    getIvoices: async () => {
        const response = await axios.get(baseURL)
        return response.data
    }
}

export default invoiceApi