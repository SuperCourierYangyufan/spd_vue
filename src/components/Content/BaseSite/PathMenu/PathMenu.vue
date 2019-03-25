<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="toSet">添加菜单</Button>
            </div>
        </div>
        <!--筛选-->
        <div>
            <Row  style="text-align: center;margin-bottom: 1%;">
                <i-col span="2" offset="2">
                    <span class="optionFont">角色权限:</span>
                </i-col>
                <i-col span="3"  class="OptionClass">
                    <Select  v-model="menu.roleid" clearable  @on-change="deleteid">
                        <Option v-for="(i,index) in loginmodle.roleList" :value="i.id" :key="index">{{i.rolename}}</Option>
                    </Select>
                </i-col>
                <i-col span="1" offset="2">
                    <span class="optionFont" >是否为根:</span>
                </i-col>
                <i-col span="3"  class="OptionClass" >
                    <!--<RadioGroup v-model="searchOption.isroot">-->
                        <!--<Radio label="是" ></Radio>-->
                        <!--<Radio label="否" ></Radio>-->
                    <!--</RadioGroup>-->
                    <Select  v-model="menu.istop" @on-change="deleteid">
                        <Option  value="1" >是</Option>
                        <Option  value="0" >否</Option>
                    </Select>
                </i-col>
                <i-col span="1" offset="2">
                    <span class="optionFont" >是否可见:</span>
                </i-col>
                <i-col span="2"  class="OptionClass">
                    <RadioGroup v-model="menu.isshow">
                        <Radio label="">未选择</Radio>
                        <Radio label="1">是</Radio>
                        <Radio label="0">否</Radio>
                    </RadioGroup>
                </i-col>
                <i-col span="6"><Button @click="searchMenu(null)" type="primary" shape="circle" icon="ios-search">查询</Button></i-col>
            </Row>
        </div>
        <!--菜单列表-->
        <div>
            <Table  :loading="loading" :columns="title" :data="menuList" width="1500" style="margin: 0 auto">
                <template slot-scope="{ row, index }" slot="action">

                    <!--根-->
                    <div v-if="row.istop == '1'" >
                        <Button type="success" @click="showmenu(row)">明细</Button>
                        &nbsp;
                        <Button type="info" @click="showRootChilds(row)">子节点</Button>
                        &nbsp;
                        <Button type="error" @click="removeMenu(row)">删除</Button>
                    </div>
                    <!--子节点-->
                    <div v-else>
                        <Button type="success" @click="showmenu(row)">明细</Button>
                        &nbsp;
                        <Button type="error" @click="removeMenu(row)">删除</Button>
                    </div>
                </template>
            </Table>
        </div>
        <!--分页-->
        <div>
            <Row>
                <i-col offset="8" span="7" style="margin-top: 1%;margin-left: 30%">
                    <Page class="page" :total="page.total"  :current.sync="page.index" show-total  @on-change="changIndex"/>
                </i-col>
            </Row>
        </div>
        <!--删除框-->
        <Modal  v-model="deleteMenu.isshow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>您正在删除数据</span>
            </p>
            <input  v-model="deleteMenu.id" type="hidden"/>
            <div style="text-align:center">
                <p>是否删除该数据,删除后不可找回数据</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="deleteInMenu">确认删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ICol from "iview/src/components/grid/col";
    import {searchMenu,deleteMenuById} from '../../../../api/index'
    import {mapState} from 'vuex'
    import Input from "iview/src/components/input/input";
    export default {
        components: {
            Input,
            ICol},
        name: "path-menu",
        data(){
            return{
                title: [
                    {
                        title: '菜单名字',
                        key: 'menuname'
                    },
                    {
                        title: '父级菜单名',
                        key: 'parentname'
                    },
                    {
                        title: '路径',
                        key: 'pathname'
                    },
                    {
                        title: '权重',
                        key: 'sort'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },

                ],
                menuList:[
                ],
                menu:{
                    istop:'1',
                },
                page:{
                    total:1,
                    index:1
                },
                currentMenu:[],
                loading: false,
                deleteMenu:{
                    isshow:false
                }
            }
        },
        mounted(){
            //收集赋值
            // JSON.parse(JSON.stringify(this.loginmodle.menuList));
            //展示全部数据
            this.searchMenu(null)
        },
        computed:{
            ...mapState(['loginmodle'])
        },
        methods:{
            //搜索数据
            searchMenu(menu){
                //整合数据
                this.currentMenu = [];
                this.loading = true;
                //查看子节点
               if(menu!=null||this.menu.id!=null){
                   //父节点点击子节点按钮
                   if(this.menu.id == null){
                        //清空查询条件
                       this.menu = {};
                       //初始化查询条件
                       //子节点
                       this.menu.istop = "0";
                       this.menu.id = menu.id;
                       this.menu.pageSize = 10;
                       this.menu.pageNum = 1;
                   }
                   //子节点列表后切换可见性,不做处理
               //普通查询
               }else{
                   //清空子节点查询数据
                   this.menu.id = null;
                   this.menu.pageSize = 10;
                   this.menu.pageNum = this.page.index;
               }

               //AJAX
                this.searchAjax();

            },
            //列表查询的ajax
            searchAjax(){
                //ajax
                searchMenu(this.menu).then(res=>{
                    //设置数据
                    if(res.code == "0"){
                        this.menuList = res.data.list;
                        this.page.total = res.data.total;
                        //路径操作
                        this.menuList.forEach(menu=>{
                            menu.pathname = '/'+menu.pathname.replace(',','/')
                        });
                        //显示
                        this.loading = false;
                    }else{
                        this.loading = false;
                        this.$Message.error(res.message)
                    }
                })
            },
            //查看子节点
            showRootChilds(menu){
                this.searchMenu(menu);
            },
            //删除id,用于查完子节点后需要切换可见性
            deleteid(){
                this.menu.id = null;
            },
            //当页面改变时
            changIndex(){
                this.menu.pageNum = this.page.index;
                this.loading = true;
                this.searchAjax();
            },
            //跳转页面
            toSet(){
                this.$router.replace('/core/pathmenu/set')
            },
            //明细按钮
            showmenu(menu){
                let data = {
                    path : '/core/pathmenu/set',
                    query: menu
                };
                this.$router.push(data);
            },
            //删除菜单
            removeMenu(menu){
                this.deleteMenu.isshow = true;
                this.deleteMenu.id = menu.id;
            },
            deleteInMenu(){
                this.deleteMenu.isshow = false;
                deleteMenuById(this.deleteMenu.id).then(res=>{
                   if(res.code == "0"){
                       this.menuList = this.menuList.filter(i=>{
                           return i.id != this.deleteMenu.id;
                       });
                       this.$Message.success(res.message)
                   }else{
                       this.$Message.error(res.message)
                   }
                });
            }
        },

    }
</script>

<style scoped>
    /*.optionFont{*/
        /*font-size: 15px;*/
        /*line-height: 30px;*/
    /*}*/
    /*.page{*/
        /*text-align: center;*/
    /*}*/



    /*.actionLine{*/
        /*width: 100%;*/
        /*height: 35.19px;*/
        /*background-color: rgba(0,255,255,0.1);*/
        /*margin-bottom: 2%;*/
    /*}*/
    /*.actionButton Button{*/
        /*margin-left: 1.5%;*/
    /*}*/
</style>