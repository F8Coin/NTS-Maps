class socket {
    constructor(url = 'ws://47.106.76.62:8889', options) { //wss://wss.coinbinary.tw/
        let that = this;
        this.heartBeatTimer = null
        this.options = options
        this.messageMap = {}
        this.connState = 0
        this.socket = null
        this.url = url
        this.lockReconnect = false;
    }
    doOpen() {
        if (this.connState) return
        this.connState = 1
        this.afterOpenEmit = []
        const BrowserWebSocket = window.WebSocket || window.MozWebSocket
        const socket = new BrowserWebSocket(this.url)
        socket.binaryType = 'arraybuffer'
        socket.onopen = evt => this.onOpen(evt)
        socket.onclose = evt => this.onClose(evt)
        socket.onmessage = evt => this.onMessage(evt.data)
        socket.onerror = err => this.onError(err)
        this.socket = socket
    }
    onOpen(evt) {
        this.connState = 2
            //this.heartBeatTimer = setInterval(this.checkHeartbeat.bind(this), 20000)
        this.onReceiver({ Event: 'open' })
    }
    checkOpen() {
        return this.connState === 2
    }
    onClose(e) {
        if (e !== "no") {
            location.reload();
        }
        this.connState = 0;
        if (this.connState) {
            this.onReceiver({ Event: 'close' })
        }
    }
    send(data) {
        this.socket.send(JSON.stringify(data))
    }
    emit(data) {
        return new Promise(resolve => {
            this.socket.send(JSON.stringify(data))
            this.on('message', data => {
                resolve(data)
            })
        })
    }
    onMessage(message) {
        try {
            const data = JSON.parse(message)
            this.onReceiver({ Event: 'message', Data: data })
        } catch (err) {
            console.error(' >> Data parsing error:', err)
        }
    }
    checkHeartbeat() {
        const data = {
            'requestId': '',
            'type': 'ping'
        }
        this.send(data)
    }
    onError(err) {}
    onReceiver(data) {
        const callback = this.messageMap[data.Event]
        if (callback) callback(data.Data)
    }
    on(name, handler) {
        this.messageMap[name] = handler
    }
    doClose() {
        this.socket.close()
    }
    reconnect(url) {
        if (this.lockReconnect) return;
        this.lockReconnect = true;
        let that = this;
        //没连接上会一直重连，设置延迟避免请求过多
        setTimeout(function() {
            that.doOpen();
            console.log("正在重连，当前时间" + new Date())
            that.lockReconnect = false;
        }, 5000); //这里设置重连间隔(ms)
    }


    destroy() {
        if (this.heartBeatTimer) {
            clearInterval(this.heartBeatTimer)
            this.heartBeatTimer = null
        }
        this.doClose()
        this.messageMap = {}
        this.connState = 0
        this.socket = null
    }
}

export default socket