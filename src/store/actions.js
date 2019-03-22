import {
    LOGINMODLE,
    LOGOUTMODLE,
} from "./mutations-type";
//这里导入的为函数封装
import {
    loginmodle,
    logoutmodle,
    getCurrentUserInfo
} from '../api/index'

export default{

    async getCurrentUserInfo({commit,state},callback){
      const result = await getCurrentUserInfo();
        // 提交一个mutation
        if (result.code == 0) {
            const loginmodle = result
            commit(LOGINMODLE, {loginmodle})
        }else{
            const loginmodle = result
            commit(LOGINMODLE, {loginmodle})
        }
        callback&&callback();
      },



     async loginUser({commit, state},{username,password}) {
        // 发送异步ajax请求
        const result = await loginmodle(username,password) //await
        // 提交一个mutation
        if (result.code == 0) {
            const loginmodle = result
            commit(LOGINMODLE, {loginmodle})
        }else{
            const loginmodle = result
            commit(LOGINMODLE, {loginmodle})
        }
    },

    async logoutmodle({commit, state},callback) {
        // 发送异步ajax请求
        const result = await logoutmodle() //await
        // 提交一个mutation
        if (result.code == 0) {
            commit(LOGOUTMODLE) //mutations-typ和store的值
        }
        callback&&callback();
    },

}