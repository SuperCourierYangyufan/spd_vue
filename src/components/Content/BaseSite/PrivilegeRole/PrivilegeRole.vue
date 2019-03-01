<template>
    <div>
        <!--按钮-->
        <div>
            <div class="actionLine">
                <div class="actionButton">
                    <Button type="primary" icon="md-add" shape="circle" @click="addRole">添加权限角色</Button>
                    <Button type="primary" icon="ios-hammer" shape="circle" @click="updateRole">修改权限角色</Button>
                </div>
            </div>
        </div>
        <!--列表-->
        <div>
            <Collapse  accordion  simple style="width: 1500px;margin: 1% auto;">
                <Panel  v-for="(i,index) in RoleMessage" :key="index" >
                    <span class="titlefont">{{i}}</span>
                    <p slot="content">
                        <span class="menunum">总菜单数:{{(RoleInfoMessage[index])[0]}}</span>
                        <span class="menunum">总功能数:{{(RoleInfoMessage[index])[1]}}</span>
                        <span class="menunum">显示数:{{(RoleInfoMessage[index])[2]}}</span>
                        <span class="menunum">隐藏数:{{(RoleInfoMessage[index])[3]}}</span>
                    </p>
                </Panel>
            </Collapse>
        </div>
        <!--状态框-->
        <Modal
                v-model="showRoleModal.isshow"
                :title="showRoleModal.title"
                @on-ok="saveRole">
               <Row>
                   <i-col span="12" v-if="showRoleModal.oldselection">
                       <Select v-model="role.oldName" clearable style="width:200px" placeholder="请选择权限名" >
                           <Option v-for="(i,index) in RoleMessage" :key="index" :value="i">权限名:{{i}}</Option>
                       </Select>

                   </i-col>
                   <i-col span="4">
                       <p style="line-height: 29px">{{showRoleModal.prompt}}:</p>
                   </i-col>
                   <i-col span="8">
                       <i-input  v-model="role.newName"  type="textarea" :autosize="{minRows: 1,maxRows: 1}" >
                       </i-input>
                   </i-col>
               </Row>
        </Modal>
    </div>
</template>

<script>
    import {showRoles,saveRole} from "../../../../api/index"
    import ICol from "iview/src/components/grid/col";

    export default {
        components: {ICol},
        name: "privilege-role",
        data(){
            return{
                RoleInfoMessage: [],
                RoleMessage:[],
                showRoleModal:{
                    isshow:false,
                    oldselection:true
                },
                role:{
                    oldName: null,
                    newName: null
                }

            }
        },
        mounted(){
            this.searchRole()
        },
        methods:{
            addRole(){
                this.role ={
                    oldName: null,
                    newName: null
                };
                this.showRoleModal.oldselection = false;
                this.showRoleModal.title = "添加权限菜单,请联系后端开发人员做相应处理";
                this.showRoleModal.message = "请添加所需添加的权限";
                this.showRoleModal.prompt = "添加权限名";
                this.showRoleModal.isshow = true;
            },
            updateRole(){
                this.role ={
                    oldName: null,
                    newName: null
                };
                this.showRoleModal.oldselection = true;
                this.showRoleModal.title = "修改权限菜单";
                this.showRoleModal.message = "根据选项原先权限菜单名修改权限名";
                this.showRoleModal.prompt = "修改权限名";
                this.showRoleModal.isshow = true;
            },
            saveRole(){
                saveRole(this.role).then(res=>{
                    if(res.code == "0"){
                        this.$Message.success(res.message);
                        this.searchRole();
                    }else{
                        this.$Message.fail(res.message)
                    }
                });
            },
            searchRole(){
                showRoles().then(res=>{
                    if(res.code == "0"){
                        this.RoleMessage = [];
                        this.RoleInfoMessage = [];
                        Object.keys(res.data).forEach(i=>{
                            this.RoleMessage.push(i);
                            this.RoleInfoMessage.push(res.data[i]);
                        })
                        //翻转
                    }else{
                        this.$Message.error(res.message)
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .actionLine{
        width: 100%;
        height: 35.19px;
        background-color: rgba(0,255,255,0.1);
        margin-bottom: 2%;
    }
    .actionButton Button{
        margin-left: 1.5%;
    }




    .menunum{
        color: #93defe;
        font-size: 20px;
        margin-left: 3%;
        line-height: 50px;
        font-family: 华文行楷;
    }

    .titlefont{
        color: coral;
        font-size: 25px;
        font-family: 华文彩云;
    }
</style>