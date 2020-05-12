<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="addFundDialog.title" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <section class="data_section" ref="data_section"> 
			<a href="javascript:void(0)">
				<el-row :gutter="10" class="row_list">
					<el-col :span="12">
						<div class="row_left row_base">
							<el-col :span="12">
								<div class="pay part1_color data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">已消耗4G流量</p>
										<p class="number">{{ flowInfoData.upData.cardFlow }}<span class="perTitle">({{ $t('index.flow_unit') }})</span></p>
									</div>
									<div class="rightItem">
										<!-- <icon-svg icon-class="iconfukuan" /> -->
										<!-- <i class="fa fa-area-chart icons"></i> -->
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="pay part2_color data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">激活物联网卡数量</p>
										<p class="number">{{ flowInfoData.upData.cardAmount }}</p>
										<!-- <p class="investor">已消耗卫星流量</p>
										<p class="number">720<span class="perTitle">( {{ $t('index.flow_unit') }} )</span></p> -->
									</div>
									<div class="rightItem">
										<!-- <icon-svg icon-class="iconpay3" /> -->
									</div>
								</div>
							</el-col>
						</div>
					</el-col>
					
					<el-col :span="12">
						<div class="row_right row_base">
							
							<el-col :span="12">
								<div class="pay part5_color data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">已消耗卫星流量</p>
										<p class="number"> {{ flowInfoData.upData.satFlow }} <span class="perTitle">({{ $t('index.flow_unit') }})</span></p>

										<!-- <p class="investor">{{ $t('index.home_text5') }}</p> -->
										<!-- <p class="investor">计费设备台数</p>
										<p class="number">6675<span class="perTitle">( {{ $t('index.device_unit') }} )</span></p> -->
									</div>
									<div class="rightItem">
										<!-- <icon-svg icon-class="iconpay" /> -->
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="pay part6_color data_list rflex">
									<div class="leftItem cflex wflex">
										<p class="investor">激活卫星模块数量</p>
										<p class="number">{{ flowInfoData.upData.satAmount }}</p>
										<!-- <p class="investor">{{ $t('index.home_text6') }}</p>
										<p class="number">8373<span class="perTitle">( {{ $t('index.device_unit') }} )</span></p> -->
									</div>
									<div class="rightItem">
										<!-- <icon-svg style="font-size:36px" icon-class="iconfufei0" /> -->
									</div>
								</div>
							</el-col>
						</div>
					</el-col>
				</el-row>
			</a>
			<el-row :gutter="10" class="row_list order_list">
				<el-col :span="24">
					<bar-chart type="barChart" :companyId="companyId"></bar-chart>
				</el-col>
			</el-row>
			<!-- <el-row :gutter="10" class="row_list order_list">
				<el-col :span="7">
				    <pie-chart type="carrierType"></pie-chart>
				</el-col>
				<el-col :span="10">
					<line-chart></line-chart>
				</el-col>
			   	<el-col :span="7">
					<radar-chart></radar-chart>
				</el-col>
			</el-row>  -->
		</section>
    </el-dialog>
    
</template>

<script>
	import { api } from '@/config/api';
    import echarts from 'echarts';
	import barChart from 'cps/echarts/barChartFlow'; // 最近1年流量消耗统计柱形图
	import pieChart from 'cps/echarts/pieChart'; // 承运商用户数量占比
	import radarChart from 'cps/echarts/radarChart'; // 设备管理概况分布
	import lineChart from 'cps/echarts/lineChart'; // 最近7天流量购买订单数统计 
   import { mapState, mapGetters } from 'vuex'
   import { addMoney,updateMoney } from "@/api/money";

  export default {
      name:'addFundDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){
                    let text;
                    if(rule.field == "username"){
                        text='业务负责人';
                    }else if(rule.field == "tel"){
                        text='电话';
                    }else if(rule.field == "email"){
                        text='邮箱';
                    }else if(rule.field == "address"){
                        text='企业地址';
                    }
                    callback(new Error(text+'不能为空'));
                }
            };
          return {
            addFundDialog: {
                title: '流量记录详情'
			},
			flowInfoData: {
				upData: {},
				downData: {}
			},
			isVisible: this.isShow,
			companyId: '',
            form:{
                address:'',
                company: '',
                username: '',
                tel:'',
                email:'',
                remarks: ''
            },
            //详情弹框信息
            dialog: {
                width:'100px',
                formLabelWidth:'120px'
            }
          }
      },
      components: {
        // logList,
        barChart,
        pieChart,
        radarChart,
        lineChart
    },
      props:{
          isShow:Boolean,
          dialogRow:String
      },
      computed:{
        ...mapGetters(['addFundDialog']),

      },
      created(){
		  	this.companyId= this.dialogRow;
			this.getFlowInfoUp({companyId: this.dialogRow});               
      },
      mounted(){

      },
      methods:{
		  showMessage(type,message){
			this.$message({  // Element ui自带信息弹窗
				type: type,
				message: message
			});
		  },

          closeDialog(){
              this.$emit('closeDialog');
          },
		  
		  // 详情上-企业统计
		  async getFlowInfoUp(params){
			  let res = await api.companyFlowInfoDataUp(params);
			  if(res.data.code == 0) {
				//   this.showMessage('success','获取详情上数据成功');
				this.flowInfoData.upData = {
					cardFlow: res.data.data.cardNum ? res.data.data.cardNum : "0.0",
					satFlow: res.data.data.satNum ? res.data.data.satNum : "0.0",
					cardAmount: res.data.data.sumCard ? res.data.data.sumCard : "0",
					satAmount: res.data.data.sumSat ? res.data.data.sumSat : "0"
				}
			  }else {
				  this.showMessage('error',res.msg);
			  }
		  },

      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
    }
    .btnRight{
        float: right;
        margin-right: 0px !important;
    }
    .searchArea{
        background:rgba(255,255,255,1);
        border-radius:2px;
        padding: 18px 18px 0;
    }

    .data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
		    .number{
				font-size: 22px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
	}
</style>
