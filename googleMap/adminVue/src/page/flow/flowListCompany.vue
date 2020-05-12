<template>
    <div class="fillcontain">
        <search-item  :placeholderText="placeholderText" @showDialog="showAddFundDialog" @searchList="searchFlowList" @exportData="exportData" @resetList="resetFlowList" @onBatchDelMoney="onBatchDelMoney"></search-item>
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                align='center'
                @select="selectTable"
                @select-all="selectAll"
                >
            <el-table-column
                type="selection"
                align='center'>
            </el-table-column>
            <el-table-column
                prop="sortnum"
                label="序号"
                align='center'
                width="60">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sortnum }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="企业名称"
                align='center'
                width=""
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.companyName }}</span>
                </template>
            </el-table-column>

             <el-table-column
                prop="mainAccount"
                label="主账户"
                align='center'
                width="150"
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.mainAccount }}</span>
                </template>
            </el-table-column>

            <el-table-column
                prop="accountBalance"
                label="账户余额"
                align='center'
                width="150"
                >
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.accountBalance }}</span>
                </template>
            </el-table-column>
            
            <el-table-column
                prop="iotData"
                label="4G消耗数据流量"
                align='center'
                width="100"
                >
                <template slot-scope="scope">  
                    <span style="color:#00d053">{{ scope.row.iotData }} KB</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="satelliteData"
                label="卫星消耗数据流量"
                align='center'
                width="100"
                > 
                <template slot-scope="scope">  
                    <span style="color:#00d053">{{ scope.row.satelliteData }} KB</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="contactPerson"
                label="业务负责人"
                align='center'
                >
                <template slot-scope="scope">  
                    <span style="color:#f56767">{{ (scope.row.contactPerson) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="contactTel"
                label="负责人电话"
                align='center'
                >
                <template slot-scope="scope">  
                    <span style="color:#f56767">{{ (scope.row.contactTel) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="contactEmail"
                label="负责人邮箱"
                align='center'
                width="240"
                >
                <template slot-scope="scope">  
                    <span style="color:#f56767">{{ (scope.row.contactEmail) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="updateTime"
                label="时间"
                align='center'
                width="190"
                >
                <template slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.row.updateTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                align='center'
                label="操作"
                width="200"
                >
                <template slot-scope='scope'>
                    <el-button
                        prop="companyId" 
                        type="warning" 
                        icon='edit' 
                        size="mini"
                        @click='onFlowInfo(scope.row.companyId)'
                    >详情</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="mini"
                        @click='onBuyFlow(scope.row,scope.$index)'
                    >购买流量</el-button>
                </template>
            </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="searchFlowList"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
    </div>
</template>

<script>
    import { api } from '@/config/api'
    import { parseTime } from '@/utils/setMethods'
    import { json2excel } from '@/utils/setMethods' 
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils'
    import * as filter from '@/utils/filter'
    import SearchItem from "./components/searchItem";
    import AddFundDialog from "./components/addFundDialog";
    import Pagination from "@/components/pagination";
    import { getMoneyIncomePay , removeMoney, batchremoveMoney } from "@/api/money";

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:0,
                loading:true,
                idFlag:false,
                isShow:false,
                editid:'',
                rowIds:[],
                sortnum:0,
                contactPerson: '',
                contactTel: '',
                contactEmail: '',
                format_type_list: {
                    0: '提现',
                    1: '提现手续费',
                    2: '提现锁定',
                    3: '理财服务退出',
                    4: '购买宜定盈',
                    5: '充值',
                    6: '优惠券',
                    7: '充值礼券',
                    8: '转账'
                },
                addFundDialog:{  
                    show:false,
                    dialogRow:{}
                },
                flowListData: {
                    pageNum: 1,
                    pageSize: 10,
                    deviceSn: ''
                },
                pageTotal:0,
                // 用于列表筛选
                fields: {
                    incomePayType:{
                        filter: {
                            list: [{
                                text: '提现',
                                value: 0
                            },{
                                text: '提现手续费',
                                value: 1
                            }, {
                                text: '提现锁定',
                                value: 2
                            }, {
                                text: '理财服务退出',
                                value: 3
                            }, {
                                text: '购买宜定盈',
                                value: 4
                            }, {
                                text: '充值',
                                value: 5
                            }, {
                                text: '优惠券',
                                value: 6
                            }, {
                                text: '充值礼券',
                                value: 7
                            }, {
                                text: '转账',
                                value: 8
                            }],
                            multiple: true
                        }
                    },
                },
                exportDataList: [],
                placeholderText: "请输入搜索的企业名称",
                pageData: {
                    pageNum: "1",
                    pageSize: "10"
                }
            }
        },
        components:{
            SearchItem,
            AddFundDialog,
            Pagination
        },
        computed:{
            ...mapGetters(['search'])
        },
        created() {
            this.getCompanyFlowListData(this.pageData);
        },
      	mounted() {
            this.setTableHeight();
            window.onresize = () => {
                this.setTableHeight();
            }
	   },
        methods: {
            showMessage(type,message){
                this.$message({  // Element ui自带信息弹窗
                    type: type,
                    message: message
                });
			},    

            setTableHeight(){
                this.$nextTick(() => {
                   this.tableHeight =  document.body.clientHeight - 300
                })
            },

            // 导出Excel
            handleDownload() {
                // 组装导出的excel所需要的数据结构
                var excelDatas = [
                    {
                        tHeader: ['企业名称','主账户','4G消耗数据流量','卫星消耗数据流量','业务负责人','负责人电话','负责人邮箱','时间'],
                        filterVal: ['companyName','primaryAccount','cardSum','satSum','businessLeader','mobile','mailLeader','createTime'],
                        tableDatas: this.exportDataList,  // 表一的数据字段
                        sheetName: '流量数据报表1'  // 表一的sheet名字
                    }
                ]
                json2excel(excelDatas, "NTS流量数据报表", true, "xlsx")
            },

            // 根据公司名称搜索
            searchFlowList(params){ 
                const para = Object.assign({},this.pageData,params);
                this.getCompanyFlowListData(para);
            },

            // 流量列表-企业统计
            async getCompanyFlowListData(params){
                let res = await api.companyFlowListData(params);
                if(res.data.code == 0) {
                    this.loading= false;
                    this.pageTotal= res.data.total;
                    this.tableData= this.filterTableData(res.data.rows);
                    this.exportDataList= this.filterExportData(res.data.rows);
                }else {
                    this.loading= false;
                    this.showMessage('error',res.data.msg);
                }
            },

            // 重置查询条件
            resetFlowList(params) {
                params= {
                    search_data:{
                        startDate:'',
                        overDate:'',
                        deviceSn:''
                    },
                }
                this.getCompanyFlowListData(this.pageData);    
            },

            // 导出数据
            exportData() {
                this.handleDownload();
            },

            // 显示弹窗
            showAddFundDialog(val){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },

            // 隐藏弹窗
            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },

            // 上下分页
            handleCurrentChange(val){
                this.pageData.pageNum = String(val);
                this.getCompanyFlowListData(this.pageData)
            },

            // 每页显示多少条
            handleSizeChange(val){
                this.pageData.pageSize = String(val);
                this.getCompanyFlowListData(this.pageData)
            },

            getPay(val){
               if(mutils.isInteger(val)){
                   return -val;
               }else{
                   return val;
               }
            },

            formatterType(item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[type];
            },

            filterType(value, item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[value] == this.format_type_list[type];
            },

            // 企业流量详情
            onFlowInfo(companyId){
                this.addFundDialog.dialogRow = companyId;
                this.showAddFundDialog();
            },

            // 删除数据
            onDeleteMoney(row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const para = { id: row.id }
                    removeMoney(para).then(res => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.searchFlowList()
                    })
                })
                .catch(() => {})
            },

            // 查看详情 
            onBuyFlow(){
                // this.addFundDialog.show= true;
                this.showMessage('warning','系统繁忙,请稍后再试!')
            },

            onBatchDelMoney(){
                this.$confirm('确认批量删除记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    const ids = this.rowIds.map(item => item.id).toString()
                    const para = { ids: ids }
                    batchremoveMoney(para).then(res => {
                        this.$message({
                            message: '批量删除成功',
                            type: 'success'
                        })
                        this.searchFlowList()
                    })
                })
                .catch(() => {})
            },

            // 当用户手动勾选数据行的 Checkbox 时触发的事件
            selectTable(val, row){
                this.setSearchBtn(val);
            },

            // 用户全选checkbox时触发该事件
            selectAll(val){
                 val.forEach((item) => {
                     this.rowIds.push(item.id);
                });
                this.setSearchBtn(val);
            },

            setSearchBtn(val){
                let isFlag = true;
                if(val.length > 0){
                    isFlag = false;
                }else{
                    isFlag = true;
                }
                this.$store.commit('SET_SEARCHBTN_DISABLED',isFlag);
            },

            // 格式化列表渲染数据
            filterTableData(arrData){
                let newArrData= [];
                for (let i = 0; i < arrData.length; i++) {
                     newArrData.push({
                        sortnum: (i+1),
                        companyName: arrData[i].companyName ? arrData[i].companyName : '-',
                        mainAccount: arrData[i].primaryAccount ? arrData[i].primaryAccount : '-',
                        accountBalance: arrData[i].accountBalance ? arrData[i].accountBalance : '-',
                        iotData: arrData[i].cardSum ? arrData[i].cardSum : '0.0',
                        satelliteData: arrData[i].satSum ? arrData[i].satSum : '0.0',
                        contactPerson: arrData[i].businessLeader ? arrData[i].businessLeader : '-',
                        contactTel: arrData[i].mobile ? arrData[i].mobile : '-',
                        contactEmail: arrData[i].mailLeader ? arrData[i].mailLeader : '-',
                        updateTime: arrData[i].createTime ? arrData[i].createTime : '-',
                        companyId: arrData[i].companyId ? arrData[i].companyId : '-',
                     })
                    
                }
                return newArrData
            },

            // 格式化导出数据
            filterExportData(arrData){
                let newArrData= [];
                for (let i = 0; i < arrData.length; i++) {
                     newArrData.push({
                        sortnum: (i+1),
                        companyName: arrData[i].companyName ? arrData[i].companyName : '-',
                        primaryAccount: arrData[i].primaryAccount ? arrData[i].primaryAccount : '-',
                        accountBalance: arrData[i].accountBalance ? arrData[i].accountBalance : '-',
                        cardSum: arrData[i].cardSum ? arrData[i].cardSum : '0.0',
                        satSum: arrData[i].satSum ? arrData[i].satSum : '0.0',
                        businessLeader: arrData[i].businessLeader ? arrData[i].businessLeader : '-',
                        mobile: arrData[i].mobile ? arrData[i].mobile : '-',
                        mailLeader: arrData[i].mailLeader ? arrData[i].mailLeader : '-',
                        createTime: arrData[i].createTime ? arrData[i].createTime : '-',
                        companyId: arrData[i].companyId ? arrData[i].companyId : '-',
                     })
                    
                }
                return newArrData
            }
        },
    }
</script>

<style lang="less" scoped>
    .table_container{
        padding: 10px;
        background: #fff;
        border-radius: 2px;
    }
    .el-dialog--small{
       width: 600px !important;
    }
    .pagination{
        text-align: right;
        margin-top: 10px;
    }
     
</style>



