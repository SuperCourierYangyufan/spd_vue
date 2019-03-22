<template>
    <div>
        <!--按钮-->
        <div>
            <div class="actionLine">
                <div class="actionButton">
                    <Button type="primary" icon="md-add" shape="circle" @click="$router.replace('/core/userRole/set')">添加用户角色</Button>
                </div>
            </div>
        </div>
        <!--筛选-->
        <div>
            <Row  style="text-align: center;margin-bottom: 1%;">
                <i-col span="2" offset="2">
                    <span class="optionFont">角色名:</span>
                </i-col>
                <i-col span="3"  class="OptionClass">
                    <Input  v-model="userSo.name"/>

                </i-col>
                <i-col span="1" offset="2">
                    <span class="optionFont" >角色医院:</span>
                </i-col>
                <i-col span="3"  class="OptionClass" >
                    <Select v-model="userSo.hospitalid">
                        <Option v-for="(i,index) in hospitalList" :key="index" :value="i.id">{{i.name}}</Option>
                    </Select>
                </i-col>
                <i-col span="1" offset="2">
                    <span class="optionFont" >角色权限:</span>
                </i-col>
                <i-col span="3"  class="OptionClass">
                    <Select v-model="userSo.roleid">
                        <Option v-for="(i,index) in roleList" :key="index" :value="i.id">{{i.rolename}}</Option>
                    </Select>
                </i-col>
                <i-col span="5"><Button type="primary" shape="circle" icon="ios-search" @click="searchList">查询</Button></i-col>
            </Row>
        </div>
        <!--菜单列表-->
        <div>
            <Table  :loading="loading" :columns="title" :data="userList" width="1500" style="margin: 0 auto">
                <template slot-scope="{ row, index }" slot="action">
                    <div >
                        <Button type="success" @click="showUser(row)">明细</Button>
                        &nbsp;
                        <Button type="error" @click="removeUser(row)">删除</Button>
                    </div>
                </template>
            </Table>
        </div>
        <!--分页-->
        <div>
            <Row>
                <i-col offset="8" span="7" style="margin-top: 1%;margin-left: 30%">
                    <Page class="page" :total="page.total"  :current.sync="page.pageNum" show-total @on-change="searchList()"/>
                </i-col>
            </Row>
        </div>
    </div>

</template>

<script>
    import {searchHospitalIdAndName,getRoleAll,searchUserList,deleteUserById} from '../../../../api/index'
    export default {
        name: "userRole",
        data(){
            return{
                title:[
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '邮件地址',
                        key: 'email'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '注册时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },
                ],
                page:{
                    total:1,
                    pageNum:1,
                    pageSize:10
                },
                hospitalList:[],
                roleList:[],
                userSo:{},
                userList:[]
            }
        },
        mounted() {
            //初始查询select的列表
            searchHospitalIdAndName().then(res=>{
                this.hospitalList = res.data;
            });
            getRoleAll().then(res=>{
                this.roleList = res.data;
            });
            this.searchList()

        },
        methods:{
            //根据条件查询列表
            searchList(){
                //收集数据
                this.userSo.pageSize = this.page.pageSize;
                this.userSo.pageNum = this.page.pageNum;
                //ajax
                searchUserList(this.userSo).then(res=>{
                    if(res.code == 0){
                        res.data.list.forEach(u=>{
                            let time = new Date(u.registertime);
                            u.time = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
                        });
                        this.userList = res.data.list;
                        this.page.total = res.data.total;
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            },
            removeUser(row){
                deleteUserById(row.id).then(res=>{
                    if(res.code == 0){
                        this.userList = this.userList.filter(u=>row.id!=u.id);
                        this.$Message.success(res.message);
                    }else{
                        this.$Message.error(res.message);
                    }
                })
            },
            showUser(row){
                let data = {
                    path: "/core/userRole/set",
                    query: row
                };

                this.$router.push(data);
            }
        }
    }
</script>

<style scoped>
    .optionFont{
        font-size: 15px;
        line-height: 30px;
    }
    .page{
        text-align: center;
    }



    .actionLine{
        width: 100%;
        height: 35.19px;
        background-color: rgba(0,255,255,0.1);
        margin-bottom: 2%;
    }
    .actionButton Button{
        margin-left: 1.5%;
    }
</style>