import http from './http';
import requests from './requests';
import $core from './_core_';

var api = {
    sendRequestAsync,
    makeRequest,
    $core
};

export default api;

function sendRequestAsync(request, requestName = null, params) {
    if (typeof request == 'string') {
        if (!requestName || typeof requestName != 'string')  {
            throw new Error('If you provide request namespace, you must also provide a request name to address to.');
        }
        request = this.makeRequest(request, requestName, params);
    } else if (typeof request != 'object') {
        throw new Error('You can provide either request object or namespace and name which belongs to particular request.')
    }

    if (request.fullUrl) {
        return http({baseUrl: request.fullUrl})(request);
    } 

    return http()(request);
}

function makeRequest(namespace, name, params) {
    var request = requests[namespace][name];
    if (!request) throw new Error(`Can't find request with following credentials namespace: ${namespace}, name: ${name}`);
    return request(params);
}