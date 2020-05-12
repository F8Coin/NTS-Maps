<template>
    <div class="fillcontain">
        <search-item @showDialog="showAddFundDialog" @searchList="getUserListData" @onDeleteAccount="onDeleteAccount"></search-item>
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
                    prop="companyIndex"
                    label="企业编号"
                    align='center'
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="companyName"
                    label="企业名称"
                    width="210"
                    align='center'>
                </el-table-column>
                <el-table-column
                    prop="mainAccount"
                    label="企业主账户"
                    align='center'
                    width="120">
                </el-table-column>
                 <el-table-column
                    prop="accountType"
                    label="账号类型"
                    align='center'
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="accountBalance"
                    label="账户余额(RMB)"
                    align='center'>
                </el-table-column>
                <el-table-column
                    prop="contactPerson"
                    label="业务负责人"
                    align='center'
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="contactTel"
                    label="负责人电话"
                    align='center'
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="contactEmail"
                    label="负责人邮箱"
                    align='center'
                    width="210"> 
                </el-table-column>
                <el-table-column
                    prop="companyAddress"
                    label="企业地址"
                    align='center'
                    width="200"
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="创建时间"
                    align='center'
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    align='center'
                    label="操作"
                    width="180">
                    <template slot-scope='scope'>
                        <el-button
                            prop="companyId" 
                            type="warning" 
                            icon='edit' 
                            size="mini"
                            @click='onEditAccount(scope.row)'
                        >编辑</el-button>
                        <el-button
                            prop= "companyId" 
                            type="danger" 
                            icon='delete' 
                            size="mini"
                            @click='onDeleteAccount(scope.row.companyId)'
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
            <addFundDialog  v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"  @getFundList="getUserListData"  @closeDialog="hideAddFundDialog"  @getUserList="getUserListData"></addFundDialog>
            <editFundDialog  v-if="editFundDialog.show" :isEditShow="editFundDialog.show" :dialogRow="editFundDialog.dialogRow"  @getFundList="getUserListData"  @closeDialog="hideEditFundDialog"  @getUserList="getUserListData"></editFundDialog>
        </div>
    </div>
</template>

<script>
    import { api } from "@/config/api"
    import { mapGetters } from "vuex";
    import * as mutils from '@/utils/mUtils'
    import SearchItem from "./components/searchItem";
    import AddFundDialog from "./components/addFundDialog";
    import editFundDialog from "./components/editFundDialog";
    import Pagination from "@/components/pagination";
    import { getMoneyIncomePay ,getUserListAccount, removeMoney, batchremoveMoney } from "@/api/money";
import * as filter from '@/utils/filter';

    export default {
        data(){
            return {
                tableData: [],
                tableHeight:0,
                loading:true,
                isShow:false,
                isEditShow: false,
                editid:'',
                rowIds:[],
                sortnum:0,
                addFundDialog:{  
                    show:false,
                    dialogRow:{}
                },
                editFundDialog:{  
                    show:false,
                    dialogRow:{}
                },
                incomePayData:{
                    page:1,
                    limit:10,
                    name:''
                },
                pageTotal:0,
                // 用于列表筛选
                fields: {
                },
                pageData: {
                    pageNum: 1,
                    pageSize: 10,
                },
                filterAccountType: {
                    1: "管理端",
                    2: "用户端"
                }
               
            }
        },
        components:{
            SearchItem,
            AddFundDialog,
            editFundDialog,
            Pagination
        },
        computed:{
            ...mapGetters(['search'])
        },
        created() {
        //    this.getAccountTypeList(); 账号类型

        //    this.getCompanyBalance();  账号余额

           this.getUserListData(this.pageData);  // 账号列表
        },
      	mounted() {
            this.setTableHeight();
            window.onresize = () => {
                this.setTableHeight();
            }
	   },
        methods: {

            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
			},

            setTableHeight(){
                this.$nextTick(() => {
                   this.tableHeight =  document.body.clientHeight - 300
                })
             },

            // 企业管理- 账户类别列表
            async getAccountTypeList() {
                let res= await api.accountTypeList();
                if(res.data.code == 0) {
                    if(res.data.data && res.data.data.length>0){
                        console.log(res.data.data);
                    }else {
                        this.showMessage('success',res.data.msg);
                    }
                }else {
                    this.showMessage('error',res.data.msg);
                }
            },

            // 账户余额- 企业账户余额
            async getCompanyBalance() {
                let res= await api.companyAccountBalance()
                if(res.data.code == 0) {
                    // this.showMessage('success', res.data.msg);
                }else {
                    this.showMessage('error', res.data.msg)
                }
            },

            // 显示添加信息框
            showAddFundDialog(){
                // this.$store.commit('SET_DIALOG_TITLE', val)
                this.addFundDialog.show = true;
            },

            //  显示编辑信息框
            showEditFundDialog(){
                this.editFundDialog.show = true;

            },

            hideAddFundDialog(){
                this.addFundDialog.show = false;
            },

            hideEditFundDialog(){
                this.editFundDialog.show = false;
            },

            // 上下分页
            handleCurrentChange(val){
                this.pageData.pageNum = val;
                this.getUserListData(this.pageData)
            },

            // 每页显示多少条
            handleSizeChange(val){
                this.pageData.pageSize = val;
                this.getUserListData(this.pageData)
            },

            // 编辑操作方法
            onEditAccount(row){
                this.editFundDialog.dialogRow = row;
                this.showEditFundDialog();
            },

            // 删除账户
            onDeleteAccount(row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    this.deleteAccountFun({companyIds: String(row)});
                })
                .catch(() => {})
            },

            async deleteAccountFun(params){
                let res = await api.deleteAccountData(params)
                if(res.data.code == 0) {
                    this.showMessage('success','删除成功');
                    this.getUserListData(this.pageData);
                }else {
                    this.showMessage('error',res.data.msg);
                }
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
            // 获取企业用户列表
            async getUserListData(params){
                let res = await api.companyAccountList(params);
                if(res.data.code == "0"){
                    // this.showMessage('success', '获取用户企业列表');
                    this.loading = false;
                    this.pageTotal = res.data.total;
                    this.tableData= this.filterTableData(res.data.rows)
                }else {
                    this.showMessage('error',res.data.msg);
                }
            },

            filterTableData(arrayData){
                let newArrayData= [];
                for (let i = 0; i < arrayData.length; i++) {
                     newArrayData[i] = {
                        companyIndex: (i+1),
                        companyName: arrayData[i].companyName,
                        mainAccount: arrayData[i].primaryAccount ? arrayData[i].primaryAccount : '-',
                        accountBalance: arrayData[i].balance ? arrayData[i].balance : '-',
                        contactPerson: arrayData[i].businessLeader ? arrayData[i].businessLeader : '-',
                        contactTel: arrayData[i].mobile ? arrayData[i].mobile : '-',
                        contactEmail: arrayData[i].mailLeader ? arrayData[i].mailLeader : '-',
                        companyAddress: arrayData[i].address ? arrayData[i].address : '-',
                        createTime:  arrayData[i].createTime ? arrayData[i].createTime : '-',
                        companyId: arrayData[i].companyId ? arrayData[i].companyId : '-',
                        accountName: arrayData[i].userName ? arrayData[i].userName : '-',
                        accountType: arrayData[i].isAdmin ? this.filterAccountType[arrayData[i].isAdmin] : "-"
                     };
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


