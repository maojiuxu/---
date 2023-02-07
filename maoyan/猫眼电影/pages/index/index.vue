<template>
	<view class="home">
		<Header></Header>
		<OpenToApp></OpenToApp>
		
		<view class="top-nav">
			<view class="nav-position">
				北京 <text class="iconfont icon-xiajiantou"></text>
			</view>
			<view class="nav-title">
				<view class="nav-title-detail" v-for="nav in navTitle" :key="nav.id">{{nav.name}}</view>
				<!-- 用定位 -->
				<!-- <text class="nav-title-active" :class="{nav.isActive ? 'nav-title' : ''}"></text> -->
			</view>
			<view>
				<text class="iconfont icon-sousuo"></text>
			</view>
		</view>
		
		<scroll-view class="movies" scroll-y="true" enable-flex>
			<!-- 好评电影 -->
			<view class="praise">
				<view class="praise-movie-title">
					最受好评电影
				</view>
				<scroll-view class="praise-movie-details" scroll-x enable-flex>
					<scroll-item v-for="hot in sortHotMovie" :key="hot.id">
						<view class="movie-detail-item">
							<view class="movie-item-img"><img :src="hot.img"></view>
							<view>{{hot.nm}}</view>
							<view class="movie-score">观众评分&nbsp;&nbsp;{{hot.sc}}</view>
						</view>
					</scroll-item>
				</scroll-view>
			</view>
			
			<!-- 电影展示 -->
			<view class="show-movies">
				<scroll-view scroll-y enable-flex class="show-movies-scroll">
					<scroll-item v-for="movie in hotMovie" :key="movie">
						<img :src="movie.img">
						<view class="show-movies-details">
							<view class="movie-name">
								<view id="first-name">{{movie.nm}}</view>
								<view class="imax-2d">
									<view id="second-2d">{{movie.ver.split('/')[0].split(' ')[1]}}</view>
									<view id="third-imax">{{movie.ver.split('/')[0].split(' ')[0]}}</view>
								</view>
							</view>
							<view class="movie-actors">
								<view v-if="movie.sc > 0">观众评&nbsp;<text class="movie-actors-score">{{movie.sc}}</text> </view>
								<view v-else>暂无评分</view>
								<view>{{movie.desc}}</view>
								<view>{{movie.showInfo}} </view>
							</view>
						</view>
						<view class="movie-shop">购票</view>
					</scroll-item>
				</scroll-view>
			</view>
		
			<!-- 热门影人 -->
			<view class="hot-actors">
				<view class="hot-actors-title">热门影人</view>
				<scroll-view class="hot-actors-details" scroll-x enable-flex>
					<view class="hot-actors-item" v-for="actor in hotActors" :key="actor.id">
						<!-- 艺人照片 -->
						<image :src="actor.img"></image>
						<view class="hot-actors-name">{{actor.name}}</view>
					</view>
				</scroll-view>
			</view>
			
		
		</scroll-view>
		
	</view>
</template>

