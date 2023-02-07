<template>
	<view class="video-page">
		<OpenToApp></OpenToApp>
		<Header></Header>
		<!-- 导航 -->
		<scroll-view class="video-nav-scroll" scroll-x enable-flex>
			<view class="nav-item" :class="{'active': navId == item.id}" v-for="item in navData" :key="item.id" @click="navId = item.id">{{item.name}}</view>
		</scroll-view>
		
		
		<scroll-view class="video-details-scroll" scroll-y enable-flex>
			<view class="video-details-scroll-item" v-for="video in videoData" :key="video.id">
				<view class="video-source">
					<video :poster="video.video.imgUrl" :src="video.video.url" @click.prevent="turnToVideoDetails(video)" ></video>
					<text class="video-video-title">{{video.title}}</text>
				</view>
				
				<view class="video-userInfo">
					<view class="userinfo-left">
						<image :src="video.user.avatarurl"></image>
						<text>{{video.user.nickName}}</text>
					</view>
					<view class="userinfo-right">
						<!-- 三个图标 -->
						<view class="video-likes">
							<text class="iconfont icon-dianzan"></text><text>20</text>
						</view>
						<view class="video-recommend">
							<text class="iconfont icon-pinglun"></text><text>0</text>
						</view>
						<view class="video-share">
							<text class="iconfont icon-fenxiang"></text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import Header from '@/components/Header/Header.vue';
	import OpenToApp from '@/components/OpenToApp/OpenToApp.vue';
	// 导入封装的请求
	import { request } from '@/utisl/request.js';
	// 导入pubsub
	import PubSub from 'pubsub-js';
	export default {
		data() {
			return {
				videoData: [], // 视频数据
				// paging: {}, // 页面下拉加载数据
				navData: [  // 导航数据
					{id: 0, name: '推荐'},
					{id: 1, name: '热片解读'},
					{id: 2, name: '新片预告'},
					{id: 3, name: '速看电影'},
					{id: 4, name: '剧集综艺'},
					{id: 5, name: '巴拉巴拉'},
				], 
				navId: 0, // 默认为0
			};
		},
		onLoad() {
			this.getVideoData()
			// 先订阅才能获取到数据！！！！！！
			PubSub.subscribe('videoData', null);
		},
		methods: {
			// 获取数据
			async getVideoData(){
				const res = await request({url: '/getVideoData'});
				// console.log('video----', res.data);
				this.videoData = res.data.feeds;
				this.paging = res.data.paging;
			},
			// 跳转页面
			turnToVideoDetails(videoDetails){
				this.player = uni.createInnerAudioContext();
				this.player.src = videoDetails.video.url;
				this.player = null;
				uni.navigateTo({
					// url:'/pages/videoDetails/videoDetails',// 跳转到详情页
					url:'/pages/videoDetails/videoDetails?videodata=' + JSON.stringify(videoDetails),// 跳转到详情页
					success: () => {
						// 跳转成功时利用pubsub-js传递数据
						PubSub.publish('videoData', videoDetails);
						// console.log('videoDetails-------', videoDetails)
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.video-page {
		width: 100%;
		.video-nav-scroll {
			height: 100rpx;
			display: flex;
			flex-wrap: nowrap;
			justify-content: space-between;
			padding: 10rpx 0;
			margin-bottom: 20rpx;
			.nav-item {
				height: 80rpx;
				flex-shrink: 0; // 不缩放
				line-height: 80rpx;
				text-align: center;
				padding: 0 20rpx;
			}
			.active {
				border-bottom: 4rpx solid #e54847;
			}
		}
		
		// 视频
		.video-details-scroll {
			display: flex;
			flex-direction: column;
			width: 100%;
			.video-details-scroll-item {
				margin-bottom: 40rpx;
				width: 100%;
				// 视频信息
				.video-source {
					position: relative;
					height: 460rpx;
					video {
						width: 100%;
						height: 450rpx;
					}
					.video-video-title {
						width: 600rpx;
						position: absolute;
						top: 20rpx;
						left: 30rpx;
						color: white;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
				}
				// 用户信息
				.video-userInfo {
					display: flex;
					justify-content: space-between;
					height: 60rpx;
					// 左部分
					.userinfo-left {
						height: 100%;
						line-height: 60rpx;
						position: relative;
						margin-left: 20rpx;
						image {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
						}
						text {
							position: absolute;
							top: 0%;
							left: 80rpx;
							height: 60rpx;
							line-height: 60rpx;
							white-space: nowrap;
						}
					}
					// 右部分
					.userinfo-right {
						display: flex;
						justify-content: space-between;
						margin-right: 20rpx;
						line-height: 60rpx;
						.video-recommend {
							margin: 0 40rpx;
						}
					}
				}
			}
		}
		
	}
</style>
