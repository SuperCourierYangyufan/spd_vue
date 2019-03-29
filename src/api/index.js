//包含N个接口请求函数模块
import ajax from "./ajax"
import ajax_obj from './ajax_Object'
import ajax_file from './ajax_file'
//跨域前缀
export const BASE_URL = '/spd'


//ajax列表
//-----------------------------------------基础-------------------------------------------------
//登入
export const loginmodle = (username,password) =>ajax(BASE_URL+`/login`,{username,password},'POST');
//登出
export const logoutmodle = () =>ajax(BASE_URL+`/logout`);
//查询所有的权限
export const getRoleAll = ()=>ajax(BASE_URL+'/getRoleAll');
//检查用户是否登入
export const getCurrentUserInfo = ()=>ajax(BASE_URL+'/isLogin');
//-----------------------------------------管理权限----------------------------------------------
//菜单列表查询分页
export const searchMenu = (menu) =>ajax_obj(BASE_URL+'/management/searchMenu',menu,'POST');
//查询所有父节点信息
export const searchRootMenu = () =>ajax(BASE_URL+'/management/searchRootMenu');
//保存菜单
export const saveMenu = (menu)=>ajax_obj(BASE_URL+'/management/saveMenu',menu,'POST');
//根据id删除菜单
export const deleteMenuById = (id)=>ajax(BASE_URL+`/management/deleteMenuById/${id}`);
//保存字典菜单
export const saveDictionary = (dictionary)=>ajax_obj(BASE_URL+'/management/saveDictionary',dictionary,'POST');
//字典菜单列表查询分页
export const searchDictionary = (dictionarySo) =>ajax_obj(BASE_URL+'/management/searchDictionary',dictionarySo,'POST');
//查询所有字典属性的类别列表
export const getAllCategory = () =>ajax(BASE_URL+'/management/getAllCategory');
//删除字典菜单
export const deleteDictionaryById = (id)=>ajax(BASE_URL+`/management/deleteDictionaryById/${id}`);
//导出所有字典菜单
export const exportDictionaryExcel = (filename)=> ajax_file(BASE_URL+'/management/exportDictionaryExcel',null,filename);
//权限角色列表信息
export const showRoles = () =>ajax(BASE_URL+"/management/showRoles");
//保存权限角色
export const saveRole = (role) => ajax(BASE_URL+`/management/saveRole`,role);
//保存医院资料
export const saveHospital = (hospital)=>ajax_obj(BASE_URL+"/management/saveHospital",hospital,'POST');
//医院菜单条件分页
export const searchHospital = (hospitalSo) =>ajax_obj(BASE_URL+'/management/searchHospital',hospitalSo,'POST');
//根据id删除医院
export const deleteHospital = (id)=>ajax(BASE_URL+`/management/deleteHospital/${id}`);
//查询所有医院的名字和id
export const searchHospitalIdAndName = ()=>ajax(BASE_URL+"/management/searchHospitalIdAndName");
//根据条件查询用户列表
export const searchUserList = (userSo)=>ajax_obj(BASE_URL+"/management/searchUserList",userSo,'POST');
//发送验证码请求
export const sendMsg = () =>ajax(BASE_URL+"/management/sendMsg");
//保存用户数据
export const saveUser = (userSo)=>ajax_obj(BASE_URL+"/management/saveUser",userSo,"POST");
//根据id删除用户
export const deleteUserById = (id) => ajax(BASE_URL+`/management/deleteUserById/${id}`);
//-----------------------------------------业务模块----------------------------------------------
//保存商品资料
export const saveGood = (goods) => ajax_obj(BASE_URL+"/mainroom/saveGood",goods,"POST");
//分页查询商品资料
export const searchGoods = (goodsSo) => ajax_obj(BASE_URL+"/mainroom/searchGoods",goodsSo,"POST");
//根据ID删除商品
export const removeGood =(id)=> ajax(BASE_URL+`/mainroom/removeGood/${id}`);









