<template>
    <el-dialog 
        :visible.sync="isVisible"
        :title="layerTitle" 
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :modal-append-to-body="false"
        @close="closeDialog">
        <div class="form">
            <el-form 
                ref="form" 
                :model="form"
                :rules="form_rules"
                :label-width="dialog.formLabelWidth" 
                style="margin:10px;width:auto;">

                <el-form-item prop='noticeType' label="公告类型:">
                    <!-- <el-input type="text" v-model="form.noticeType" placeholder="请选择公告类型"></el-input> -->
                    <el-select v-model="form.noticeType" placeholder="请选择公告类型" class="dropDown" @change="selectNoticeType(form.noticeType)">
						<el-option
							label="流量预警"
							value="1"
							>
						</el-option>
						<!-- <el-option
							label="类型2"
							value="2"
							>
						</el-option> -->
					</el-select>
                </el-form-item>

                <el-form-item prop='noticePriority'  label="公告优先级:">
                    <!-- <el-input type="text" v-model.number="form.noticePriority" placeholder="请选择公告优先级"></el-input> -->
                    <el-select v-model="form.noticePriority" placeholder="请选择公告优先级" class="dropDown" @change="selectNoticePriority(form.noticePriority)">
						<el-option
							label="优先级1"
							value="3"
							>
						</el-option>
						<!-- <el-option
							label="类型2"
							value="2"
							>
						</el-option> -->
					</el-select>
                </el-form-item>

                <el-form-item prop='noticeTitle' label="公告标题:">
                    <el-input type="text" v-model.number="form.noticeTitle" placeholder="请输入公告的标题"></el-input>
                </el-form-item>

                <el-form-item prop="noticeContent" label="公告内容:">
                    <el-input type="textarea" v-model="form.noticeContent" placeholder="请输入公告的消息内容"></el-input>
                </el-form-item>

                <el-form-item  class="text_right">
                    <el-button @click="isVisible = false">取 消</el-button>
                    <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                </el-form-item>

            </el-form>
        </div>
    </el-dialog>
</template>

<script>
   import { api } from '@/config/api'
   import { getToken } from '@/utils/auth';
   import { mapState, mapGetters } from 'vuex'
   import { addMoney,updateMoney } from "@/api/money";

  export default {
      name:'addFundDialogs',
      data(){
          let validateData = (rule, value, callback) => {
                if(value === ''){ // 判断输入数值不能为空
                    let text;
                    if(rule.field == "noticeType") {
                        text= "企业名称"
                    }
                    else if(rule.field == "noticePriority"){
                        text= '业务负责人';
                    }
                    else if(rule.field == "noticeTitle"){
                        text= '消息标题';
                    }
                    else if(rule.field == "contactEmail"){
                        text= '业务负责人邮箱';
                    }
                    else if(rule.field == "companyAddress"){
                        text= '企业地址';
                    }
                    else if(rule.field == "mainAccount"){
                        text= "企业主账号"
                    }
                    else if(rule.field == "accountName"){
                        text= "新建账号名称"
                    }
                    else if(rule.field == "accountPassword"){
                        text= "新建账户密码"
                    }else if(rule.field == "noticeContent"){
                        text= "公告消息内容"
                    }
                    callback(new Error(text+'不能为空'));
                }else {
                    callback(); // 不能省略
                }
            };
          return {
            isVisible: this.isShow,
            form:{
                noticeType: '',
                noticePriority: '',
                noticeTitle:'',
                noticeContent: '',
                userId: '',
                // contactEmail:'',
                // companyAddress:'',
                // mainAccount: '',
                // accountName: '',
                // accountPassword: '',
                // noticeContent: '',
                // accountTypeId: '1',
                // nickname: 'NTSPOWER',
            },
            layerTitle: '发布公告',
            form_rules: {
                // 校验方式1
                // noticeType   : [
                //     {required: true, message : '企业名称不能为空',trigger : 'blur'}
                // ],
                
                // 校验方式2
                noticeType   : [
                    {required: true, validator:validateData,trigger : 'blur'}
                ],
                noticePriority   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                noticeTitle   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                noticeContent   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                contactEmail   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                companyAddress   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                mainAccount   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                accountName   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
                accountPassword   : [
                    { required: true, validator:validateData,trigger: 'blur'},
                ],
            },
            //详情弹框信息
            dialog: {
                width:'300px',
                formLabelWidth:'120px'
            }
          }
      },
      props:{
          isShow:Boolean,
          dialogRow:Object
      },
      computed:{
        // ...mapGetters(['addFundDialog']),

      },
      created(){
        //    if(this.addFundDialog.type === 'edit'){
        //         this.form = this.dialogRow;
        //         // this.form.incomePayType = (this.dialogRow.incomePayType).toString();
        //         // this.form.pay = -this.dialogRow.pay;
        //         console.log('修改页面弹窗')
        //     }else{
        //         console.log('添加页面弹窗');
        //         // this.$refs['form'].resetFields();
        //         // console.log(this.$refs['form']);
        //     }                
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

            // 公告类型选择
            selectNoticeType(val){
                // console.log(val);
            },

            // 公告优先级选择
            selectNoticePriority(val){
                // console.log(val);
            },

            onScreeoutMoney(){

            },
            closeDialog(){
                this.$emit('closeDialog');
            },

            // 企业管理- 添加企业用户
            async addCompanyAccount(params) {
                let res= await api.addAccount(params)
                if(res.data.code == 0) {
                    this.showMessage('success', res.data.msg);
                }else {
                    this.showMessage('error', res.data.msg);
                }
            },

            //表单提交
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.addNoticeData({
                            content: this.form.noticeContent,
                            title: this.form.noticeTitle,
                            priority: this.form.priority,
                            noticeObjType: this.form.noticeType,
                            userId: getToken("userId")
                        });
                    }else {
                        this.showMessage('error', '必填选项不能为空');
                    }
                })
            },

            // onAddNoticeData(){
            //     this.addNoticeData({
            //         noticeObjType: 1,
            //         priority: 3,
            //         title: "流量预警信息标题",
            //         content: "流量预警信息内容部分",
            //         userId: 1,
            //     });
            // },

            // 发送公告通知消息内容
            async addNoticeData(params) {
                const para = Object.assign({},params);
                let res = await api.addNoticeData(para);
                if(res.data.code == 0) {
                    this.showMessage('success','发布公告通知消息成功');
                    this.$emit("searchList");
                    this.isVisible = false;
                }else {
                    this.showMessage('error',res.data.msg);
                }
            }
        }
    }
</script>

<style lang="less">
    .el-dialog__wrapper {
        .el-dialog {
            width: 35% ;
        }
    }

    .dropDown {
        width: 100%;
    }

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
</style>
