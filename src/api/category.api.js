import axios from "axios";

const baseUrl = process.env.REACT_APP_URL_BACKEND + "categories"
const categoryApi = {
    getCategories: async () => {
        const response = await axios.get(baseUrl)
        return response.data
    }
}

export default categoryApi