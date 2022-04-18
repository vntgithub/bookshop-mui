import axios from "axios";

const userApi = {
    login: async (data) => {
        const url = process.env.REACT_APP_URL_DATABASE + "user/login";
        const res = await axios.post(url, data)

        return res.data;
    },
    getByCookie: async (cookie, setUser) => {
        const url = process.env.REACT_APP_URL_DATABASE + `user/getbyid/${cookie}`
        await axios.get(url)
            .then(res => setUser(res.data.user))
            .catch(err => console.log(err))
    },
    create: async (user) => {
        const url = process.env.REACT_APP_URL_DATABASE + "user/create";
        await axios.post(url, user)
    },
    checkExist: async (username) => {
        const url = process.env.REACT_APP_URL_DATABASE + "user/check";
        const res = await axios.post(url, { username: username });
        return res;
    },
    getUsersPerPage: async (page, setData) => {
        const url = process.env.REACT_APP_URL_DATABASE + `user/getperpage/${page}`;
        await axios.get(url).then(users => setData(users.data));
    },
    countUsers: async (setPage) => {
        const url = process.env.REACT_APP_URL_DATABASE + 'user/count';
        await axios.get(url).then(n => setPage(n.data / 20));
    },
    search: async (str, setData) => {
        let n = 0;
        const url = process.env.REACT_APP_URL_DATABASE + `user/search/${str}`;
        await axios.get(url)
            .then(res => {
                setData(res.data);
                n = res.data.length;
            })
            .catch(err => console.log(err));
        return n / 20;
    },
    del: async (id) => {
        const url = process.env.REACT_APP_URL_DATABASE + `user/delete/${id}`;
        await axios.delete(url);
    },
    update: async (user) => {
        const url = process.env.REACT_APP_URL_DATABASE + 'user/update';
        await axios.put(url, user).then(res => console.log(res.data));
    }
};
export default userApi;