<template>
	<div class="goods-list">
		<!--编程式导航-->
		<div class="goods-item" v-for="(item,index) in goodslist" :key="item.index" @click="tz(item.id)">
			<img :src="item.img_url" alt="" />
			<h1 class="title">{{item.title}}</h1>
			<div class="info">
				<p class="price">
					<span class="now">￥{{item.sell_price}}</span>
					<span class="old">￥{{item.market_price}}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>

		<mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui'
	export default {
		data() { //data是往自己组件内部，挂载一些私有数据的
			return {
				pageindex: 1, //分页的页数
				goodslist: [] //存放商品列表的数组
			}
		},
		created() {
			this.getGoodsList()
		},
		methods: {
			getGoodsList() {
				//获取商品列表
				this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
					if(result.body.status == 0) {
						//concat方法会将两个数组拼接起来
						this.goodslist = this.goodslist.concat(result.body.message);
					} else {
						Toast('商品列表获取失败')
					}
				}).catch((e) => {})
			},
			getMore() {
				this.pageindex++;
				this.getGoodsList();
			},
			tz(id) {
				this.$router.push("/home/goodsinfo/" + id);
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 7px;
		justify-content: space-between;
		.goods-item {
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin: 4px 0;
			padding: 2px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			img {
				width: 100%;
			}
			.title {
				font-size: 14px;
			}
			.info {
				background-color: #eee;
				p {
					margin: 0;
					padding: 5px;
				}
				.price {
					.now {
						color: red;
						font-size: 16px;
						font-weight: bold;
					}
					.oold {
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.sell {
					display: flex;
					justify-content: space-between;
					font-size: 12px;
				}
			}
		}
	}
</style>