<template>
	<div class="goodsinfo-container">
		
		<transition 
			@before-enter="beforeEnter"
			@enter="enter"
			@after-enter="afterEnter">
			<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>
		<!--商品轮播图区域-->
		<div class="mui-card" :class="false">
			<swiper :lunbotulist="this.lunbotu"></swiper>
		</div>

		<!--商品购买区域-->
		<div class="mui-card">

			<div class="mui-card-header">{{goodsinfo.title}}</div>

			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
					</p>
					<p>购买数量<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>

					</p>
					<p>
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
					</p>
				</div>
			</div>

			<div class="mui-card-footer"></div>
		</div>

		<!--商品参数区域-->
		<div class="mui-card">
			<!--页眉，放置标题-->
			<div class="mui-card-header">商品参数</div>
			<!--内容区-->
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
				  <p>商品货号:{{goodsinfo.goods_no}}</p>
				  <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
				  <p>上架时间:{{goodsinfo.add_time | dataFornat}}</p>
			    </div>
			</div>
			<!--页脚，放置补充信息或支持的操作-->
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click='goDesc(id)'>图文介绍</mt-button>
				<br>
				<mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper from '../subcomponents/swiper.vue'
	import numbox from '../subcomponents/goodsinfo_numbox.vue'
	export default {
		data() {
			return {
				id: this.$route.params.id, //挂载路由对象参数id
				lunbotu: [],//轮播图
				goodsinfo: [],//商品详情
				ballFlag: false,//控制小球隐藏和显示
				selectedCount: 1,//保存用户选中的商品数量
			}
		},
		created() {
			this.getlunbotu()
			this.getgoodsinfo()
		},
		methods: {
			//获取轮播图
			getlunbotu() {
				this.$http.get('api/getthumimages/' + this.id).then(result => {
					if(result.body.status == 0) {
						result.body.message.forEach(item => {
							item.img = item.src
						})
						this.lunbotu = result.body.message
					} else {

					}
				}).catch((e) => {})
			},
			//获取商品详情
			getgoodsinfo(){
				this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
					if(result.body.status==0){
						this.goodsinfo=result.body.message[0]
					}else{
						
					}
				}).catch((e)=>{})
			},
			goDesc(id){
				//点击使用编程式导航跳转到图文介绍页面
				this.$router.push('/home/goodsdesc/'+id)
			},
			getComment(id){
			
				this.$router.push({name:'goodscomment',params:{id}})

			},
			//添加到购物车
			addToShopCar(){
				this.ballFlag =!this.ballFlag;
				//拼接出一个要保存到store中的商品对象
				var goodinfo ={
					id: this.id,//商品id
					count: this.selectedCount,//商品数量
					price: this.goodsinfo.sell_price,//商品单价
					selected: true//商品选中状态
				};
				
				//调用vuex实例store中的mutations来将商品加入购物车
				this.$store.commit("addToCar",goodinfo);
			},
			beforeEnter(el){
				el.style.transform="translate(0,0)";
			},
			enter(el,done){
				el.offsetWidth;
				
				//获取小球在页面中的位置
				const balljFosition = this.$refs.ball.getBoundingClientRect();
				//获取徽标在页面中的位置
				const badgejFosition = document.getElementById("badge").getBoundingClientRect();
				
				const xDist = badgejFosition.left-balljFosition.left;
				const yDist = badgejFosition.top-balljFosition.top;
				
				
				el.style.transform='translate('+xDist+'px,'+yDist+'px)';
				el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
				done();
				
			},
			afterEnter(el){
				this.ballFlag=!this.ballFlag;
					
			},
			getSelectedCount(count){
				//当子组件把选中的数量传递给父组件的时候，把选中的值保存到data上
				this.selectedCount = count;
				console.log("父组件拿到了值"+this.selectedCount)
				
			}
		},
		components: {
			swiper: Swiper,
			numbox
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.goodsinfo-container {
		background-color: #eee;
		overflow: hidden;
		.now_price {
			color: red;
			font-size: 16px;
			font-weight: bold;
		}
		.mui-card-footer{
			display: block;
		}
		.ball{
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background-color: red;
			position: absolute;
			top: 380px;
			left: 135px;
			z-index: 99;
		}
	}
	
</style>