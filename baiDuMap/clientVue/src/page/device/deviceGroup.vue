<template>
  <section class="data_section" ref="data_section">
    <baidu-map  id="baiDuMap" class="map_page" :center="center" :zoom="zoom" @ready="handler">
			<!-- <div v-for="(item,i) of pointsData" :key="i">
				<bm-marker :position="{lng: item.gpsLongitude, lat: item.gpsLatitude}" @click="infoWindowOpen">
					<bm-info-window :position="{lng: item.gpsLongitude, lat: item.gpsLatitude}" title="信息详情" :show="infoWindow.show" @close="infoWindowClose">
						<div class="contentInfo">
							<p>
								<span class="title">设备SN:</span>
								<span class="content" v-text="item.deviceSn"></span>
							</p>
							<p>
								<span class="title">电池电压:</span>
								<span class="content" v-text="item.batteryVoltage"></span>
							</p>
							<p>
								<span class="title">移动网络码CID:</span>
								<span class="content" v-text="item.cid"></span>
							</p>
							<p>
								<span class="title">设备内部温度(摄氏):</span>
								<span class="content" v-text="item.deviceTemp"></span>
							</p>
							<p>
								<span class="title">是否外部电源:</span>
								<span class="content" v-text="item.extPower === 'true' ? '是' :'否'"></span>
							</p>
							<p>
								<span class="title">GPS上次锁定:</span>
								<span class="content" v-text="item.gpsLastLock"></span>
							</p>
							<p>
								<span class="title">GPS锁定状态:</span>
								<span class="content" v-text="item.gpsLockState"></span>
							</p>
							<p>
								<span class="title">GPS卫星数:</span>
								<span class="content" v-text="item.gpsSatelliteCount"></span>
							</p>
							<p>
								<span class="title">蜂窝网信号强度:</span>
								<span class="content" v-text="item.rssi"></span>
							</p>
							<p>
								<span class="title">时间:</span>
								<span class="content" v-text="item.createTime"></span>
							</p>
						</div>
					</bm-info-window>
				</bm-marker>
			</div> -->
    </baidu-map>
  </section>
</template>



<script>
import { api } from "@/config/api";
import * as filter from "@/utils/filter";
// 按需引入点聚合
import { BmlMarkerClusterer } from 'vue-baidu-map';
// 引入marker
import BmMarker from 'vue-baidu-map/components/overlays/Marker'

export default {
  data() {
    return {
    //   center: "中国",
      center: {
        lng: 114.025973657,
        lat: 22.5460535462
      },
      zoom: 3,
	  pointsData: [],
      infoWindow: {
        show: false,
        contents: "我爱北京天安门"
      }
    };
  },
  components: {},
  created() {
    // this.addPoints();
  },
  mounted() {},
  methods: {
    // 异步处理加载地图
    handler({ BMap, map }) {
      // console.log(BMap, map)
      // this.center.lng = 116.404
      // this.center.lat = 39.915
      // this.zoom = 10

      // 1.0 地图背景风格
      map.setMapStyle({
        style: "grassgreen"
      });

      // 2.0 添加控件
      map.addControl(
        new BMap.MapTypeControl({
          mapTypes: [
            //右上角地图按钮
            BMAP_NORMAL_MAP,
            //右上角卫星按钮
            BMAP_HYBRID_MAP
          ]
        })
      );

      // 3.0 鼠标缩放
      map.enableScrollWheelZoom(true);

      // 4.0 左上角添加比例尺控件
      var top_left_control = new BMap.ScaleControl({
        anchor: BMAP_ANCHOR_TOP_LEFT
      });
      var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件

      var top_right_navigation = new BMap.NavigationControl({
        //右上角，仅包含平移和缩放按钮
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_SMALL
        /*缩放控件type有四种类型:
						BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；
						BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；
						BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮
					*/
      });
      map.addControl(top_left_control); // 添加上述控件和比例尺
      map.addControl(top_left_navigation);
      // map.addControl(top_right_navigation);
    },

    // 添加标记
    async addPoints() {
      let res = await api.queryAllDevPosition();
      if (res.data.code == "0") {
        if (res.data.data && res.data.data.length > 0) {
          this.pointsData = res.data.data;
        } else {
          this.showMessage("warning", "暂无数据");
        }
      } else {
        this.showMessage("error", res.data.msg);
      }
    },

    infoWindowClose(e) {
      this.infoWindow.show = false;
	},

	infoWindowOpen(e) {
		this.infoWindow.show = true;
	},

    // 过滤经纬度
    filterPointArr(arrData) {
      let newArrData = [];
      for (let i = 0; i < arrData.length; i++) {
        newArrData[i] = {
          lng: Number(arrData[i].gpsLongitude),
          lat: Number(arrData[i].gpsLatitude)
        };
      }
      return newArrData;
    }
  }
};
</script>

<style lang="less" scoped>
.data_section {
	height: 100%;
	overflow: hidden;
	position: relative;
	.map_page {
		width: 100%;
		height: 100%;
	}	
}
</style>
