<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" v-if="status!=0"  icon="md-close" shape="circle" @click="goback">返回</Button>
            </div>
        </div>
        <div v-if="status==0">
            <!--筛选-->
            <div>
                <Row  style="text-align: center;margin-bottom: 1%;">
                    <i-col span="2" offset="2">
                        <span class="optionFont" >订单号</span>
                    </i-col>
                    <i-col span="5"  class="OptionClass">
                        <Input  style="width: 100%" v-model="orderSo.lotNumber"/>
                    </i-col>
                    <i-col span="1" offset="2">
                        <span class="optionFont">状态:</span>
                    </i-col>
                    <i-col span="5"  class="OptionClass" >
                        <Select v-model="orderSo.status">
                            <Option :value="0">所有货物未签收</Option>
                            <Option :value="1">货物确认一部分</Option>
                            <Option :value="2">所有货物已签收</Option>
                        </Select>
                    </i-col>
                    <i-col span="5"><Button type="primary" shape="circle" icon="ios-search" @click="searchList">查询</Button></i-col>
                </Row>
            </div>
            <!--菜单列表-->
            <div>
                <Table   :columns="title" :data="orderList" width="1500" style="margin: 0 auto">
                    <template slot-scope="{ row, index }" slot="status">
                        <div v-if="row.status == 0">
                            <font color="red">所有货物未签收</font>
                        </div>
                        <div v-if="row.status == 1">
                            <font color="yellow">货物确认一部分</font>
                        </div>
                        <div v-if="row.status == 2">
                            <font color="aqua">所有货物已签收</font>
                        </div>
                        <div v-if="row.status == 3">
                            <font color="green">货物单签收</font>
                        </div>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <div >
                            <Button type="info" @click="showDetail(row)">查看订单详情</Button>
                            <!--&nbsp;-->
                            <!--<Button type="success">确认签收</Button>-->
                        </div>
                    </template>
                </Table>
            </div>
            <!--分页-->
            <div>
                <Row>
                    <i-col offset="8" span="7" style="margin-top: 1%;margin-left: 30%">
                        <Page class="page" :total="page.total"  :current.sync="page.pageNum" show-total @on-change="searchList"/>
                    </i-col>
                </Row>
            </div>
        </div>
        <div v-if="status!=0">
            <div>
                <Table   :columns="titleItem" :data="itemList" width="1500" style="margin: 0 auto">
                    <template slot-scope="{ row, index }" slot="action">
                        <div v-show="row.isshow ==0">
                            <Button type="info" @click="acceptNumber(row)" value="row.id">确认订单数</Button>
                        </div>
                        <div v-show="row.isshow !=0">
                                <span>{{row.actually_received}}</span>
                        </div>
                    </template>
                </Table>
            </div>
            <div>
                <Row>
                    <i-col offset="8" span="7" style="margin-top: 1%;margin-left: 42%">
                        <Page class="pageItem" :total="pageItem.total"  :current.sync="pageItem.pageNum" show-total @on-change="searchList"/>
                    </i-col>
                </Row>
            </div>
        </div>
        <!--删除框-->
        <Modal  v-model="isshow" width="360">
            <p slot="header" style="color:#27A9E3;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>确认收货数量</span>
            </p>
            <div style="text-align:center">
                <Input v-model="currentRow.actuallyReceived">
                    <span slot="prepend">收货数量</span>
                </Input>
            </div>
            <div slot="footer">
                <Button type="info" size="large" long  @click="changeNumber">确认</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {searchOrders,showItem,changeReceivable} from '../../../../api/index'
    export default {
        name: "StorageAcceptance",
        data(){
            return{
                title:[
                    {
                        title: '订单号',
                        key: 'lotNumber'
                    },
                    {
                        title: '总货物数',
                        key: 'goodNumber'
                    },
                    {
                        title: '入库时间',
                        key: 'start'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '状态',
                        slot: 'status'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },
                ],
                orderList:[],
                page:{
                    total:1,
                    pageNum:1,
                    pageSize:10
                },
                orderSo:{},
                status:0,
                titleItem:[
                    {
                        title: '订单号',
                        key: 'lot_number'
                    },
                    {
                        title: '商品名',
                        key: 'name'
                    },
                    {
                        title: '出厂日期',
                        key: 'startTime'
                    },
                    {
                        title: '过期日期',
                        key: 'endTime'
                    },
                    {
                        title: '应收数',
                        key: 'receivable'
                    },
                    {
                        title: '实收数',
                        slot: 'action'
                    },
                ],
                itemList:[],
                pageItem:{
                    total:1,
                    pageNum:1,
                    pageSize:10
                },
                orderDetailSo:{},
                isshow:false,
                currentRow:{},
                currentInfo:{}
            }
        },
        computed:{
            ...mapState(['loginmodle','current'])
        },
        methods:{
            searchList(){
                //收集数据
                this.orderSo.uid = this.loginmodle.user.id;
                this.orderSo.rid = this.current.id;
                this.orderSo.pageNum = this.page.pageNum;
                this.orderSo.pageSize = this.page.pageSize;
                searchOrders(this.orderSo).then(res=>{
                    if(res.code == "0"){
                        res.data.list.forEach(i=>{
                            let time = new Date(i.createTime);
                            i.start = time.getFullYear()+"-"+(time.getMonth()+1)+"-"+time.getDate();
                        });
                        this.orderList = res.data.list;
                        this.page.total = res.data.total;
                    }else{
                        this.$Message.error(res.message);
                    }
                });
            },
            showDetail(row){
                this.currentInfo = row;
                this.orderDetailSo.id = row.id;
                this.orderDetailSo.pageNum = this.pageItem.pageNum;
                this.orderDetailSo.pageSize = this.pageItem.pageSize;
                showItem(this.orderDetailSo).then(res=>{
                    if(res.code == "0"){
                        res.data.list.forEach(i=>{
                            let startTime = new Date(i.production_time);
                            i.startTime = startTime.getFullYear()+"-"+(startTime.getMonth()+1)+"-"+startTime.getDate();
                            let endTime = new Date(i.expiration_time);
                            i.endTime = endTime.getFullYear()+"-"+(endTime.getMonth()+1)+"-"+endTime.getDate();
                            if(i.actually_received!=null){
                                i.isshow = 1;
                            }else {
                                i.isshow = 0;
                            }
                        });
                        this.itemList = res.data.list;
                        this.pageItem.total = res.data.total;
                        this.status = 1;
                    }else{
                        this.$Message.error(res.message);
                    }
                });
            },
            acceptNumber(row){
                this.currentRow = row;
                this.isshow = true;
            },
            changeNumber(){
                //修改
                //修改数量
                this.currentRow.goodId = this.currentRow.good_id;
                this.currentRow.lotNumber = this.currentRow.lot_number;
                changeReceivable(this.currentRow).then(res=>{
                    if(res.code == 0){
                        this.row.isshow = 1;
                    }
                }).finally(res=>{
                    this.showDetail(this.currentInfo)
                });
                this.isshow = false
            },
            goback(){
                this.searchList();
                this.status =0;
            }
        },
        mounted() {
            this.searchList();
        }
    }
</script>

<style scoped>

</style>