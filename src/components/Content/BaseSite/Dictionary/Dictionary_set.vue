<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="saveDictionary">保存</Button>
                <Button type="primary" icon="md-close" shape="circle" @click="$router.replace('/core/Dictionary')">取消</Button>
            </div>
        </div>
        <!--菜单明细-->
        <Row class="tableFont">
            <i-col span="18" offset="2">
                <span><b>字典信息:</b></span>
            </i-col>
        </Row>
        <Row>
            <i-col span="18" offset="3">
                <!--内容区域-->
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <i-input size="large" v-model="dictionary.name">
                            <span slot="prepend">字典属性名:</span>
                        </i-input>
                    </i-col>
                    <i-col span="12" >
                        <i-input size="large" v-model="dictionary.value">
                            <span slot="prepend">字典属性值:</span>
                        </i-input>
                    </i-col>
                </Row>
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <i-input size="large"v-model="dictionary.category">
                            <span slot="prepend">字典类别:</span>
                        </i-input>
                    </i-col>
                </Row>
            </i-col>
        </Row>

    </div>
</template>

<script>
    import {saveDictionary} from '../../../../api/index'
    export default {
        name: "dictionary_set",
        data(){
            return{
                dictionary:{

                }
            }
        },
        methods:{
            saveDictionary(){
                saveDictionary(this.dictionary).then(res=>{
                    if(res.code == "0"){
                        this.$Message.success(res.message);
                        this.$router.replace("/core/Dictionary")
                    }else{
                        this.$Message.error("保存失败,请重新尝试");
                    }
                });
            }
        },
        mounted(){
            if(this.$route.query!=null){
                this.dictionary = this.$route.query;
            }
        }
    }
</script>

<style scoped>
    /*.actionLine{*/
        /*width: 100%;*/
        /*height: 35.19px;*/
        /*background-color: rgba(0,255,255,0.1);*/
        /*margin-bottom: 2%;*/
    /*}*/
    /*.actionButton Button{*/
        /*margin-left: 1.5%;*/
    /*}*/
    /*.tableFont{*/
        /*color: #27A9E3;*/
        /*margin-bottom: 0.5%;*/

    /*}*/
    /*b{*/
        /*font-size: 16px;*/
    /*}*/

    /*.tablerow{*/
        /*margin-bottom: 1.5%;*/
    /*}*/
</style>