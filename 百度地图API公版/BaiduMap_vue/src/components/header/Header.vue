<template>
    <div class="header">
        <span class="textTitle">我是头部内容</span>
    </div>
</template>

<script>

export default {
    data(){
        return {
            home: 'NTS'
        }
    }
}
</script>

<style lang="less">

    .header {
        height: 80px;
        // margin-bottom: 30px;
        background-color: green;
        .textTitle {
            color: red;
            text-align: center;
            padding-left: 30px;
        }
    }

</style>