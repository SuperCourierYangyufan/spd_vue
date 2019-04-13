<template>
    <div>
        <div v-if="status==0">

        </div>
        <div v-if="status!=0">

        </div>
    </div>
</template>

<script>
    export default {
        name: "OutboundManagement",
        data(){
            return{
                status :0
            }
        }
    }
</script>

<style scoped>

</style>