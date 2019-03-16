import axios from 'axios'
axios.defaults.withCredentials=true;
export default function ajax_obj(url,data,type='GET') {

    return new Promise(function (resolve,reject) {
        //执行异步请求
        let promise;
        if(type === 'GET'){
            promise = axios.get(url);
        }else{
            promise = axios.post(url,data);
        }
        promise.then(function (response) {
            //成功调用resolve
            resolve(response.data)
        }).catch(function (error) {
            //失败调用reject
            reject(error)
        });

    });


}