import axios from 'axios'
// import qs from 'qs';

const service = axios.create({
    baseURL: "http://39.106.39.49:8888/",
    // baseURL: "http://localhost:8443/api",
    timeout: 5000,
    // transformRequest: data => qs.stringify(data)
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
