import serviceAxios from './serviceAxios';

const fetch = {
    get: function (url) {
        return serviceAxios({
            url: url,
            method: 'get'
        }).catch(err => {
            console.log(err);
        });
    },
    post: function (url, data) {
        return serviceAxios({
            url: url,
            method: 'post',
            data
        }).catch(err => {
            console.log(err);
        });
    }
};

export default fetch;
