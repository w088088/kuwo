var express=require("express");
var proxy=require("http-proxy-middleware").createProxyMiddleware;
var cors=require("cors");
var app=express();
app.use(cors());

var options={
    target: 'http://www.kuwo.cn',
    changeOrigin:true
}
options.onProxyReq=(proxyReq)=>{
    proxyReq.setHeader("csrf","S9R6338MZBD");
    proxyReq.setHeader("Cookie","kw_token=S9R6338MZBD");
    proxyReq.setHeader("Referer","http://www.kuwo.cn");
    proxyReq.setHeader("Origin","http://www.kuwo.cn");
    proxyReq.setHeader("Access-Control-Allow-Origin","https://www.kuwo.cn");
}
options.onProxyRes=(proxyRes, req, res)=>{
    proxyRes.headers["Access-Control-Allow-Origin"] = "*"
}

app.use("/music/src",proxy({
    target:"https://appi.kuwo.cn/api/wechat/v2",
    changeOrigin:true
}))

app.use("/mobile",proxy({
    target:"http://m.kuwo.cn/newh5app/api",
    changeOrigin:true
}))
app.use(proxy(options));
app.listen(9090);
console.log("服务已启动 http://localhost:9090")