import axios from "axios";
const baseUrl = process.env.REACT_APP_URL_BACKEND + "books"
const bookApi = {
    getBooks: async (searchParams) => {
        let url = baseUrl
        if (searchParams.length > 0) url += "?" + searchParams
        try {
            const response = await axios.get(url);
            return response.data
        } catch (error) {
            console.log(error);
        }
    }
};

export default bookApi;