import axiosClient from "./axiosClient"

const baseUrl = process.env.REACT_APP_URL_BACKEND + "categories"
const categoryApi = {
    getCategories: async () => {
        const response = await axiosClient.get(baseUrl)
        return response.data
    }
}

export default categoryApi