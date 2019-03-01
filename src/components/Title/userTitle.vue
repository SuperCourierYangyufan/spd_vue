<template>
    <div class="demo-avatar-badge user">
        <Badge :count="1">
            <Avatar shape="square" icon="ios-person" />
        </Badge>
        <div class="username">
            <Poptip placement="bottom">
                <a class="name">{{loginmodle.user.name}}</a>
                <div class="api" slot="content">
                    <ul>
                        <a><li class="userinfo">查看信息</li></a>
                    </ul>
                    <ul>
                        <a><li class="userinfo">用户管理</li></a>
                    </ul>
                    <ul>
                        <a><li class="userinfo" @click="logout()">退出</li></a>
                    </ul>
                </div>
            </Poptip>
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        name: "user-title",
        computed:{
            ...mapState(['loginmodle'])
        },
        methods:{
            ...mapActions(['logoutmodle']),
            logout(){
                this.logoutmodle(()=>{
                   this.$nextTick(()=>{
                       //退出成功
                       this.$router.replace('/login');
                       this.$Message.success('您已经成功退出')
                   })
                });
            }
        },
    }
</script>

<style scoped>
    .user{
        float: right;
        padding-top: 12px;
    }
    .username{
        float: right;
        margin-left: 18px;

    }

    .name{
        font-size: 18px;
        line-height: 34px;
        color: #27A9E3;
    }
    .userinfo{
        font-size: 16px;
        color: #27A9E3;
        margin-bottom: 5px;
    }
</style>