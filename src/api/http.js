import axios from 'axios';

const proxyToEscapeCors = 'https://cors-anywhere.herokuapp.com/';

var instance = function createAxiosInstance({
    baseUrl = 'https://swapi.dev/api/'
} = {}) {
    return axios.create({
        baseURL: proxyToEscapeCors+baseUrl,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }, 
    });
};

export default instance;