<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" v-show="status !=0 && status !=4" :icon="buttonInfo.icon[1]" shape="circle" @click="changeStatus(-1)">{{buttonInfo.message[1]}}</Button>
                <Button type="primary" v-show="status !=2 && status !=4" :icon="buttonInfo.icon[0]" shape="circle" @click="changeStatus(1)">{{buttonInfo.message[0]}}</Button>
                <Button type="primary" v-show="status ==2" icon="md-mail" shape="circle" @click="sendMsg">发送验证码</Button>
                <Button type="primary" v-show="status ==2||status == 4" icon="md-add" shape="circle" @click="saveUser">保存用户</Button>
                <Button type="primary" icon="md-close" shape="circle" @click="$router.replace('/core/userRole') ">取消</Button>
            </div>
        </div>
        <!--状态0页面-->
        <div v-if="status == 0||status == 4" >
            <!--菜单明细-->
            <Row class="tableFont">
                <i-col span="18" offset="2">
                    <span><b>基本信息:</b></span>
                </i-col>
            </Row>
            <Row>
                <i-col span="18" offset="3">
                    <!--内容区域-->
                    <Row :gutter = "16" class="tablerow">
                        <i-col span="12">
                            <i-input size="large" v-model="userSo.username">
                                <span slot="prepend" >登入账号:</span>
                            </i-input>
                        </i-col>
                        <i-col span="12" >
                            <i-input size="large" v-model="userSo.password">
                                <span slot="prepend">登入密码:</span>
                            </i-input>
                        </i-col>
                    </Row>
                    <Row :gutter = "16" class="tablerow">
                        <i-col span="12">
                            <i-input size="large" v-model="userSo.name">
                                <span slot="prepend" >用户名:</span>
                            </i-input>
                        </i-col>
                        <i-col span="12">
                            <Select placeholder="所属医院" v-model="userSo.hospitalid">
                                <Option v-for="(i,index) in hospitalList"  :key="index" :value="i.id">所属医院:{{i.name}}</Option>
                            </Select>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
            <Row class="tableFont">
                <i-col span="18" offset="2">
                    <span><b>移动信息(注册重要信息):</b></span>
                </i-col>
            </Row>
            <Row>
                <i-col span="18" offset="3">
                    <!--内容区域-->
                    <Row :gutter = "16" class="tablerow">
                        <i-col span="12">
                            <i-input size="large" v-model="userSo.phone">
                                <span slot="prepend" >手机号:</span>
                            </i-input>
                        </i-col>
                        <i-col span="12" >
                            <i-input size="large" v-model="userSo.email">
                                <span slot="prepend" >邮箱号:</span>
                            </i-input>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </div>
        <!--状态1页面-->
        <div  v-if="status == 1">
            <Row class="tableFont">
                <i-col span="18" offset="2">
                    <span><b>分配权限:</b></span>
                </i-col>
                <i-col span="18" offset="3">
                    <span style="color: red">左侧选择框为全部权限,右侧为您需要为新账号设置的权限,将左边所需的权限放进右边便可</span>
                </i-col>
            </Row>
            <Row>
                <i-col span="12" offset="9">
                    <Transfer
                            :data="roleList"
                            :target-keys="targetKeys"
                            :render-format="render"
                            :titles="titles"
                            @on-change="handleChange"
                            style="height: 600px"
                    ></Transfer>
                </i-col>
            </Row>
        </div>
        <!--状态2页面-->
        <div  v-if="status == 2">
            <Row class="tableFont">
                <i-col span="18" offset="2">
                    <span><b>验证账号:</b></span>
                </i-col>
                <i-col span="18" offset="3">
                    <span style="color: red">输入当前账号绑定的手机,将会有验证码发送至手机,请输入验证码</span>
                </i-col>
            </Row>
            <Row>
                <i-col span="18" offset="3">
                    <!--内容区域-->
                    <Row :gutter = "16" class="tablerow">
                        <i-col span="12">
                            <i-input size="large" v-model="verification.inputcode">
                                <span slot="prepend" >验证码:</span>
                            </i-input>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
    import {searchHospitalIdAndName,getRoleAll,sendMsg,saveUser} from '../../../../api/index'
    import {mapState} from 'vuex';
    export default {
        name: "userRole_set",
        data(){
            return{
                buttonInfo:{
                   icon:['md-arrow-round-forward','md-arrow-round-back','md-add'],
                   message:['下一步','上一步','添加']
                },
                status:0,
                hospitalList:[],
                roleList:[],
                targetKeys: [],
                titles:['所有权限','您需要分配权限'],
                userSo:{},
                verification:{}
            }
        },
        mounted() {
            //初始查询select的列表
            searchHospitalIdAndName().then(res=>{
                this.hospitalList = res.data;
            }).finally(()=>{
                getRoleAll().then(res=>{
                    res.data.forEach(i=>i.key = i.id+'');
                    this.roleList = res.data;
                }).finally(()=>{

                    //获得数据
                    if(this.$route.query.id!=null){
                        //数据处理
                        this.status = 4;
                        this.$route.query.password = "*********";
                        this.userSo = this.$route.query;
                    }
                });
            });



        },
        computed:{
            ...mapState(["loginmodle"])
        },
        methods:{
            changeStatus(index){
                if(index>0){
                    //下一步
                    if(this.status<2)
                        if(this.status == 1){
                            if(this.targetKeys==null||this.targetKeys.length<=0){
                                this.$Message.error("新用户不能没有权限,将无法分配菜单")
                            }else{
                                this.status+=index;
                            }
                        }else{
                            this.status+=index;
                        }
                }else{
                    if(this.status>0)
                        this.status+=index;
                }
            },
            render (item) {
                return item.rolename
            },
            sendMsg(){
                //发送验证码请求
                sendMsg().then(res=>{
                    if(res.code == 0){
                        this.verification.code = res.data;
                    }else{
                        this.$Message.error(res.data.message)
                    }
                });

            },
            handleChange(newTargetKeys, direction, moveKeys){
                    this.targetKeys = newTargetKeys;
            },
            saveUser(){
                //验证验证码
                if((this.verification.inputcode != this.verification.code||this.verification.inputcode == null)&&this.status == 2){
                    //验证码错误
                    this.$Message.error("验证码错误,请重新输入")
                }else{
                    this.$Spin.show();
                    //整合数据
                    // let roles = [];
                    // for(let i=0;i<this.targetKeys.length;i++){
                    //     for(let j=0;j<this.roleList.length;j++){
                    //         console.log(this.roleList[j].id);
                    //         console.log(this.targetKeys[i]);
                    //         if(this.roleList[j].key == this.targetKeys[i]){
                    //             roles.push(this.roleList[j])
                    //         }
                    //     }
                    // }
                    if(this.status!=4){
                        this.userSo.roles = this.targetKeys;
                    }else{
                        if(this.userSo.password == "*********"){
                            this.userSo.password = null;
                        }
                    }
                    //ajax
                    saveUser(this.userSo).then(res=>{
                       if(res.code == "0"){
                           this.$Message.success(res.message);
                           if(this.status == 2 || this.loginmodle.user.id !=this.userSo.id ){
                               this.$router.replace('/core/userRole');
                           }else{
                               this.$store.dispatch('logoutmodle',()=>{
                                   this.$nextTick(()=>{
                                       //退出成功
                                       this.$Message.success("修改为当前用户,请重新登入");
                                       this.$router.replace("/login")
                                   })
                               })
                           }

                       }else{
                           this.$Message.error(res.message);
                       }
                    }).finally(res=>{
                        this.$Spin.hide();
                    });
                }
            }

        }
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