<template>
  <div>
      <el-button type="primary" @click="getReadFileData">导入Excel</el-button>
      <input type="file" @change="importf(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>

  </div>
</template>

<script>
export default {
    data() {
      return {
        accountList: []
      }
    },
    created() {
      
    },
    methods: {

      getReadFileData() {
        console.log('获取读取的文件数据'+this.accountList);
      },
      
      importf(obj) {

      

          let _this = this;

      

          let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据

      

          this.file = event.currentTarget.files[0];  



          var rABS = false; // 是否将文件读取为二进制字符串

      

          var f = this.file;

      

          var reader = new FileReader();

      

          //if (!FileReader.prototype.readAsBinaryString) {

      

          FileReader.prototype.readAsBinaryString = function(f) {

      

          var binary = "";

      

          var rABS = false; //是否将文件读取为二进制字符串

      

          var pt = this;

      

          var wb; //读取完成的数据

      

          var outdata;

      

          var reader = new FileReader();

      

          reader.onload = function(e) {

      

              var bytes = new Uint8Array(reader.result);

      

              var length = bytes.byteLength;

      

              for(var i = 0; i < length; i++) {

      

                  binary += String.fromCharCode(bytes[i]);

      

              }

      

              var XLSX = require('xlsx');

      

              if(rABS) {

      

                  wb = XLSX.read(btoa(fixdata(binary)), { //手动转化

      

                        type: 'base64'

      

                  });

      

              } else {

      

                  wb = XLSX.read(binary, {

      

                        type: 'binary'

      

                  });

      

              }

      

              // outdata就是你想要的东西 excel导入的数据

      

              outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); 

      

              // excel 数据再处理

      

              let arr = []

      

              outdata.map(v => {

      

                  let obj = {}

      

                  obj.ID = v.Id

                  

                  obj.Title = v.Title

      

                  obj.Author = v.Author

      

                  obj.Readings = v.Readings

      

                  obj.Date = v.Date

      

                  obj.Image = v.Image


      

                  arr.push(obj)

      

              })

      

              _this.accountList = [...arr];


              console.log( _this.accountList);
              console.log(typeof(_this.accountList));
              console.log('操作读取成功的Excel文件数据:'+ JSON.stringify(_this.accountList));

    
      

              }

      

              reader.readAsArrayBuffer(f);

      

          }

      

          if(rABS) {

      

                reader.readAsArrayBuffer(f);

      

          } else {

      

                reader.readAsBinaryString(f);

      

          }

 

 

 

      }

    }
}

</script>
<style>
</style>