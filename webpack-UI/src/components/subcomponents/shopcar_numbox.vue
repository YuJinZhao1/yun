<template>
	<div class="mui-numbox" data-numbox-min='1' data-numbox-step='1' style="height: 25px;">
		<!-- "-"按钮，点击可减小当前数值 -->
		<button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
		<input class="mui-numbox-input" type="number" :value="initcount" @change="countChanged" ref="numbox" readonly/>
		<!-- "+"按钮，点击可增大当前数值 -->
		<button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
	</div>
</template>


<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default{
		mounted(){
			mui('.mui-numbox').numbox()
		},
		methods:{
			countChanged(){
				//数量改变,调用更新购物车数据的方法
				this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numbox.value})
			}
		},
		props:['initcount','goodsid']
		
	}
</script>

<style lang="scss" scoped="scoped">

</style>