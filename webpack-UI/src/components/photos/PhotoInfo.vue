<template>
	<div class="photoinfo-container">
		<h3>{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间:{{photoinfo.add_time | dataFornat}}</span>
			<span>点击:{{photoinfo.click}}次</span>
		</p>
		<hr>
		<!--缩略图区域-->
		<div class="Thumbs"> 
			<img class="preview-img" v-for="(item,index) in list" :src="item.src" 
			height="100" @click="$preview.open(index,list)" :hey="item.src" alt="" />
		</div>
			
		<!--图片内容区域-->
		<div class="content" v-html="photoinfo.content"></div>
		<!--放置一个现成的评论组件-->
		<comment-box2 :id="this.id"></comment-box2>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	import comment from '../subcomponents/comment.vue'
	export default {
		data() {
			return {
				id: this.$route.params.id,//从路由中获取的id
				photoinfo: [],//存储图片详情
				list: []//缩略图列表
			}
		},
		created() {
			this.getPhotoInfo();
			this.getThumbs();
		},
		methods: {
			getPhotoInfo() {//获取图片详情
				this.$http.get('api/getimageInfo/' + this.id).then(result => {
					if(result.body.status == 0) {
						this.photoinfo = result.body.message[0];
					} else {

					}
				}).catch((e) => {})
			},
			getThumbs(){
				//获取缩略图
				this.$http.get('api/getthumimages/'+this.id).then(result=>{
					if(result.body.status==0){
						//循环每个图片数据，补全图片的宽和高
						result.body.message.forEach(item=>{
							item.w=600;
							item.h=400;
						})
						//把完整的数据存到list上
						this.list=result.body.message
					}
				}).catch((e)=>{})
			}
		},
		components: {
			'comment-box2': comment
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.photoinfo-container {
		padding: 3px;
		h3 {
			color: #26A2FE;
			font-size: 15px;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		.content {
			font-size: 13px;
			line-height: 30px;
		}
		.Thumbs{
			img{
		       margin: 10px;
		       box-shadow: 0 0 8px #999;
			}
		}
	}
</style>