import http from '../http';

async function get(url) {
    return await http({
        method: 'get',
        url
    });
}

export default get;