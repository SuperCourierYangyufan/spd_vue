<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="$router.replace('/core/hospital/set')">添加医院</Button>
            </div>`
        </div>
        <!--筛选-->
        <div>
            <Row  style="text-align: center;margin-bottom: 1%;">
                <i-col span="2" offset="2">
                    <span class="optionFont">医院类型:</span>
                </i-col>
                <i-col span="4"  class="OptionClass" style="height: 35px">
                    <Select  clearable  placeholder="请选择" v-model="hospitalSo.type">
                        <Option value="0">医院类型:公立</Option>
                        <Option value="1">医院类型:私立</Option>
                    </Select>
                </i-col>
                <i-col offset="1" span="2">
                    <span class="optionFont">地址:</span>
                </i-col>
                <i-col span="5" >
                    <Input  placeholder="医院模糊地址" v-model="hospitalSo.address"></Input>
                </i-col>
                <i-col  offset="2" span="6"><Button  type="primary" shape="circle" icon="ios-search" @click="searchList">查询</Button></i-col>
            </Row>
        </div>
        <!--列表-->
        <div>
            <Table  :loading="loading" :columns="title" :data="hospitalList"  width="1500" style="margin: 0 auto">
                <template slot-scope="{ row, index }" slot="action">
                    <div >
                        <Button type="success" @click="showHospital(row)">明细</Button>
                        &nbsp;
                        <Button type="error" @click="removeHospital(row)">删除</Button>
                    </div>
                </template>
            </Table>
        </div>
        <!--分页-->
        <div>
            <Row>
                <i-col offset="8" span="7" style="margin-top: 1%;margin-left: 30%">
                    <Page class="page" :total="page.total"  :current.sync="page.pageNum" show-total  />
                </i-col>
            </Row>
        </div>
    </div>
</template>

<script>
    import {searchHospital,deleteHospital} from "../../../../api/index"
    import ICol from "iview/src/components/grid/col";
    export default {
        components: {ICol},
        name: "hospital",
        data(){
            return{
                loading:true,
                title: [
                    {
                        title: '医院名',
                        key: 'name'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '员工数',
                        key: 'employeecount'
                    },
                    {
                        title: '运营开始时间',
                        key: 'date'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },
                ],
                hospitalSo:{},
                hospitalList:[],
                page:{
                    total:1,
                    pageNum:1,
                    pageSize:10
                },
            }
        },
        mounted() {
            this.searchList();
        },
        methods:{
            searchList(){
                this.loading = true;
                //封装条件
                this.hospitalSo.pageNum = this.page.pageNum;
                this.hospitalSo.pageSize = this.page.pageSize;
                searchHospital(this.hospitalSo).then(res=>{
                    if(res.code == 0){
                        //日期转化
                        res.data.list.forEach(i=>{
                            let time = new Date(i.createtime);
                            let date = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate();
                            i.date = date;
                        });
                        this.hospitalList = res.data.list;
                        this.page.total = res.data.total;
                    }else{
                        this.$Message.error("请求数据失败")
                    }
                }).finally(res=>{
                    this.loading = false;
                });
            },
            showHospital(hospital){
                let data = {
                    path : '/core/hospital/set',
                    query: hospital
                };
                this.$router.push(data);
            },
            removeHospital(hospital){
                deleteHospital(hospital.id).then(res=>{
                    if(res.code == 0){
                        this.hospitalList = this.hospitalList.filter(i=>{
                            return i.id!=hospital.id;
                        });
                        this.$Message.success(res.message)
                    }else{
                        this.$Message.error(res.message)
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .optionFont{
        font-size: 15px;
        line-height: 30px;
    }
    .page{
        text-align: center;
    }



    .actionLine{
        width: 100%;
        height: 35.19px;
        background-color: rgba(0,255,255,0.1);
        margin-bottom: 2%;
    }
    .actionButton Button{
        margin-left: 1.5%;
    }
</style>