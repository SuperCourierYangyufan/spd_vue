<template>
    <div class="menulist">
        <Poptip placement="bottom">
            <a href="#">
                           <span>
                                {{currentTitle}}
                            </span>
            </a>
            <div class="api" slot="content">
                <ul v-for="(i,index) in loginmodle.roleList" :key="index">
                    <a><li class="menuinfo" @click="changeRole(i)">{{i.rolename}}</li></a>
                </ul>

            </div>
        </Poptip>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "menu-title",
        data(){
            return{
                currentTitle:''
            }
        },
        computed:{
            ...mapState(['loginmodle'])
        },
        mounted(){
            //初始化权限角色
            this.currentTitle = (this.loginmodle.roleList)[0].rolename
            this.sendRole((this.loginmodle.roleList)[0])
        },
        methods:{
            changeRole(role){
                //改变权限角色
                this.currentTitle = role.rolename
                this.sendRole(role)
            },
            sendRole(role){
                //向父组件发送role信息
                this.$emit('sendRole',role);
            }
        },

    }
</script>

<style scoped>
    .menulist{
        float: left;
        margin-left: 190px;
    }
    .menuinfo{
        font-size: 16px;
        color: lightsalmon;
        margin-bottom: 5px;
    }

    .menulist span{
        font-size: 18px;
        color: lightsalmon;
        line-height: 60px;
    }
</style>