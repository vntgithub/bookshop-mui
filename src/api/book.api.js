import axiosClient from "./axiosClient";
const baseUrl = process.env.REACT_APP_URL_BACKEND + "books"
const bookApi = {
    getBooks: async (searchParams) => {
        let url = baseUrl
        if (searchParams.length > 0) url += "?" + searchParams
        try {
            const response = await axiosClient.get(url);
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    create: async (data) => {
        const response = await axiosClient.post(baseUrl, data)
        return response.data
    },
    delete: async (id) => {
        const response = await axiosClient.delete(baseUrl + `/${id}`)
        console.log(response)

    },
    update: async (book) => {
        const response = await axiosClient.patch(baseUrl + `/${book._id}`, book)
        console.log(response.data)
        return response.data
    }
};

export default bookApi;