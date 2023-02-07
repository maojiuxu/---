let Koa = require('koa');
let router = require('./router');


// 1. 生成应用实例
const app = new Koa();

// 4. 声明使用中间键
app
	.use(router.routes()) // 使用路由
	.use(router.allowedMethods()) // 使用注册路由方法


// 2. 监听端口
app.listen('3001', (err) => {
	if(err){
		console.log(err);
		return;
	}
	
	console.log('服务器启动成功');
	console.log('服务器地址： http://localhost:3001');
});