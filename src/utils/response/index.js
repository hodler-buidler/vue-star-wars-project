function Response(status, data = null) {
    this.isSuccess = status == 'ok';
    this.isCached = status == 'cached';
    this.isError = status == 'error';
    this.response = data;
}

export default Response;