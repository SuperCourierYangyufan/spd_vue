<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="$router.replace('/core/storeroom/cargoManagement/set')">添加货物</Button>
            </div>
        </div>
        <!--筛选-->
        <div>
            <Row  style="text-align: center;margin-bottom: 1%;">
                <i-col span="2" offset="2">
                    <span class="optionFont">货物名:</span>
                </i-col>
                <i-col span="5"  class="OptionClass">
                <Input style="width: 100%" v-model="goodsSo.name"/>
                </i-col>
                <i-col span="1" offset="1">
                    <span class="optionFont" >价格区间:</span>
                </i-col>
                <i-col span="8"  class="OptionClass" >
                    <Row>
                        <i-col span="11">
                            <i-input v-model="goodsSo.minPrice">
                            <span slot="prepend" >最小值</span>
                            </i-input>
                        </i-col>
                        <i-col span="2">
                            <div style="width: 100%;font-size: 20px">
                                <b>-</b>
                            </div>
                        </i-col>
                       <i-col span="11">
                           <i-input v-model="goodsSo.maxPrice" >
                               <span slot="append">最大值</span>
                           </i-input>
                       </i-col>


                    </Row>
                </i-col>
                <i-col span="4"><Button  type="primary" shape="circle" icon="ios-search" @click="searchGoods">查询</Button></i-col>
            </Row>
        </div>
        <!--列表-->
        <div>
            <Table  :columns="title" :data="goodList" width="1500" style="margin: 0 auto">
                <template slot-scope="{ row, index }" slot="action">
                </template>
            </Table>
        </div>
        <!--分页-->
        <div>
            <Row>
                <i-col offset="8" span="7" style="margin-top: 1%;margin-left: 30%">
                    <Page class="page" :total="page.total"  :current.sync="page.pageNum" show-total  @on-change="searchGoods"/>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {searchGoods} from '../../../../api/index'
    export default {
        name: "CargoManagement",
        data(){
            return{
                title: [
                    {
                        title: '名字',
                        key: 'name'
                    },
                    {
                        title: '价格',
                        key: 'price'
                    },
                    {
                        title: '类型',
                        key: 'typename'
                    },
                    {
                        title: '保质期(天)',
                        key: 'shelflife'
                    },
                    {
                        title: '出厂地址',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },

                ],
                goodList:[],
                page:{
                    total:1,
                    pageNum:1,
                    pageSize:10

                },
                goodsSo:{

                }
            }
        },
        computed:{
            ...mapState(['current','loginmodle'])
        },
        mounted() {
            this.searchGoods();
        },
        methods:{
            searchGoods(){
                //整合数据
                this.goodsSo.uid = this.loginmodle.user.id;
                this.goodsSo.hospitalId = this.loginmodle.user.hospitalid;
                this.goodsSo.roleid = this.current.id;
                this.goodsSo.pageSize = this.page.pageSize;
                this.goodsSo.pageNum = this.page.pageNum;
                searchGoods(this.goodsSo).then(res=>{
                    if(res.code == 0){
                        this.goodList = res.data.list;
                        this.page.total = res.data.total;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>