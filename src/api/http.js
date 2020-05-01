import axios from 'axios';
import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted);

const proxyToEscapeCors = 'https://cors-anywhere.herokuapp.com/';
const requestsDelay = 2000;

var instance = function createAxiosInstance({
    baseUrl = 'https://swapi.dev/api/'
} = {}) {
    var instance = axios.create({
        baseURL: proxyToEscapeCors+baseUrl,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });

    // DELAY ON ALL REQUESTS
    instance.interceptors.request.use((config) => {
        return new Promise(resolve => setTimeout(() => resolve(config), requestsDelay));
    });

    instance.interceptors.response.use(function(response) {
        return response;
      }, function (error) {

        Vue.toasted.error('Oops.. Seems like network request failed :(, try again/reload the page.', {
            duration: 5000
        });

        return Promise.reject(error);
    }); 

    return instance;
};

export default instance;