<template>
  <div class="search_container searchArea">
        <el-form 
            onSubmit="return false"
            :inline="true" 
            :model='search_data'
            :rules="rules"
            ref="search_data" 
            class="demo-form-inline search-form">
            <el-form-item label="">
                <el-input class="inputText" v-model="search_data.search" placeholder="请输入搜索公告内容关键字"  @keyup.enter.native='onScreeoutNotice("search_data")'></el-input>
            </el-form-item>
            

            <!-- 查询起始时间 -->
            <el-form-item label="">
               <span class="demonstration">开始时间</span>
                <el-date-picker
                v-model="search_data.startDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
               <span class="demonstration">结束时间</span>
                <el-date-picker
                v-model="search_data.overDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item class="btnRight">
                <el-button type="primary" size ="mini" icon="search" @click='onScreeoutNotice("search_data")'>查询</el-button>
                <el-button type="primary" size ="mini" icon="search" @click='onReset'>重置</el-button>
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onBatchDelMoney()' :disabled="searchBtnDisabled">批量删除</el-button> -->
                <!-- <el-button type="success" size ="mini" icon="view">导出Excel</el-button> -->
                <!-- <el-button type="primary" size ="mini" icon="view" @click='onAddMoney()'>添加</el-button> -->
                <el-button type="primary" size ="mini" icon="view" @click='onAddNotice()'>发布公告</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
   import { mapGetters } from 'vuex'

   import * as filter from '@/utils/filter'

  export default {
      name:'searchItem',
      data(){
          return {
            search_data:{
                startDate:'',
                overDate:'',
                search:''
            },
            rules: {
                name: [
                    { required: true, message: '请输入搜索内容', trigger: 'blur' },
                ]
            },
            startDate: '',
            endDate: '',
          }
      },
       computed:{
        // ...mapGetters(['searchBtnDisabled']),

      },
      created(){
      },
      methods:{
          onScreeoutNotice(searchForm){ 
              this.$refs[searchForm].validate((valid) => {
					if (valid) {
                        this.search_data.startDate =  this.search_data.startDate ? filter.DateToStr(this.search_data.startDate) : ""; 
                        this.search_data.overDate = this.search_data.overDate ? filter.DateToStr(this.search_data.overDate) : "";
                        this.$emit("searchList", this.search_data);
                    }else {
                        this.showMessage('error','信息校验失败')
                    }
              })
          },

          onReset() {
            this.search_data= {
                startDate:'',
                overDate:'',
                companyName:''
            },
            this.$emit("searchList",this.search_data);
          },
          onAddNotice(){
              this.$emit("showDialog");
          },
          onBatchDelMoney(){
              this.$emit("onBatchDelMoney");
          }
      }
  }
</script>

<style lang="less" scoped>
    .search_container{
        margin-bottom: 20px;
        .search-form {
            .inputText {
                width: 320px;
            }
        }
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
