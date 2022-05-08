import axiosClient from "./axiosClient";

const baseUrl = process.env.REACT_APP_URL_BACKEND + 'users'
const userApi = {

    loginByToken: async (accessToken) => {
        const url = baseUrl + '/loginbytoken'
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        const response = await axiosClient.post(url)

        return response.data

    },
    getNewAccessToken: async (refreshToken) => {
        const url = process.env.REACT_APP_URL_BACKEND + 'tokens'
        const response = await axiosClient.post(url, { token: refreshToken })

        return response.data
    },
    login: async (data) => {
        const url = baseUrl + '/login'
        const response = await axiosClient.post(url, data)
        if (response.data.accessToken)
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
        return response.data
    },
    logout: async (refreshToken) => {
        const url = process.env.REACT_APP_URL_BACKEND + 'tokens'
        await axiosClient.delete(url, { token: refreshToken })
    },
    signup: async (user) => {
        const url = process.env.REACT_APP_URL_BACKEND + 'users'
        const response = await axiosClient.post(url, user)
        console.log(response.data)
        return response.data
    }

};
export default userApi;