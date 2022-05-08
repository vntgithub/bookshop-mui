import axiosClient from "./axiosClient"
const baseURL = process.env.REACT_APP_URL_BACKEND + "invoices"
const invoiceApi = {
    create: async (invoice) => {
        const response = await axiosClient.post(baseURL, invoice)
        return response.data

    },
    getIvoices: async () => {
        const response = await axiosClient.get(baseURL)
        return response.data
    },
    cancel: async (id) => {
        const response = await axiosClient.patch(baseURL + `/cancel/${id}`)
        return response.data
    }
}

export default invoiceApi