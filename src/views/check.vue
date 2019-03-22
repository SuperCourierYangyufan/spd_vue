<template>
    <div>
        <div class="mars"></div>
        <img src="../assets/images/img404/meteor.svg" class="meteor" />
        <p class="title">激活成功!!</p>
        <p class="subtitle">
            {{time}}秒后将为你跳转登入页<br/>
            或者点击按钮跳转
        </p>
        <div align="center">
            <a class="btn-back" href="#" @click="loginUser">前去登入</a>
        </div>
        <img src="../assets/images/img404/astronaut.svg" class="astronaut" />
        <!--<img src="../assets/images/img404/spaceship.svg" class="spaceship" />-->
    </div>
</template>

<script>
    export default {
        name: "check",
        data(){
            return{
                time: 3
            }
        },
        mounted() {
            //退出
            this.$store.dispatch('logoutmodle',()=>{
                this.$nextTick(()=>{
                    let Timer = window.setInterval(()=>{
                        this.time--;
                        if(this.time == 0){
                            window.clearInterval(Timer);
                            this.$router.replace("/login")
                        }
                    },1000)
                })
            });

        },
        methods:{
            loginUser(){
                this.$router.replace("/login")
            },
        }
    }
</script>

<style scoped>

</style>