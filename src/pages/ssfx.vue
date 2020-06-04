<template>
	<div>
		<!-- 添加当前页面的index值 -->
		<Header v-bind:currentPageIndex="currentPageIndex"></Header>
		<div class="ssfx_mainContent">
			<img src="../assets/pic.png"/>
			<span>oops~网站建设中！</span>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	import api from '@/api'
	import Footer from './footer.vue'
	import Header from './header.vue'
	export default {
		components: {
			Footer,
			Header
		},
		data() {
			return {
				currentPageIndex:3,
			};
		}
	}
</script>

<style>
	body{
		background: rgb(242,242,242);
	}
	.ssfx_mainContent{
		width: 1200px;
		height: 800px;
		margin: 0 auto;
		position: relative;
	}
	.ssfx_mainContent>img{
		display: inline-block;
		width: 200px;
		height: 258px;
		position: absolute;
		top: 160px;
		left: calc(50% - 100px);
	}
	.ssfx_mainContent>span{
		display: inline-block;
		width: 200px;
		height: 25px;
		line-height: 25px;
		font-family: PingFang-SC-Medium;
		font-size: 18px;
		color: #999999;
		letter-spacing: 0.75px;
		position: absolute;
		top: 430px;
		left: calc(50% - 100px);
		text-align: center;
	}
</style>
