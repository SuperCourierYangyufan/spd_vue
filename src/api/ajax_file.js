import axios from 'axios'
export default function ajax_file(url,data,filename){

    return new Promise(function (resolve,reject) {
        let promise;
        promise = axios({ // 用axios发送post请求
            method: 'post',
            url: url, // 请求地址
            data: data, // 参数
            responseType: 'blob' // 表明返回服务器返回的数据类型
        })

        promise.then(res => {
            if (!res) {
                return
            }
            let url = window.URL.createObjectURL(res.data)
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.setAttribute('download', filename+'.xls')
            document.body.appendChild(link)
            link.click()
        }).catch(function (error) {
            //失败调用reject
            reject(error)
        });
    })

}