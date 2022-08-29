function ManagerServive() {
    this.getPhoneList = function () {
        return axios({
            method: 'get',
            url: 'https://62ff797e34344b6431fa3ccc.mockapi.io/capstone2',
          })
    }
    this.addPhoneList = function (phone) {
        return axios({
            method: 'post',
            url: 'https://62ff797e34344b6431fa3ccc.mockapi.io/capstone2',
            data: phone
          })
    }
    this.deletePhone = function (id) {
        return axios({
            method: 'delete',
            url: `https://62ff797e34344b6431fa3ccc.mockapi.io/capstone2/${id}`,
          })
    }
    this.getPhoneDetail = function (id) {
        return axios({
            method: 'get',
            url: `https://62ff797e34344b6431fa3ccc.mockapi.io/capstone2/${id}`,
          })
    }

    this.updatePhone = function (id, phone) {
        return axios({
            method: 'put',
            url: `https://62ff797e34344b6431fa3ccc.mockapi.io/capstone2/${id}`,
            data: phone
          })
    }
}