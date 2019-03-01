<template>
    <div>
        <Menu  theme="light" width="auto" @on-select="changeMenu" :open-names="openMenu">
            <Submenu :name="index" v-for="(i,index) in currentMenu"   :key = index  v-if="i[0].isshow==1">
                <template slot="title">
                    <Icon :type="i[0].icon"></Icon>
                    {{i[0].menuname}}
                </template>
                <MenuItem :name="index+'-'+lenth" v-for="(j,lenth) in i" :key="lenth" v-if="lenth!=0&&j.isshow==1">{{j.menuname}}</MenuItem>
            </Submenu>
            <!--<Submenu name="2">-->
                <!--<template slot="title">-->
                    <!--<Icon type="ios-keypad"></Icon>-->
                    <!--Item 2-->
                <!--</template>-->
                <!--<MenuItem name="2-1">Option 1</MenuItem>-->
                <!--<MenuItem name="2-2">Option 2</MenuItem>-->
            <!--</Submenu>-->
        </Menu>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "left-menu",
        data(){
            return{
                currentMenu:[],
                openMenu:[]
            }
        },
        props:[
            'currentRole'
        ],
        methods:{
            changeMenu(menuPath){
               let path = menuPath.split('-');
               let cureentMenu = (this.currentMenu)[path[0]][path[1]]
               this.$emit('changeMenu',cureentMenu)
            }
        },
        computed: {
            ...mapState(['loginmodle'])
        },
        mounted(){
        },
        watch:{
            currentRole(role){
                //删除菜单元素
                this.currentMenu = []
                this.loginmodle.menuList.forEach(i=>{
                    //遍历所有菜单
                    if(i[0].roleid == role.id){
                        //为当前role权限的菜单
                        this.currentMenu.push(i);
                    }

                })
            }
        }
    }
</script>

<style scoped>

</style>