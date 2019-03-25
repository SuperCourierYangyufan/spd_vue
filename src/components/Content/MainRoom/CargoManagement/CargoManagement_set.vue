<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="saveGood">保存</Button>
                <Button type="primary" v-if="current.id ==2" icon="md-close" shape="circle" @click="$router.replace('/core/storeroom/cargoManagement') ">取消</Button>
                <Button type="primary" v-if="current.id ==3" icon="md-close" shape="circle" @click="$router.replace('/core/secondary/cargoManagement') ">取消</Button>
            </div>
        </div>
        <!--明细-->
        <Row class="tableFont">
            <i-col span="18" offset="2">
                <span><b>货物信息:</b></span>
            </i-col>
        </Row>
        <Row>
            <i-col span="18" offset="3">
                <!--内容区域-->
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <Input v-model="goods.name">
                            <span slot="prepend">货物名</span>
                        </Input>
                    </i-col>
                    <i-col span="12">
                        <Input v-model="goods.price">
                            <span slot="prepend">货物价格</span>
                        </Input>
                    </i-col>
                </Row>
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <Input v-model="goods.shelflife">
                            <span slot="prepend">估计保质长度</span>
                        </Input>
                    </i-col>
                    <i-col span="12">
                        <Input v-model="goods.address">
                            <span slot="prepend">出厂地址</span>
                        </Input>
                    </i-col>
                </Row>
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <Select placeholder="货物单位" v-model="goods.typeid">
                            <Option v-for="(i,index) in dictionaryList" :value="i.id">货物单位:{{i.name}}</Option>
                        </Select>
                    </i-col>
                </Row>
            </i-col>
        </Row>
    </div>

</template>

<script>
    import {searchDictionary,saveGood} from '../../../../api/index'
    import {mapState} from 'vuex'
    export default {
        name: "CargoManagement_set",
        computed:{
            ...mapState(['current','loginmodle'])
        },
        data(){
            return{
                goods:{},
                dictionaryList:[]
            }
        },
        methods:{
            saveGood(){
                //整合数据
                this.goods.roleid = this.current.id;
                this.dictionaryList.forEach(i=>{
                   if(i.id == this.goods.typeid){
                       this.goods.typename = i.name;
                   }
                });
                this.goods.uid = this.loginmodle.user.id;
                this.goods.hospitalid = this.loginmodle.user.hospitalid;
                //保存
                saveGood(this.goods).then(res=>{
                   if(res.code == 0){
                       this.$Message.success(res.message);
                       if(this.current.id == 2){
                           this.$router.replace("/core/storeroom/cargoManagement")
                       }else{
                           this.$router.replace("/core/secondary/cargoManagement")
                       }
                   }else{
                       this.$Message.error(res.message)
                   }
                });
            }
        },
        mounted() {
            let dictionarySo = {
                value: 1,
                pageSize: 9999,
                pageNum:1
            };
            searchDictionary(dictionarySo).then(res=>{
                if(res.code == 0){
                    this.dictionaryList = res.data.list;
                }
            });
        }
    }
</script>

<style scoped>

</style>