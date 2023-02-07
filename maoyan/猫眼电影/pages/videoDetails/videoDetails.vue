<template>
	<view class="single-video-details">
		<video :src="videoData.video.url"></video>
		<view class="details-info">{{videoData.title}}</view>
		<view class="user-info-details">
			<image :src="videoData.user.avatarurl"></image>
			<text>{{videoData.user.nickName}}</text>
			<!-- <text class="iconfont">图标</text> -->
		</view>
	</view>
</template>

<script>
	import PubSub from 'pubsub-js';
	export default {
		data() {
			return {
				videoData: {}, // 视频详情信息
			};
		},
		created() {
			// 在video页面中的onLoad方法中已经提前订阅，所以在此处能够获取到数据
			// PubSub.subscribe('videoData', (msg, data) => {
			// 	// console.log('msg---------', msg)
			// 	// console.log('data---------', data)
			// 	this.videoData = data
			// 	// this.flag = data;
			// 	console.log(1111111, data)
			// });
		},
		watch: {
			videoData(newValue, oldValue) {
				this.player = uni.createAudioContext()
				this.player.src = newValue.video.url;
				this.player = null;
			}
		},
		// beforeDestroy() {
		// 	PubSub.unsubscribe('videoData')
		// },
		onLoad(props) {
			// 加载页面时利用pubsub订阅接收数据
			// let flag;
			// console.log(PubSub, '=-----');
			
			// this.videoData = flag;
			// console.log('videoDetails', this.videoData);
			// console.log('this',this)
			// // console.log('--------------',props)
			let {videodata} = props
			// console.log('=====',videodata)
			this.videoData = JSON.parse(videodata)
			// console.log('详情页面', this.videoData)
			// PubSub.subscribe('videoData', (msg, data) => {
			// 	// console.log('msg---------', msg)
			// 	// console.log('data---------', data)
			// 	this.videoData = data
			// 	// this.flag = data;
			// 	// console.log(1111111, data)
			// });
		}
	}
</script>

<style lang="less">
	.single-video-details {
		width: 100%;
		video {
			width: 100%;
			height: 450rpx;
		}
		.details-info {
			padding: 0 30rpx;
		}
		.user-info-details {
			height: 60rpx;
			padding: 0 30rpx;
			display: flex;
			justify-content: flex-start;
			image {
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
				line-height: 60rpx;
			}
			text {
				height: 30rpx;
				font-size: 28rpx;
				color: #333;
				line-height: 60rpx;
			}
		}
	}
</style>
