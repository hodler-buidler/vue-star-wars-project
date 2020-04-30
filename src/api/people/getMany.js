var getManyRequest = function createGetManyRequest({page = 1, search = null} = {}) {
    var params = {
        page
    };
    if (search) params.search = search; 

    return {
        method: 'get',
        url: '/people',
        params
    };
};

export default getManyRequest;