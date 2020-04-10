<template>
	<div class="mui-numbox" data-numbox-min='1' :data-numbox-max='max' data-numbox-step='1'>
		<!-- "-"按钮，点击可减小当前数值 -->
		<button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
		<input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref="numbox"/>
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
				//每当文本的数据被修改的时候，立即把最新的数据传递给父组件
				this.$emit('getCount',parseInt(this.$refs.numbox.value))
			}
		},
		props:["max"],
		watch:{
			//属性监听
			max:function(newVal,oldVal){
				//使用Js API设置numbox的最大值
				mui(".mui-numbox").numbox().setOption('max',newVal)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">

</style>