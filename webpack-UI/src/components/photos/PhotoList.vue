<template>
	<div>
		<!--头部分类-->
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a v-for="(item,index) in cates" :key="item.id" class="mui-control-item mui-active" href="#item1mobile" @click="getPhotoListByCateId(item.id)">
						{{item.title}}
					</a>

				</div>
			</div>
		</div>
		<!--图片区域-->
		<ul class="photo-list">
			<router-link tag="li" v-for="(item,index) in photoslist" :key="item.id" :to="'/home/photoinfo/'+item.id">
				
					<img v-lazy="item.img_url">
					<!--文字介绍-->
					<div class="info">
						<h1 class="info-title">{{item.title}}</h1>
						<div class="info-body">{{item.zhaiyao}}</div>
					</div>
				
			</router-link>
		</ul>
	</div>
</template>

<script>
	//导入mui的js文件
	import mui from '../../lib/mui/js/mui.min.js'

	export default {
		data() {
			return {
				cates: [],
				photoslist: []
			}
		},
		created() {
			this.getAllCategory()
			this.getPhotoListByCateId(0)
		},
		mounted() {
			//当组件中的DOM元素结构被渲染好并放到页面中后，会执行这个钩子函数
			//如果要操作DOM元素最好在methods里面，因为这时候的DOM元素是最新的
			//初始化滑动块
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods: {
			//获取所有的分类
			getAllCategory() {
				this.$http.get('api/getimgcategory').then(result => {
					if(result.body.status == 0) {
						//手动拼接出一个最完整的分类列表
						result.body.message.unshift({
							title: "全部",
							id: "0"
						});
						this.cates = result.body.message
					} else {

					}
				}).catch((e) => {})
			},
			//获取列表图片
			getPhotoListByCateId(careid) {
				//根据分类id获取图文列表
				this.$http.get('api/getimages/' + careid).then(result => {
					if(result.body.status == 0) {
						this.photoslist = result.body.message
					} else {

					}
				}).catch((e) => {})
			}

		}
	}
</script>

<style lang="scss" scoped="scoped">
	* {
		touch-action: pan-y;
	}
	
	.photo-list {
		list-style: none;
		margin: 0;
		padding: 10px;
		li {
			background-color: #ccc;
			text-align: center;
			margin-bottom: 10px;
			box-shadow: 0 0 6px #999;
			position: relative;
			img {
				width: 100%;
				vertical-align: middle;
			}
			image[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}
		}
	}
	
	.info {
		color: white;
		text-align: left;
		position: absolute;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		max-height: 84px;
		.info-title {
			font-size: 14px;
		}
		.info-body {
			font-size: 13px;
		}
	}
</style>