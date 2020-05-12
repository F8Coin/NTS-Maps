<template>
    <div class="fillcontain">
        <!-- <vue-googlemap :center='center' :zoom="zoom" >
			<vue-googlemap-marker ref='marker' :position='center'>
				<vue-googlemap-infoWindow 
					:position='center'
					:content='infoWindow.contents'
					:show= "infoWindow.show"
				>
				</vue-googlemap-infoWindow>
			</vue-googlemap-marker>
        </vue-googlemap> -->


		<div id="mapPage"></div>
    </div>
</template>

<script>
    export default {
        data(){
          return {
				// center: [22.5460535462, 114.025973657],
				// zoom: 5,
				// // 1：世界
				// // 5：大陆/大陆
				// // 10：城市
				// // 15：街道
				// // 20：建筑物
				// infoWindow: {
				// 	show: true,
				// 	contents: "This is a infoWindow"
				// },
				// infoWindowOpen: {
				// 	closeclick() {
				// 		console.log('click!')
				// 	}
				// }
            
				center: {lng: 114.025973657, lat: 22.5460535462},            
            }
        },
        components: {

		},

		created(){
			
		},
		mounted(){
			this.mapBuild() // 初始化实例后调用
		},
		methods: {

			mapBuild(){

				let map = new google.maps.Map(document.getElementById('mapPage'), {

					zoom: 5,

					center: this.center,

					// mapTypeId: google.maps.MapTypeId.ROADMAP

				});

				var marker = new google.maps.Marker({
					position: {lat: 22.5460535462, lng: 114.025973657},
          			map: map
				})

				var infowindow = new google.maps.InfoWindow({
					content: '<p>Marker Location:' + marker.getPosition() + '</p>'
				});

				google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker);
				});
			},

		}
    }
</script>

<style lang="less" scoped>
   .fillcontain {
       padding: 0px;
       width: 100%;
	   height: 100%;
	   #mapPage {
		   width: 100%;
		   height: 100%;
	   }
   }
</style>






