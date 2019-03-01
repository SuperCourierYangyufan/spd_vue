import {
    LOGINMODLE,
    LOGOUTMODLE,
    CHANGECURRENTROLE
} from  './mutations-type'

export default {
    [LOGINMODLE](state,{loginmodle}){
        state.loginmodle = loginmodle;
    },
    [LOGOUTMODLE](state){
        state.loginmodle = {};
    },
}