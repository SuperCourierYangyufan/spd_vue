<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="saveMenu">保存</Button>
                <Button type="primary" icon="md-close" shape="circle" @click="$router.replace('/core/pathmenu') ">取消</Button>
            </div>
        </div>
        <!--菜单明细-->
        <Row class="tableFont">
            <i-col span="18" offset="2">
                <span><b>菜单节点信息:</b></span>
            </i-col>
        </Row>
        <Row>
            <i-col span="18" offset="3">
                <!--内容区域-->
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <Select  v-model="menu.roleid"  placeholder="选择菜单所属权限" clearable >
                            <Option v-for="(i,index) in RoleList" :value="i.id" :key="i.id">菜单所属权限:{{i.rolename}}</Option>
                        </Select>
                    </i-col>
                    <i-col span="12">
                        <Select  v-model="menu.parentid" placeholder="选取父级菜单" clearable >
                            <Option :value="0" :key="0">父级菜单:无父级(顶级菜单)</Option>
                            <Option v-for="(i,index) in RootMenuList" :value="i.id" :key="i.id">父级菜单:{{i.menuname}}</Option>
                        </Select>
                    </i-col>
                </Row>
            </i-col>
        </Row>
        <Row class="tableFont">
            <i-col span="18" offset="2">
                <span><b>菜单基本信息:</b></span>
            </i-col>
        </Row>
        <Row>
            <i-col span="18" offset="3">
               <!--内容区域-->
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <i-input size="large" v-model="menu.menuname">
                        <span slot="prepend" >菜单名:</span>
                        </i-input>
                    </i-col>
                    <i-col span="12" >
                        <i-input size="large" v-model="menu.href" :disabled="infoController.href">
                            <span slot="prepend">路径地址:</span>
                        </i-input>
                    </i-col>
                </Row>
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <i-input size="large" v-model="menu.sort" :disabled="infoController.sort">
                            <span slot="prepend">权重值:</span>
                            <span slot="append">{{infoController.sortMessage}}</span>
                        </i-input>
                    </i-col>
                    <i-col span="12">
                        <Select v-model="menu.isshow" placeholder="选择是否显示" clearable>
                            <Option value="1">是否显示:显示</Option>
                            <Option value="0">是否显示:不显示</Option>
                        </Select>
                    </i-col>
                </Row>
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <i-input size="large" v-model="menu.icon" :disabled="infoController.icon">
                            <span slot="prepend">菜单图标:</span>
                            <span slot="append">根据iview的icon选择,仅根节点有效</span>
                        </i-input>
                    </i-col>
                </Row>
            </i-col>
        </Row>

    </div>
</template>

<script>
    import ICol from "iview/src/components/grid/col";
    import {searchRootMenu,saveMenu,getRoleAll} from '../../../../api/index'
    export default {
        components: {ICol},
        name: "path-menu_set",
        data(){
            return{
                RootMenuList: [],
                RoleList:[],
                menu:{},
                //控制填写表单某些属性可填
                infoController:{
                    sort: true,
                    icon: true,
                    href: true,
                    sortMessage:'请选择父节点再设置此项',
                }
            }
        },
        mounted(){
            //查询所有父级菜单
            searchRootMenu().then(res=>{
                if(res.code == "0"){
                    this.RootMenuList = res.data;
                    //判断是否为明细按钮
                    if(this.$route.query!=null){
                        this.menu = this.$route.query;
                    }
                }
            });

            //查询所有的权限节点
            getRoleAll().then(res=>{
                if(res.code == "0"){
                    this.RoleList = res.data;
                }
            });






        },
        methods:{
            saveMenu(){
                let menu = this.menu;
                //收集数据保存
                if(menu.parentid == 0){
                    menu.parentname = '无父级'
                    menu.pathname =  menu.menuname;
                    menu.istop = 1;
                }else{
                    this.RootMenuList.forEach(i=>{
                        //查询父menu
                        if(i.id == menu.parentid){
                            menu.parentname = i.pathname;
                            menu.pathname = i.pathname+','+menu.menuname;
                            menu.istop = 0;
                        }
                    });
                }
                //ajax
                saveMenu(menu).then(res=>{
                    if(res.code == "0"){
                        this.$Message.success(res.message)
                        this.$router.replace('/core/pathmenu')
                    }else{
                        this.$Message.error("保存异常")
                    }
                });
            },
        },
        watch:{
            menu:{
                handler: function(newmenu){
                    if(newmenu.parentid != null){
                        //数据发生变化,并且不为空时,进行表单属性修改
                        //非根
                        if(newmenu.parentid!=0){
                            newmenu.icon = null;
                            this.infoController.sort = false;
                            this.infoController.icon = true;
                            this.infoController.href = false;
                            this.RootMenuList.forEach(menu=>{
                                if(menu.id == newmenu.parentid){
                                    this.infoController.sortMessage = '请输入'+(menu.sort-100)+"~"+menu.sort+"的值"
                                }
                            });
                        //根
                        }else{
                            this.infoController.sort = true;
                            this.infoController.sortMessage = "顶级节点无需填写"
                            newmenu.href = null;
                            this.infoController.href = true;
                            this.infoController.icon = false;
                        }
                    }
                },
                deep: true, //深度监听
            }

        },
    }
</script>

<style scoped>
    /*.actionLine{*/
        /*width: 100%;*/
        /*height: 35.19px;*/
        /*background-color: rgba(0,255,255,0.1);*/
        /*margin-bottom: 2%;*/
    /*}*/
    /*.actionButton Button{*/
        /*margin-left: 1.5%;*/
    /*}*/


    /*!*页面样式*!*/
    /*.tableFont{*/
        /*color: #27A9E3;*/
        /*margin-bottom: 0.5%;*/

    /*}*/
    /*b{*/
        /*font-size: 16px;*/
    /*}*/

    /*.tablerow{*/
        /*margin-bottom: 1.5%;*/
    /*}*/

</style>