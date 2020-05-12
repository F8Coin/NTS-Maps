<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="getNoticeListData" @onBatchDelMoney="onBatchDelMoney"></search-item>
        <div class="table_container">
            <el-table
                v-loading="loading"
                :data="tableData"
                style="width: 100%"
                align='center'
                @select="selectTable"
                @select-all="selectAll"
                border
                stripe
                header-cell-class-name="table-header-class">
                <el-table-column
                    type="selection"
                    align='center'
                    width="40">
                </el-table-column>
                <el-table-column
                    prop="sortnum"
                    label="序号"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="noticeType"
                    label="消息类型"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="priority"
                    label="消息优先级"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="noticeTitle"
                    label="消息标题"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="noticeContent"
                    label="消息内容"
                    align='center'
                    >
                </el-table-column>
                 <el-table-column
                    prop="publicState"
                    label="发布状态"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="publicTime"
                    label="发布时间"
                    align='center'
                    >
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    width="180">
                    <template slot-scope='scope'>
                        <el-button 
                            prop="noticeId"
                            type="warning" 
                            icon='edit' 
                            size="mini"
                            @click='onCancelNotice(scope.row.noticeId)'
                        >取消发布</el-button>
                        <el-button
                            prop="noticeId" 
                            type="danger" 
                            icon='delete' 
                            size="mini"
                            @click='onDeleteNotice(scope.row.noticeId)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow" @searchList="getNoticeListData"  @closeDialog="hideAddFundDialog"></addFundDialog>
        </div>
    </div>
</template>

<script>
    import { api } from "@/config/api"
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils'
    import SearchItem from "./components/searchItem";
    import AddFundDialog from "./components/addFundDialog";
    import Pagination from "@/components/pagination";
    import { getMoneyIncomePay ,getUserListAccount, removeMoney, batchremoveMoney } from "@/api/money";

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:0,
                loading:false,
                isShow:false,
                editid:'',
                rowIds:[],
                sortnum:0,
                addFundDialog:{  
                    show:false,
                    dialogRow:{}
                },
                incomePayData:{
                    page:1,
                    limit:12,
                    name:''
                },
                pageTotal:0,
                // 用于列表筛选
                fields: {
                },

                pageData: {
                    pageNum: 1,
                    pageSize: 10
                },

                noticeType: {
                    1: "流量预警",
                    2: "流量套餐",
                    3: "停机维护"
                },

                noticeState: {
                    0: "已发布",
                    1: "已取消"
                },

                priorityType: {
                    0: "测试",
                    1: "优先级1",
                    2: "优先级2",
                    3: "优先级3"
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
            this.getNoticeListData(this.pageData);
        },
      	mounted() {
            // this.setTableHeight();
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

            // 获取公告信息列表
            async getNoticeListData(params){
                const para = Object.assign({},this.pageData,params);
                let res= await api.noticeDataList(para);
                if(res.data.code == 0) {
                    this.loading = false;
                    // this.showMessage('success',res.data.msg);
                    this.tableData = this.filterTableData(res.data.rows);
                }else {
                    this.loading = false;
                    this.showMessage('error',res.data.msg);
                }
            },

            // 显示添加信息框
            showAddFundDialog(){
                this.addFundDialog.show = true;
            },

            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },

            // 上下分页
            handleCurrentChange(val){
                this.pageData.pageNum = val;
                this.getNoticeListData(this.pageData);
            },

            // 每页显示多少条
            handleSizeChange(val){
                this.pageData.pageSize = val;
                this.getNoticeListData(this.pageData);
            },

            // 取消公告发布
            onCancelNotice(row){
                this.$confirm('确认取消发布该消息么?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    this.onCancelNoticeFun({noticeId: row})
                })
                .catch(() => {})
            },

            async onCancelNoticeFun(params){
                let res= await api.cancelNoticeMessage(params);
                if(res.data.code == 0) {
                    this.showMessage('success','操作成功');
                    this.getNoticeListData(this.pageData);
                }else {
                    this.showMessage('error',res.data.msg);
                }
            },
            
            
            // 删除已发布公告
            onDeleteNotice(row){
                this.$confirm('确认删除该消息吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                   this.onDeleteNoticeFun({noticeId: row})
                })
                .catch(() => {})
            },

            async onDeleteNoticeFun(params){
                let res= await api.deleteNoticeMessage(params);
                if(res.data.code == 0) {
                    this.showMessage('success','操作成功');
                    this.getNoticeListData(this.pageData);
                }else {
                    this.showMessage('error',res.data.msg);
                }
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
                        this.getNoticeListData()
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

            /**
            * 格式化状态
            */
            formatterType(item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[type];
            },
            filterType(value, item) {
                const type = parseInt(item.incomePayType);
                return this.format_type_list[value] == this.format_type_list[type];
            },

             filterTableData(arrayData){
                let newArrayData = [];
                for (let i = 0; i < arrayData.length; i++) {
                    newArrayData[i] = {
                        sortnum: (i+1) ,
                        noticeType: arrayData[i].noticeObjType ? this.noticeType[arrayData[i].noticeObjType] : '-' ,
                        priority: arrayData[i].priority || arrayData[i].priority==0  ? this.priorityType[arrayData[i].priority] : '-' ,
                        noticeTitle: arrayData[i].title ? arrayData[i].title : '-' ,
                        noticeContent: arrayData[i].content ? arrayData[i].content : '-' ,
                        publicTime: arrayData[i].releaseTime ? arrayData[i].releaseTime : '-' ,
                        noticeId: arrayData[i].noticeId ? arrayData[i].noticeId : '-',
                        publicState: arrayData[i].isUndo || arrayData[i].isUndo==0 ? this.noticeState[arrayData[i].isUndo] : '-',
                    }
                    
                }
                return newArrayData;
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


