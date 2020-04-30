import isEqual from 'lodash/isEqual';

/**
 * Stores request objects and compares them.
 */
function RequestsCache() {
    this.requests = [];
    this.check = checkIfRequestUnique; // returns false or archived response
    this.add = collectRequest;
}

function checkIfRequestUnique(request) {
    for (let i = 0; i < this.requests.length; i++) {
        var [savedRequest, response] = this.requests[i];
        if (isEqual(request, savedRequest)) return response;
    }
    return false;
}

function collectRequest(request, response) {
    this.requests.push([request, response]);
}

export default RequestsCache;