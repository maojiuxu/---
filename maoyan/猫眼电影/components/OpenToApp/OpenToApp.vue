<template>
	<view class="open-app">
		<img src="../../static/logo.png" class="logo">
		<view class="to-app">
			<view class="find-newmovie">
				发现最热最新电影
			</view>
			<view class="fenge"></view>
			<view class="click-to-app">
				打开App >
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"OpenToApp",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
	.open-app {
		// position: fixed;
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: aqua;
		img {
			width: 188rpx;
			height: 78rpx;
		}
		.to-app {
			line-height: 100rpx;
			font-weight: 800;
			display: flex;
			position: relative;
			.find-newmovie {
				color: #666;
				padding-right: 20rpx;
				font-size: 28rpx;
			}
			.fenge {
				width: 1rpx;
				height: 28rpx;
				border: none;
				background-color: #999;
				position: absolute;
				top: 50%;
				right: 170rpx;
				transform: translateY(-50%);
			}
			.click-to-app {
				color: #b37e7e;
				font-size: 32rpx;
			}
		}
	}
</style>