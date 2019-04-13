<template>
    <div>
       <div v-if="status==0">
           <div class="actionLine">
               <div class="actionButton">
                   <Button type="primary" icon="md-cart" shape="circle" @click="saveForm">申请调拨</Button>
                   <Button type="primary" icon="md-add" shape="circle" @click="status = 1">添加货物</Button>
               </div>

           </div>
           <div  style="margin: 0 auto;width: 1500px">
               <Table  :columns="title" :data="GoodsList">
                   <template slot-scope="{ row, index }" slot="action">
                       <div >
                           <Button type="error" @click="RemoveGood(row)">删除</Button>
                       </div>
                   </template>
               </Table>
           </div>
           <!--分页-->
           <!--<div>-->
               <!--<Row>-->
                   <!--<i-col offset="8" span="7" style="margin-top: 1%;margin-left: 30%">-->
                       <!--<Page class="page" :total="page.total"  :current.sync="page.pageNum" show-total />-->
                   <!--</i-col>-->
               <!--</Row>-->
           <!--</div>-->
       </div>
        <div v-if="status != 0">
            <div class="actionLine">
                <div class="actionButton">
                    <Button type="primary" icon="md-add" shape="circle" @click="addGood">保存</Button>
                    <Button type="primary" icon="md-close" shape="circle"  @click="status = 0">返回</Button>
                </div>
            </div>
            <Row class="tableFont">
                <i-col span="18" offset="2">
                    <span><b>选择货物:</b></span>
                </i-col>
            </Row>
            <Row>
                <i-col span="18" offset="3">
                    <!--内容区域-->
                    <Row :gutter = "16" class="tablerow">
                        <i-col span="12">
                            <Select placeholder="需求货物" v-model="currentGoodId">
                                <Option v-for="(i,index) in Goods" :value="i.id">{{i.name}}</Option>
                            </Select>
                        </i-col>
                        <i-col span="12">
                            <Input v-model="goodNumber">
                                <span slot="prepend">本次申请货物数量</span>
                            </Input>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
            <Row class="tableFont">
                <i-col span="18" offset="2">
                    <span><b>该货物详情:</b></span>
                </i-col>
            </Row>
            <Row>
                <i-col span="18" offset="3">
                    <!--内容区域-->
                    <Row :gutter = "16" class="tablerow">
                        <i-col span="12" >
                            <Input disabled v-model="currentGood.numberMax">
                                <span slot="prepend" >最大库存数</span>
                            </Input>
                        </i-col>
                        <i-col span="12" >
                            <Input disabled v-model="currentGood.numberMin">
                                <span slot="prepend">最小库存数</span>
                            </Input>
                        </i-col>
                    </Row>
                </i-col>
                <i-col span="18" offset="3">
                    <!--内容区域-->
                    <Row :gutter = "16" class="tablerow">
                        <i-col span="12">
                            <Input disabled v-model="currentGood.number">
                                <span slot="prepend">当前库存数</span>
                            </Input>
                        </i-col>
                        <i-col span="12">
                            <Input disabled v-model="currentGood.time" >
                                <span slot="prepend" >上次调拨日期</span>
                            </Input>
                        </i-col>
                    </Row>
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
    import {searchGoods,searchStock,saveRequestForm} from "../../../../api/index"
    import {mapState} from "vuex"
    export default {
        name: "WarehousingApplication",
        data(){
            return{
                title:[
                    {
                        title: '商品名',
                        key: 'name'
                    },
                    {
                        title: '库存数',
                        key: 'totalnumber'
                    },
                    {
                        title: '最大库存值',
                        key: 'numberMax'
                    },
                    {
                        title: '最小库存值',
                        key: 'numberMin'
                    },
                    {
                        title: '申请数',
                        key: 'number'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },
                ],
                GoodsList:[],
                Goods:[],
                // page:{
                //     total:1,
                //     pageNum:1,
                //     pageSize:10
                // },
                currentGood:{},
                currentGoodId:0,
                status:0,
                goodNumber:0
            }
        },
        computed:{
            ...mapState(['loginmodle','current'])
        },
        methods:{
            addGood(){
                let  flag = true;
                this.GoodsList.forEach(g=>{
                    if(g.goodid == this.currentGoodId){
                        //之前有过该货物
                        g.number = parseInt(g.number)+parseInt(this.goodNumber);
                        flag = false;
                    }
                });

                if(flag){
                    let goodName = "";
                    this.Goods.forEach(i=>{
                        if(i.id == this.currentGoodId){
                            goodName = i.name;
                        }
                    });
                    //收集数据
                    let transmissionSo = {
                        uid:this.loginmodle.user.id,
                        rid:this.current.id,
                        number:this.goodNumber,
                        goodid:this.currentGoodId,
                        numberMax:this.currentGood.numberMax,
                        numberMin:this.currentGood.numberMin,
                        totalnumber:this.currentGood.number,
                        name:goodName
                    };
                    this.GoodsList.push(transmissionSo);
                }

                //清除数据回退
                this.currentGood = {};
                this.currentGoodId = 0;
                this.goodNumber = 0;
                this.status = 0;
            },
            RemoveGood(row){
                this.GoodsList = this.GoodsList.filter(i=>i.goodid!=row.goodid);
            },
            saveForm(){
                //保存
                saveRequestForm(this.GoodsList).then(res=>{
                    if(res.code == 0){
                        //清除数据
                        this.GoodsList = [];
                        this.$Message.success(res.message);
                    }else{
                        this.$Message.error(res.message);
                    }
                });
            }
        },
        mounted() {
            //封装查询信息
            let goodsSo = {
                uid: this.loginmodle.user.id,
                hospitalId:this.loginmodle.user.hospitalid,
                roleid: this.current.id,
                pageSize: 999,
                pageNum: 1
            };
            searchGoods(goodsSo).then(res=>{
                if(res.code == "0"){
                    this.Goods = res.data.list;
                }
            })
        },
        watch:{
            currentGoodId(value){
                if(value!=0){
                    let StockSo = {
                        uid:this.loginmodle.user.id,
                        goodid:value
                    };
                    this.currentGood = {};
                    searchStock(StockSo).then(res=>{
                        if(res.code == 0&&res.data!=null){
                            let updateTime = new Date(res.data.updateTime);
                            res.data.time = updateTime.getFullYear()+"-"+(updateTime.getMonth()+1)+"-"+updateTime.getDate();
                            this.currentGood = res.data;
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>