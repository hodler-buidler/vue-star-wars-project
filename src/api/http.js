import axios from 'axios';

const proxyToEscapeCors = 'https://cors-anywhere.herokuapp.com/';

var instance = axios.create({
    baseURL: `${proxyToEscapeCors}https://swapi.dev/api/`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }, 
});

export default instance;