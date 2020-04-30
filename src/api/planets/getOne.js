var getOneRequest = function createGetOneRequest({id}) {
    return {
        method: 'get',
        url: `/planets/${id}`
    };
};

export default getOneRequest;