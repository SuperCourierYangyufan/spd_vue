<template>
    <div class="login_box">
        <div class="login_l_img"><img src="../assets/images/login-img.png" /></div>
        <div class="login">
            <div class="login_logo"><a href="#"><img src="../assets/images/login_logo.png" /></a></div>
            <div class="login_name">
                <p>SPD管理系统</p>
            </div>
            <div>
                <div v-if="this.showrelogin">
                    <input  style="height: 50px" name="username" type="text"  value="用户名" onfocus="this.value=''" onblur="if(this.value==''){this.value='用户名'}" v-model="user.username">
                    <span id="password_text" onclick="this.style.display='none';document.getElementById('password').style.display='block';document.getElementById('password').focus();" >密码</span>
                    <input   v-model="user.password" name="password" type="password" id="password" style="display:none;height: 50px" onblur="if(this.value==''){document.getElementById('password_text').style.display='block';this.style.display='none'};"/>
                    <input value="登录" style="width:100%;" type="submit" @click="showModel">
                </div>
                <div v-if="!this.showrelogin">
                    <div class="reloginmsg">您已经登入过了,账号为:{{loginmodle.user.name}}</div>
                    <input class="reButton"  value="登录" style="width:100%;" type="submit" @click="checkLogin()">
                    <input class="reButton" value="切换账号" style="width:100%;" type="submit" @click="changeLogin()">
                </div>
                <Modal
                        v-model="showmodel"
                        footer-hide = true
                        title="请将滑块拖至最右边,完成验证">
                    <Slider v-model="sliderModel"></Slider>
                </Modal>
            </div>
        </div>
        <div class="copyright">个人毕业设计 版权所有©2018-2019 技术支持电话：18827421758</div>
    </div>
</template>

<script>
    import '../common/css/login.css'
    import {mapState} from 'vuex'
    export default {
        name: "login",
        mounted(){
            if(this.loginmodle.code == 0&&this.loginmodle.user!=null){
                this.showrelogin = false;
            }
        },
        data(){
            return{
                user:{
                    username: '',
                    password: ''
                },
                showmodel: false,
                sliderModel: 0,
                showrelogin:true,
            }
        },
        computed:{
            ...mapState(['loginmodle'])
        },
        methods:{
            showModel(){
                //归0
                this.sliderModel = 0;
                //展示出验证条
                this.showmodel = true
            },
            loginSpd(){
                    this.$store.dispatch('loginUser',this.user).then(()=>{
                        if(this.loginmodle.code == 0 && this.loginmodle.message == 'success'){
                            //登入成功
                            this.$router.replace('/core')
                            this.$Message.success("登入成功")
                        }else{
                            //登入失败
                            this.$Message.error(this.loginmodle.message);
                        }
                        this.$Spin.hide();
                    })


            },
            checkLogin(){
                this.$router.replace('/core')
                this.$Message.success("登入成功")
            },
            changeLogin(){
                this.$store.dispatch('logoutmodle',()=>{
                    this.$nextTick(()=>{
                        //退出成功
                        this.showrelogin = true
                        this.$Message.success("请重新输入账号密码")
                    })
                });
            }

        },
        watch:{
            sliderModel(val){
                if(val==100){
                    //进度环
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'ios-loading',
                                        size: 18
                                    }
                                }),
                                h('div', '努力加载中！')
                            ])
                        }
                    });
                    //进度条拉到最大了
                    //归0
                    val = 0;
                    //消失
                    this.showmodel = false;
                    //登入
                    this.loginSpd();
                }
            }
        }

    }
</script>

<style scoped>
.reloginmsg{
    color: red;
    text-align: center;
    font-size: 16px;
}
    .reButton{
        margin-top: 15px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>