var getOneRequest = function createGetOneRequest({id}) {
    return {
        method: 'get',
        url: `/films/${id}`
    };
};

export default getOneRequest;