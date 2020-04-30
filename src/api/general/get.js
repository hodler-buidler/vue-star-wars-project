var getRequest = function createGetRequest({url}) {
    return {
        method: 'get',
        fullUrl: url
    };
};

export default getRequest;