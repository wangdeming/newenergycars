<template>
	<div class="head">
		<div class="headArea">
			<img src="../assets/logo.svg" />
			<div>
				<a v-for="(item,index) in titles" :key="index" @click="gotoPage(item)" :class="currentPageIndex==index?'btnClicked':''">{{item.name}}</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				titles: [
					{to: 'index', name: '首页'},
					{to: 'industry', name: '产业概况'},
					{to: 'xzsf', name: '宏观总览'},
					{to: 'ssfx', name: '省市分析'},
					{to: 'chain', name: '产业链'},
					{to: 'xgzc', name: '相关政策'},
				],
			};
		},
		props:{
			// 根据页面传的值判断是否需要增加class——'btnClicked'
			currentPageIndex:{
				type:Number,
				required:true
			}
		},
		methods: {
			gotoPage (item) {
				this.$router.push({
					path: '/' + item.to
				});
			},
		}
	}
</script>

<style>
	.head{
		width: 100%;
		height: 70px;
		background: #FFFFFF;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
	}
	.headArea{
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		position: relative;
	}
	.headArea>img{
		display: inline-block;
		width: 235px;
		height: 26px;
		position: absolute;
		left: 0;
		top: 23px;
	}
	.headArea>div{
		height: 20px;
		line-height: 20px;
		position: absolute;
		top: 25px;
		left: 315px;
	}
	.headArea>div>a{
		display: inline-block;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #666666;
		width: 83px;
		text-align: center;
		cursor: pointer;
		position: relative;
	}
	.btnClicked{
		color: #38CAC1 !important;
	}
	.btnClicked::after{
		content: ".";
		color: #38CAC1;
		font-size: 28px;
		position: absolute;
		left: 0px;
		top: -8px;
	}
</style>
