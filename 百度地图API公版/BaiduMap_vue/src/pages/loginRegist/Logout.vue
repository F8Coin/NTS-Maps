
<template>
    <div>
        <el-button type="primary" @click="send('nts123')">发消息</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            path:"ws://47.106.76.62:8889/webSocketServer/123",
            socket:""
        }
    },
    mounted () {
        // 初始化
        // this.init()
    },
    methods: {
        init: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.ws = new WebSocket(this.path)
                // 监听socket连接
                this.ws.onopen = this.open
                // 监听socket错误信息
                this.ws.onerror = this.error
                // 监听socket消息
                this.ws.onmessage = this.getMessage
            }
        },
        open: function () {
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            console.log(msg.data)
        },
        send: function (params) {
            this.ws.send(params)
        },
        close: function () {
            console.log("socket已经关闭")
        }
    },
    destroyed () {
        // 销毁监听
        this.ws.onclose = this.close
    }
}
</script>