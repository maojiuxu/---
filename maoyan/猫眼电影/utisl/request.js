// 该文件用来发送请求获取数据
import config from './config.js'
export function request({url, data={}, method='GET'}){
	return new Promise((resolve, reject) => [
		uni.request({
			url: config.host + url,
			data,
			method,
			// header:
			success: res => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err);
			},
			// complete: () => {
				
			// }
		})
	])
}