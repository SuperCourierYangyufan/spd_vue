<template>
    <div class="layout">
        <Layout>
            <Header>
                <div>
                    <menu-title @sendRole="receiveRole"></menu-title>
                    <user-title></user-title>
                </div>
            </Header>
            <div class="DividingLine"></div>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <left-menu :currentRole="currentRole" @changeMenu="changeMenu"></left-menu>
                </Sider>
                <Layout :style="{padding: '0 14px 14px'}">
                    <Breadcrumb :style="{margin: '8px 0'}">
                        <BreadcrumbItem v-for="(i,index) in currentPath" :key="index">{{i}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '0px', minHeight: '1980px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    import  userTitle from '../components/Title/userTitle'
    import  menuTitle from '../components/Title/menuTitle'
    import leftMenu from '../components/Menu/leftMenu'

    export default {
        name: "core",
        data(){
            return{
                currentRole:{},
                currentMenu:{},
                currentPath:[]
            }
        },
        methods:{
            receiveRole(role){
                this.currentRole = role
            },
            changeMenu(menu){
                this.currentMenu = menu
                //跳转页面
                this.$router.replace(menu.href)
            },
            changePath(rolePath,menuPath){
                //清空之前路径
                this.currentPath = []
                //改变路径
                this.currentPath.push(rolePath);
                if(menuPath!=null){
                    menuPath.forEach(menu=>{
                        this.currentPath.push(menu);
                    });
                }
            },
        },
        components:{
            userTitle,
            menuTitle,
            leftMenu
        },
        mounted(){
            this.currentPath = [this.currentRole.rolename,'我的信息']
        },
        watch:{
            currentRole(val){
                let menuList = null;
                // if(this.currentMenu.pathname!=null){
                //      menuList = this.currentMenu.pathname.split(',');
                // }
                this.changePath(val.rolename,menuList)
            },
            currentMenu(val){
                let menuList = val.pathname.split(',');
                this.changePath(this.currentRole.rolename,menuList)
            }
        }
    }
</script>

<style scoped>


    .DividingLine{
        height: 7px;
        width: 100%;
        background-color: #F5F7F9;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .ivu-layout-header {
        background: #FFFFFF;
    }



</style>