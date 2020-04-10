<template>
	<div>
		<ul class="mui-table-view">
			<li v-for="item in newslist" :key="item.id" class="mui-table-view-cell mui-media">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<p class="mui-media-body">
						<h1>{{item.title}}</h1>
						<p class='mui-ellipsis'><span>{{item.add_time | dataFornat}}</span><span>点击:{{item.click}}</span></p>
					</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
  import { Toast } from 'mint-ui';//导入mint-ui中的弹窗组件
  export default{
  	  data(){
  	  	return {
  	  		newslist: [] //保存新闻列表的数据
  	  	};
  	  },
  	  created(){
  	  	this.getnewsList();
  	  },
  	  methods: {
  	  	getnewsList(){
  	  		this.$http.get('api/getnewslist').then(result=>{
  	  			if(result.body.status==0){
  	  				Toast('新闻加载完毕');
  	  				this.newslist=result.body.message;
  	  			}else{
  	  				Toast('新闻加载失败');
  	  			}
  	  		}).catch((e)=>{});
  	  	}
  	  }
  }
</script>

<style lang="scss" scopad>
.mui-table-view{
	li{
		h1{
		font-size: 14px;
	}
	.mui-ellipsis{
		font-size: 12px;
		color: #226aff;
		display: flex;
		justify-content: space-between;
	}
	}
	
}
</style>