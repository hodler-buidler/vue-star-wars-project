import isEqual from 'lodash/isEqual';

/**
 * Stores request objects and compares them.
 */
function RequestsCache() {
    this.requests = [];
    this.check = checkIfRequestUnique;
    this.add = collectRequest;
}

function checkIfRequestUnique(request) {
    for (let i = 0; i < this.requests.length; i++) {
        if (isEqual(request, this.requests[i])) return true;
    }
    return false;
}

function collectRequest(request) {
    this.requests.push(request);
}

export default RequestsCache;