import axios from "axios";

const baseUrl = process.env.REACT_APP_URL_BACKEND + 'users'
const userApi = {

    loginByToken: async (accessToken) => {
        const url = baseUrl + '/loginbytoken'
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        const response = await axios.post(url)

        return response.data

    },
    getNewAccessToken: async (refreshToken) => {
        const url = process.env.REACT_APP_URL_BACKEND + 'tokens'
        const response = await axios.post(url, { token: refreshToken })

        console.log(response.data)

        return response.data
    }

};
export default userApi;