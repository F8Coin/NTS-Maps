<template>
    <div class="homePage">
        <Header></Header>
        <BMap></BMap>
        <!-- <GMaps id="allmap" class="Gmaps" :map-data="mapData"></GMaps> -->
        <!-- <router-view></router-view> -->
        <!-- <Footer></Footer> -->
    </div>
</template>

<script>
import {api} from '../../config/api'
import BMap from '../../components/baiduMap/BMaps'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import GMaps from '../../components/googleMap/Gmaps'


export default {
    data() {
        return {
            title: "新时空智能系统",
            mapData: {
                longitude: 114.025973657,
                latitude: 22.5460535462
            }
        };
    },
    created(){
        this.getUserInfo();
    },
    components: {
        BMap,
        GMaps,
        Header,
        Footer
    },
    methods: {
        getUserInfo(){
            let userInfo= JSON.parse(localStorage.getItem('userInfo'));
        }
        
    }
}
</script>


<style lang="less">
    .homePage {
        .title {
            color: 'red';
        }
    }
</style>



