export default class WebsocketClass {
  ws = null;
  url = null;
  callbacks = []; // onmessage回调函数
  timeoutObj = null;
  reconnectTimer = null;
  reconnectWait = 4000; // 断连到重连间隔
  heartbeatTimer = null; // 心跳消息定时器
  heartbeatInterval = 15000; // 心跳消息间隔
  activeClose = false; // 是否主动关闭

  constructor(url) {
    this.url = url;
    this.init();
  }
  init() {
    this.ws = new WebSocket(this.url);
    this.activeClose = false;
    this.ws.onopen = () => {
      console.log(`ws：${this.url}连接成功`);
      this.sendHeartbeat();
    }
    this.ws.onmessage = (event) => {
      this.sendHeartbeat();
      if (event.data !== 'pong' && event.data !== '连接成功') {
        this.callbacks.forEach(fn => {
          fn(event.data);
        })
      }
    }
    this.ws.onclose = () => {
      console.log(`ws：${this.url}连接关闭`);
      !this.activeClose && this.reconnect();
    };
    this.ws.onerror = () => {
      console.error(`ws：${this.url}连接错误`);
      this.reconnect();
    };
  }
  send(msg) {
    if (!this.ws) this.init();
    this.ws.send(msg);
  }
  onmessage(context, fn) {
    this.callbacks.push(fn.bind(context));
  }
  reconnect() {
    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.init();
      this.reconnectTimer = null;
    }, this.reconnectWait);
  }
  sendHeartbeat() {
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = setInterval(() => {
      this.ws.send('ping');
    }, this.heartbeatInterval);
  }
  destroy() {
    this.activeClose = true;
    this.heartbeatTimer && clearInterval(this.heartbeatTimer);
    this.reconnectTimer && clearTimeout(this.reconnectTimer);
    this.ws.close();
    this.ws = null;
  }
}