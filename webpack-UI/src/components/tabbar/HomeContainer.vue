<template>
	<div id="">
		<!--轮播图区域-->
		<swiper :lunbotulist="this.lunbotuList" :isfull="true">

		</swiper>

		<!--	九宫格到六宫格的改造工程-->
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<router-link to="/home/newsList">
						<span class="mui-icon mui-icon-home"></span>
						<div class="mui-media-body">新闻资讯</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<router-link to="/home/photolist">
						<span class="mui-icon mui-icon-email"></span>
						<div class="mui-media-body">图片分享</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<router-link to="/home/goodslist">
						<span class="mui-icon mui-icon-chatbubble"></span>
						<div class="mui-media-body">商品购买</div>
					</router-link>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<a href="#">
						<span class="mui-icon mui-icon-location"></span>
						<div class="mui-media-body">留言反馈</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<a href="#">
						<span class="mui-icon mui-icon-search"></span>
						<div class="mui-media-body">视频专区</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
					<a href="#">
						<span class="mui-icon mui-icon-phone"></span>
						<div class="mui-media-body">联系我们</div>
					</a>
				</li>
			</ul>
		</div>

	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import Swiper from '../subcomponents/swiper.vue'
	export default {
		data() {
			return {
				lunbotuList: [] //保存轮播图的数组
			};
		},
		created() {
			this.getLunbotu();
		},
		methods: {
			getLunbotu() { //获取轮播图的数据的方法
				this.$http.get('api/getlunbo').then(result => {
					if(result.body.status == 0) {
						this.lunbotuList = result.body.message;
						Toast('加载轮播图成功')
					} else {
						Toast('加载轮播图失败')
					}
				}).catch((e) => {});
			}
		},
		components: {
			swiper: Swiper
		}
	};
</script>

<style lang="scss" scoped="scoped">

</style>