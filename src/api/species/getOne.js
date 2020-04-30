var getOneRequest = function createGetManyRequest({id}) {
    return {
        method: 'get',
        url: `/species/${id}`
    };
};

export default getOneRequest;