import http from '../http';

async function getMany({page = 1, search = null}) {
    var params = {
        page
    };
    if (search) params.search = search; 

    return await http.get('/people', {
        params
    });
}

export default getMany;