function Response(status, data = null) {
    this.isSuccess = status == 'ok';
    this.isCached = status == 'cached';
    this.isError = status == 'error';
    this.content = data;
}

export default Response;