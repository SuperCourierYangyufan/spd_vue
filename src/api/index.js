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








