<template>
    <div>
        <div class="mars"></div>
        <img src="../assets/images/img404/404.svg" class="logo-404" />
        <img src="../assets/images/img404/meteor.svg" class="meteor" />
        <p class="title">Oh no!!</p>
        <p class="subtitle">
            页面未找到<br />要么请求一个不再在这里的页面。
        </p>
        <div align="center">
            <a class="btn-back" href="#" @click="$router.back()">返回上一页</a>
        </div>
        <img src="../assets/images/img404/astronaut.svg" class="astronaut" />
        <img src="../assets/images/img404/spaceship.svg" class="spaceship" />
    </div>
</template>

<script>
    import  '../common/css/404.css'
    export default {
        name: "404"
    }
</script>

<style scoped>

</style>