<script>
	import Header from '@/components/Header/Header.vue';
	import OpenToApp from '@/components/OpenToApp/OpenToApp.vue';
	// 导入封装的请求
	import { request } from '@/utisl/request.js';
	export default {
		data() {
			return {
				navTitle: [
					{id: 1, name: '热映', isActive: true},
					{id: 2, name: '影院', isActive: false},
					{id: 3, name: '待映', isActive: false},
					{id: 4, name: '经典电影', isActive: false}
				],
				hotMovie: [],   // 电影所有数据
				sortHotMovie: [], // 评分排行数据
				hotActors: [
					{id: 0, name: '梁朝伟', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 1, name: '雷佳音', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 2, name: '郭富城', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 3, name: '岳云鹏', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 4, name: '沙溢', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 5, name: '吴京', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 6, name: '王智', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 7, name: '张译', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 8, name: '王一博', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 9, name: '易烊千玺', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
					{id: 10, name: '梁朝伟', img: 'https://p0.meituan.net/movie/44b896d3c1ef6b03a2cb3662cdb3172b19942.jpg'},
				]
			}
		},
		components: {
			Header,
			OpenToApp
		},
		onLoad() {
			// 此处请求数据
			this.getIndexData();
			this.getIndexRankingData();
		},
		methods: {
			// 封装请求数据函数
			// 1. 请求主页面数据
			async getIndexData(){
				let res = await request({url: '/getIndexData'});
				// console.log('res.data.hot--res.data.hot', res.data.hot);
				this.hotMovie = res.data.hot;
				// this.sortHotMovie = res.data.hot.sort((a, b) => b.sc - a.sc)
			},
			// 2. 请求数据，渲染电影细节
			async getIndexRankingData(){
				let res = await request({url: '/getIndexData'});
				this.sortHotMovie = res.data.hot.sort((a, b) => b.sc - a.sc).slice(0, 12);
			}
		}
	}
</script>

<style lang="less">
	.top-nav {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		border-top: 1rpx solid #999;
		border-bottom: 1rpx solid #999;
		// 定位
		.nav-position {
			line-height: 100rpx;
		}
		// 导航
		.nav-title {
			display: flex;
			justify-content: space-evenly;
			.nav-title-detail {
				margin: 0 20rpx;
				line-height: 100rpx;
				font-weight: 800;
				color: #666;
			}
		}
		// 搜索
		.nav-search {
			color: #e54847;
			width: 32rpx;
			height: 32rpx;
		}
	}
	
	.movies {
		width: 100%;
		// height: calc(100% - 302rpx);
		position: absolute;
		top: 300rpx;
		// 好评电影
		.praise {
			padding: 0 30rpx;
			.praise-movie-title {
				height: 80rpx;
				line-height: 80rpx;
				color: #555;
				font-size: 30rpx;
			}
			.praise-movie-details {
				display: flex;
				height: 300rpx;
				.movie-detail-item {
					width: 160rpx;
					height: 100%;
					margin-right: 20rpx;
					position: relative;
					.movie-item-img {
						// box-shadow: inset 40rpx 40rpx 36rpx rgba(0, 0, 0, 1);
						img {
							width: 160rpx;
							height: 220rpx;
						}
					}
					view {
						width: 160rpx;
						font-weight: 800;
						font-size: 28rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
					}
					.movie-score {
						position: absolute;
						top: 180rpx;
						left: 6rpx;
						color: #d9c636;
						font-weight: 800;
						font-size: 24rpx;
					}
				}
			}
		}
		
		// 电影展示
		.show-movies {
			margin-top: 20rpx;
			padding: 0 30rpx;
			.show-movies-scroll {
				width: 690rpx;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				scroll-item {
					position: relative;
					width: 100%;
					height: 220rpx;
					display: flex;
					flex-wrap: nowrap;
					justify-content: flex-start;
					img {
						width: 120rpx;
						height: 165rpx;
						margin-right: 20rpx;
					}
					// 中间部分
					.show-movies-details {
						.movie-name {
							display: flex;
							
							#first-name {
								font-weight: 800
							}
							.imax-2d {
								height: 28rpx;
								// width: 86rpx;
								border-radius: 6rpx;
								display: flex;
								border: 1rpx solid #1c83c7;
								padding: none;
								margin: 8rpx 10rpx;
								background-color: #fff;
								position: relative;
								#second-2d {
									position: absolute;
									text-align: center;
									width: 30rpx;
									top: -1rpx;
									left: -1rpx;
									padding-right: 10rpx;
									font-size: 16rpx;
									line-height: 28rpx;
									border-radius: 6rpx 0rpx 0rpx 6rpx;
									color: white;
									background-color: #1c83c7;
									padding: 2rpx;
								}
								#third-imax {
									font-size: 16rpx;
									margin-left: 40rpx;
									line-height: 28rpx;
									color: #1c83c7;
									background-color: white;
								}
							}
						}
						.movie-actors {
							color: #666;
							font-size: 28rpx;
							view {
								margin-bottom: 10rpx;
							}
							.movie-actors-score {
								margin-left: 10rpx;
								color: #edd93a;
								font-weight: 800;
							}
						}
					}
					// 购票
					.movie-shop {
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 120rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						background-color: #e54847;
						color: white;
						border-radius: 30rpx;
					}
				}
			}
		}
		
		// 热门影人
		.hot-actors {
			width: 100%;
			padding: 0 30rpx;
			font-size: 28rpx;
			.hot-actors-title {
				margin: 10rpx 0;
			}
			.hot-actors-details {
				display: flex;
				height: 300rpx;
				.hot-actors-item {
					width: 200rpx;
					height: 300rpx;
					margin-right: 20rpx;
					image {
						width: 180rpx;
						height: 220rpx;
					}
					.hot-actors-name {
						font-weight: 800;
						font-size: 28rpx;
					}
				}
			}
		}
	}
	
	
	
	
</style>
