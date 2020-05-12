

<template>
  <BaiduMap class="map_page" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" ak="TjCKtYVELEqjFX3sGFnTBBcijkT4MTe3">
  </BaiduMap>
  <!-- <baidu-map class="map_page" :center="center" :enableScrollWheelZoom="enableScrollWheelZoom" :zoom="zoom" ak="TjCKtYVELEqjFX3sGFnTBBcijkT4MTe3">
  </baidu-map> -->
</template>

<script>
//  npm 安装依赖导入百度地图
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
export default {
  components: {
    BaiduMap
  },
  data() {
    return {
        center: {
            lng: "114.025973657",
            lat: "22.5460535462"
        },
        zoom: 8
        
    }
  },
  methods: {
    // handler( {BMap,map}) {
    //   console.log(BMap,map);
    //   this.center.lng= 114.025973657;
    //   this.center.lat= 22.5460535462;
    //   this.zoom= 8
    // }
    
  },
  mounted() {
   
  },
  created() {
    
  }
}
</script>


<style lang="less">
    .map_page {
        width: 100%;
        height: 800px;
    }

</style>

