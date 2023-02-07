<template>
	<view class="header">
		<!-- 头部信息栏 -->
		<view class="header-title">
			猫眼电影
		</view>
		<view class="header-icon iconfont icon-caidan" @click="count++" ></view>
		<view class="header-mute" :class="{'showMetu': isClickIcon}">
			<view>首页</view>
			<view>榜单</view>
			<view>热点</view>
			<view>商城</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"Header",
		data() {
			return {
				isClickIcon: false,
				count: 0
			};
		},
		
	}
</script>

<style lang="less">
	.header {
		width: 100%;
		height: 100rpx;
		background-color: #e54847;
		color: white;
		position: relative;
		// position: fixed;
		.header-title {
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 100rpx;
		}
		.header-icon {
			position: absolute;
			width: 33rpx;
			height: 33rpx;
			top: 50%;
			transform: translateY(-50%);
			right: 18rpx;
			color: white;
		}
		.header-mute {
			position: absolute;
			top: 90rpx;
			background-color: #55ff7f;
			right: 20rpx;
			width: 220rpx;
			// display: flex;
			display: none;
			flex-wrap: wrap;
			view {
				width: 100%;
				height: 90rpx;
				text-align: center;
				line-height: 90rpx;
			}
		}
	}
</style>