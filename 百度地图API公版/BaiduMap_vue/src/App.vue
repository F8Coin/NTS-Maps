<template>
    <div id="app">
        <!-- <Header></Header> -->
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <!-- <HelloWorld msg="NTS管理系统终端"/> -->
        <router-view></router-view>
        <!-- <Footer></Footer> -->
    </div>
</template>

<script>

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default {
   data(){
        return {
            home: 'NTS'
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>

<style>

</style>
