<template>
    <div>
        <!--操作按钮-->
        <div class="actionLine">
            <div class="actionButton">
                <Button type="primary" icon="md-add" shape="circle" @click="addHospital">保存</Button>
                <Button type="primary" icon="md-close" shape="circle" @click="$router.replace('/core/hospital')">取消</Button>
            </div>
        </div>
        <!--菜单明细-->
        <Row class="tableFont">
            <i-col span="18" offset="2">
                <span><b>医院信息:</b></span>
            </i-col>
        </Row>
        <Row>
            <i-col span="18" offset="3">
                <!--内容区域-->
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <Input v-model="hospital.name">
                            <span slot="prepend">医院名</span>
                        </Input>
                    </i-col>
                    <i-col span="12" >
                        <Input v-model="hospital.phone">
                            <span slot="prepend"  >医院电话</span>
                        </Input>
                    </i-col>
                </Row>
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <Select placeholder="医院类型" v-model="hospital.type">
                            <Option value="0">医院类型:公立</Option>
                            <Option value="1">医院类型:私立</Option>
                        </Select>
                    </i-col>
                    <i-col span="12" >
                        <DatePicker type="date" placeholder="医院开始创建日期" style="width: 100%" v-model="hospital.createtime"></DatePicker>
                    </i-col>
                </Row>
            </i-col>
        </Row>
        <Row class="tableFont">
            <i-col span="18" offset="2">
                <span><b>医院地址:</b></span>
            </i-col>
        </Row>
        <Row>
            <i-col span="18" offset="3">
                <!--内容区域-->
                <Row :gutter = "16" class="tablerow">
                    <i-col span="12">
                        <al-cascader level="2" :placeholder="info" v-model="address" />
                    </i-col>
                    <i-col span="12">
                        <Input v-model="hospital.address">
                            <span slot="prepend">详细地址</span>
                        </Input>
                    </i-col>
                </Row>
            </i-col>
        </Row>
    </div>
</template>

<script>
    import {saveHospital} from '../../../../api/index'
    export default {
        name: "hospital_set",
        mounted(){
            if(this.$route.query!=null){
                this.hospital = this.$route.query;
                //转值
                //时间
                let date = new Date(this.hospital.createtime);
                this.hospital.createtime = date;
                //地区
                this.address.push({
                    "code": this.hospital.provincecode,
                    "name": this.hospital.province
                });

                this.address.push({
                    "code": this.hospital.citycode,
                    "name": this.hospital.city
                });

                this.address.push({
                    "code": this.hospital.areacode,
                    "name": this.hospital.area
                });

                if(this.hospital.province!=null){
                    this.info = this.hospital.province+"/"+this.hospital.city+"/"+this.hospital.area
                }
            }
        },
        data(){
            return{
                hospital:{},
                address:[],
                info: "地区选择"
            }
        },
        methods:{
            addHospital(){
                //分解address
                this.hospital.province = (this.address)[0].name;
                this.hospital.provincecode = (this.address)[0].code;
                this.hospital.city = (this.address)[1].name;
                this.hospital.citycode = (this.address)[1].code;
                this.hospital.area = (this.address)[2].name;
                this.hospital.areacode = (this.address)[2].code;
                saveHospital(this.hospital).then(res=>{
                   if(res.code == 0){
                       this.$Message.success(res.message);
                       this.$router.replace('/core/hospital')
                   } else {
                       this.$Message.error(res.message);
                   }
                });
            },
        },
    }
</script>

<style scoped>
    .actionLine{
        width: 100%;
        height: 35.19px;
        background-color: rgba(0,255,255,0.1);
        margin-bottom: 2%;
    }
    .actionButton Button{
        margin-left: 1.5%;
    }
    .tableFont{
        color: #27A9E3;
        margin-bottom: 0.5%;

    }
    b{
        font-size: 16px;
    }

    .tablerow{
        margin-bottom: 1.5%;
    }
</style>