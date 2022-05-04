import axios from 'axios'
const baseURL = process.env.REACT_APP_URL_BACKEND + "invoices"
const invoiceApi = {
    create: async (invoice) => {
        const response = await axios.post(baseURL, invoice)
        console.log(response.data)
        return response.data

    },
    getIvoices: async () => {
        const response = await axios.get(baseURL)
        return response.data
    },
    cancel: async (id) => {
        const response = await axios.patch(baseURL + `/cancel/${id}`)
        return response.data
    }
}

export default invoiceApi