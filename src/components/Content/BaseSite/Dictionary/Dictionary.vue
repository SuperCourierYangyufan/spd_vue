<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="$router.replace('/core/Dictionary/set') ">添加字典</Button>
                <Button type="primary" icon="ios-cloud-download" shape="circle" @click="exportDictionary" >导出所有字典</Button>
            </div>
        </div>
        <!--筛选-->
        <div>
            <Row  style="text-align: center;margin-bottom: 1%;">
                <i-col span="2" offset="2">
                    <span class="optionFont">所属类别:</span>
                </i-col>
                <i-col span="4"  class="OptionClass" style="height: 35px">
                    <Select  v-model="dictionarySo.category" clearable >
                        <Option v-for="(i,index) in categoryList" :value="i" :key="index">{{i}}</Option>
                    </Select>
                </i-col>
                <i-col offset="1" span="2">
                    <span class="optionFont">字典名:</span>
                </i-col>
                <i-col span="5" >
                    <i-input type="textarea" :autosize="{minRows: 1,maxRows: 1}" v-model="dictionarySo.name">
                    </i-input>
                </i-col>
                <i-col  offset="2" span="6"><Button  type="primary" shape="circle" icon="ios-search" @click="searchList">查询</Button></i-col>
            </Row>
        </div>
        <!--菜单列表-->
        <div>
            <Table  :loading="loading" :columns="title" :data="dictionaryList"  width="1500" style="margin: 0 auto">
                <template slot-scope="{ row, index }" slot="action">
                    <div >
                        <Button type="success" @click="showDictionary(row)">明细</Button>
                        &nbsp;
                        <Button type="error" @click="removeDictionary(row)">删除</Button>
                    </div>
                </template>
            </Table>
        </div>
        <!--分页-->
        <div>
            <Row>
                <i-col offset="8" span="7" style="margin-top: 1%;margin-left: 30%">
                    <Page class="page" :total="page.total"  :current.sync="page.pageNum" show-total @on-change="searchList" />
                </i-col>
            </Row>
        </div>

        <!--删除框-->
        <Modal  v-model="deleteMessage.isshow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>您正在删除数据</span>
            </p>
            <input  v-model="deleteMessage.id" type="hidden"/>
            <div style="text-align:center">
                <p>是否删除该数据,删除后不可找回数据</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="deleteInDictionary">确认删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import ICol from "iview/src/components/grid/col";
    import {searchDictionary,getAllCategory,deleteDictionaryById,exportDictionaryExcel} from '../../../../api/index'
    export default {
        components: {ICol},
        name: "dictionary",
        data(){
            return{
                loading: true,
                title: [
                    {
                        title: '字典名',
                        key: 'name'
                    },
                    {
                        title: '字典值',
                        key: 'value'
                    },
                    {
                        title: '类别',
                        key: 'category'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    },

                ],
                page:{
                    total:1,
                    pageNum:1,
                    pageSize:10
                },
                dictionaryList:[],
                dictionarySo:{},
                categoryList:[],
                deleteMessage:{
                    isshow:false
                }
            }
        },
        mounted(){
            //包装数据
            this.dictionarySo.pageNum = this.page.pageNum;
            this.dictionarySo.pageSize = this.page.pageSize;
            searchDictionary(this.dictionarySo).then(res=>{
                if(res.code == "0"){
                    this.dictionaryList = res.data.list ;
                    this.page.total = res.data.total
                }else{
                    this.$Message.error("请求数据失败")
                }
            }).finally(()=>{
                getAllCategory().then(res=>{
                    if(res.code == "0"){
                        this.categoryList = res.data ;
                    }else{
                        this.$Message.error("请求数据失败")
                    }
                });
                this.loading = false
            });
        },
        methods:{
            searchList(){
                this.loading = true
                //包装数据
                this.dictionarySo.pageNum = this.page.pageNum;
                this.dictionarySo.pageSize = this.page.pageSize;
                searchDictionary(this.dictionarySo).then(res=>{
                    if(res.code == "0"){
                        this.dictionaryList = res.data.list ;
                        this.page.total = res.data.total
                    }else{
                        this.$Message.error("请求数据失败")
                    }
                }).finally(()=>{
                    this.loading = false
                })
            },
            showDictionary(dictionary){
                let data = {
                    path : '/core/Dictionary/set',
                    query: dictionary
                };
                this.$router.push(data);
            },
            removeDictionary(dictionary){
                this.deleteMessage.isshow = true;
                this.deleteMessage.id = dictionary.id;
            },
            deleteInDictionary(){
                this.loading = true;
                this.deleteMessage.isshow = false;
                deleteDictionaryById(this.deleteMessage.id).then(res=>{
                    if(res.code == "0"){
                        this.dictionaryList = this.dictionaryList.filter(i=>{
                            return i.id!=this.deleteMessage.id;
                        });
                        this.page.total--;
                        this.$Message.success("删除成功")
                    }else{
                        this.$Message.error("删除失败")
                    }
                }).finally(()=>{
                    this.loading = false
                })
            },
            exportDictionary(){
                exportDictionaryExcel("字典列表");
            },
        }
    }
</script>

<style scoped>
    /*.optionFont{*/
        /*font-size: 15px;*/
        /*line-height: 30px;*/
    /*}*/
    /*.page{*/
        /*text-align: center;*/
    /*}*/



    /*.actionLine{*/
        /*width: 100%;*/
        /*height: 35.19px;*/
        /*background-color: rgba(0,255,255,0.1);*/
        /*margin-bottom: 2%;*/
    /*}*/
    /*.actionButton Button{*/
        /*margin-left: 1.5%;*/
    /*}*/

</style>