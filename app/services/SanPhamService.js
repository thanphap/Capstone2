function SanPhamService(params) {
    this.getProductList = function () {
        var promise = axios({
            method: 'get',
            url: 'https://62ff797e34344b6431fa3ccc.mockapi.io/capstone2',
            responseType: 'stream'
          });
        return promise;
    }
}