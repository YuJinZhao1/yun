<template>
	<div>
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in lunbotulist" :key="item.id">
				<img :src="item.img" alt="" :class="{'full':isfull}" />
			</mt-swipe-item>

		</mt-swipe>
	</div>
</template>

<script>
	export default {

		props: ["lunbotulist", "isfull"]

	}
</script>

<style lang="scss" scoped>
	.mint-swipe {
		height: 200px;
		text-align: center;
		img {
			height: 100%;
		}
	}
	
	.mui-content {
		margin-top: -13px;
	}
	
	.mui-grid-view,
	.mui-grid-9 {
		background-color: #fff;
		border: none;
		img {
			width: 60px;
			height: 60px;
		}
		.mui-media-body {
			font-size: 13px;
		}
	}
	
	.full {
		width: 100%;
	}
</style>