<template>
	<div class='cmt-container'>
		<h3>发表评论</h3>
		<hr>
		<textarea v-model="msg" placeholder="请输入要bb的内容(最多120个字)" maxlength="120"></textarea>
	    <mt-button type='primary' size='large' @click="postcomment()">发表评论</mt-button>
	       <div class="cmt-list">
	       	   <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_item">
	       	   	 <div class="cmt-title">
	       	   	 	第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time|dataFornat}}
	       	   	 </div>
	       	   	 <div class="cmt-body">
	       	   	 	{{item.content==='undefined'?'此用户很懒，没有评论':item.content}}
	       	   	 </div>
	       	   </div>
	       </div>
	   <mt-button type='danger' size='large' @click="getmore()" plain>加载更多</mt-button>
	
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return{
				msg: '',//评论输入的内容
				pageIndex: 1,//默认展示第一页数据
				comments: []
			}
		},
		
		created(){
			this.getcomments();
		},
		methods:{
			getcomments(){
				this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageIndex).then(result=>{
					if(result.body.status==0){
						//this.comments = result.body.message;
						//将新获取的数据与之前的数据拼接起来
						this.comments=this.comments.concat(result.body.message);
					}else{
						Toast('获取评论失败')
					}
				}).catch((e)=>{})
			},
			getmore(){
				this.pageIndex++;
				this.getcomments()
			},
			postcomment(){
				//检测评论内容是否为空
				if(this.msg.trim().length==0){
				  	Toast('评论内容不能为空')
				}else{
				this.$http.post('api/postcomment/' +this.$route.params.id,{
					content: this.msg.trim()
				}).then(function(result){
					if(result.body.status===0){
						Toast('评论成功');
						//拼接出一个评论对象
					
						  	var cmt ={
							user_name: '匿名用户',
							add_time: Date.now(),
						    content : this.msg.trim()
					}
						  	console.log(cmt)
						this.comments.unshift(cmt);//将提交的评论添加到获取过来的评论数组的前面
				}
				
				});
			}}
		},
		props: ["id"]
	}
</script>

<style lang='scss' scoped="scoped">
	.cmt-container{
		h3{
			font-size: 18px;
		}
		textarea{
			font-size: 14px;
			height: 85px;
			margin: 0;
		}
		.cmt-list{
			margin: 5px 0;
			.cmt-item{
				font-size: 13px;
				.cmt-title{
					line-height: 30px;
					background-color: #ccc;
				}
				.cmt-body{
						line-height: 30px;
						text-indent: 2em;
				}
			}
		}
	}
</style>