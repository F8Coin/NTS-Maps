<template>
  <div>
    <div id="Gmaps"></div>
    <remote-js
      jsUrl="https://maps.googleapis.com/maps/api/js?&key=AIzaSyDHsQydosNpZrjm1ikwvwDtIzfSe7JO2X4"
      :js-load-call-back="loadRongJs"
    ></remote-js>
  </div>
</template>
<script>
import RemoteJs from './remote'
export default {
  components: { RemoteJs },
  props: {
    mapData: {
      type: Object,
      required: true
    }
  },
  methods: {
    loadRongJs() {
    //   var requests = []
    //   var service = new google.maps.places.PlacesService(map)
    //   that.mapData.address.map(addr => {
    //     requests.push({
    //       query: addr,
    //       fields: ['name', 'geometry']
    //     })
    //   })
    //   requests.map(request => {
    //     // debugger
    //     service.findPlaceFromQuery(request, function(results, status) {
    //       // console.log(results)
    //       if (status === (google.maps.places.PlacesServiceStatus.OK)) {
    //         for (var i = 0; i < results.length; i++) {
    //           that.createMarker(results[i], map)
    //         }
    //         // map.set(results[0].geometry.location)
    //         // map.setCenter(results[0].geometry.location)
    //       }
    //     })
    //   })
  


      console.log(this.mapData)
      var options = {
        zoom: 5,
        // 1：世界
        // 5：大陆/大陆
        // 10：城市
        // 15：街道
        // 20：建筑物
        center: { lat: this.mapData.latitude, lng: this.mapData.longitude },
        // 动态从调用组件传递经纬度
        disableDefaultUI: false,
        zoomControl: true
      }
      var map = new google.maps.Map(document.getElementById('Gmaps'), options)
      let marker = new google.maps.Marker({
        position: { lat: this.mapData.latitude, lng: this.mapData.longitude },
        map: map,
        title: '新时空智能系统', // 鼠标悬浮显示
        // 此处的icon为标记的自定义图标
        // icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        // animation:  google.maps.Animation.DROP,
        width: '20px',
        height: '20px'
      })
      marker.setMap(map)
		
	 // 配置定位点鼠标点击显示内容 本文是父组件传过来的
      var infowindow = new google.maps.InfoWindow({
        content: this.mapData.address
      })
      marker.addListener('click', function() {
        infowindow.open(map, marker)
      })
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  #Gmaps {
    width: 100%;
    height: 50rem;
    border-radius: 5px;
  }
</style>

