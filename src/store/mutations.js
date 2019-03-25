import {
    LOGINMODLE,
    LOGOUTMODLE,
    CHANGECURRENT
} from  './mutations-type'

export default {
    [LOGINMODLE](state,{loginmodle}){
        state.loginmodle = loginmodle;
    },
    [LOGOUTMODLE](state){
        state.loginmodle = {};
    },
    [CHANGECURRENT](state,{current}){
        state.current = current;
    }
}