<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 40px;"></Header>
		<div class="xgzcxqMainContent">
			<div class="content_header">
				<a href="javascript:window.opener=null;window.open('','_self');window.close();">相关政策</a>
				>
				<span>详情</span>
			</div>
			<div class="content_detail">
				<div class="detail_title">{{detail_title}}</div>
				<div class="detail_time">
					<span>来源：{{addressUrl}}</span>
					<span>发布时间：{{detail_time}}</span>
				</div>
				<div class="line_div"></div>
				<div id="detailText" class="detail_text"></div>
			</div>
		</div>
		<Footer style="margin-top: 42px;"></Footer>
	</div>
</template>

<script>
	import api from '@/api'

	import Footer from './footer.vue'
	import Header from './header.vue'
	export default {
		components: {
				Footer,
				Header,
		},
		mounted() {
						
		},
		data() {
			return {
				currentPageIndex:5,
				uid:this.$route.query.id,
				detail_title:'',
				addressUrl:'',
				detail_time:'',
			};
		},
		created() {
			this.getDetail();
		},
		methods:{
			getDetail() {
				api.get_policyDetail({
					id:this.uid
				}).then(res => {
					var data = res.data;
					this.detail_title = data.title;
					this.addressUrl = data.source;
					this.detail_time = data.releaseTime;
					$("#detailText").append(data.content);
				});
			}
		},
	}
</script>

<style>
	body{
		background: rgb(242,242,242);
	}
	.hidden{
		display: none;
	}
	.xgzcxqMainContent{
		width: 1200px;
		height: auto;
		margin: 0 auto;
	}
	.content_header{
		width: 180px;
		height: 22px;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #666666 !important;
		margin-bottom: 35px;
	}
	.content_header>a{
		color: #666666 !important;
		text-decoration: none;
		cursor: pointer;
	}
	.content_header>span{
		color: rgb(33,189,205);
	}
	.content_detail{
		width: 100%;
		height: auto;
		background: #FFFFFF;
		padding-top: 36px;
	}
	.detail_title{
		width: 100%;
		height: 33px;
		font-family: PingFangSC-Semibold;
		font-size: 24px;
		color: #333333;
		letter-spacing: 1px;
		text-align: center;
	}
	.detail_time{
		margin-top: 10px;
		width: 100%;
		height: 21px;
		ont-family: PingFang-SC-Medium;
		font-size: 15px;
		color: #999999;
		letter-spacing: 0.62px;
		text-align: center;
	}
	.detail_time>span:first-child{
		margin-right: 30px;
	}
	.line_div{
		width: calc(100% - 80px);
		height: 1px;
		margin: 25px 40px 30px;
		background: #CCCCCC;
	}
	.detail_text{
		width: calc(100% - 160px);
		min-height: 40px;
		height: auto;
		text-align: left;
		margin: 0 80px;
		padding-bottom: 30px;
	}
</style>
