<template>
	<div class="foot">
		<div class="foot-main">
			<div class="foot-left">
				<div class="header-nav-nav">
	      			<div class="header-nav-nav-item">
				      <router-link to="/index">首页</router-link>
				    </div>
				    <div class="header-nav-nav-item">
				      <router-link to="/industry">产业概况</router-link>
				    </div>
				    <div class="header-nav-nav-item">
				      <router-link to="/xzsf">宏观总览</router-link>
				    </div>
				    <div class="header-nav-nav-item">
				      <router-link to="/ssfx">省市分析</router-link>
				    </div>
				    <div class="header-nav-nav-item">
				      <router-link to="/chain">产业链</router-link>
				    </div>
				    <div class="header-nav-nav-item">
				      <router-link to="/xgzc">相关政策</router-link>
				    </div>
	      		</div>
	      		<div>
	      			<div class="foot-detail">
	      				主办单位：上饶市中科院云计算中心大数据研究院	      			
		      		</div>
		      		<div class="foot-detail">
		      			地址：上饶市信州区广信大道广信大厦A栋3楼
		      		</div>
		      		<div class="foot-detail">
		      			电话：0793-8161215
		      		</div>
		      		<div class="foot-details">
		      			上饶市中科院云计算中心大数据研究院@版权所有，如需转载，请注明来源
		      		</div>
	      		</div>
	      		
			</div>
			<div class="foot-right">
				
				<img src="../assets/QRcode@2x(1).png"/>
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.foot{
		width: 100%;
		height: 242px;
		background: #323232;
		border: 1px solid #979797;
	}
	.foot-main{
		width: 1200px;
		display: flex;
		margin: 0 auto;
	}
	.foot-left{
		flex: 1;
		padding-top: 10px;
	}
	.header-nav-nav{
		float: left;
		width: 350px;
		display: flex;
		line-height: 40px;
		margin-left: 0px !important;
	}
	.header-nav-nav-item{
		flex: 1;
	}
	.header-nav-nav-item a{
		font-size: 12px;
		color: #B3B5BA;
		text-decoration:none
	}
	.foot-right{
		flex: 1;
		float: right;
		margin-top: 66.7px;
		
	}
	.foot-right img{
		width: 110px;
		height: 110px;
		float: right;		
	}
	.foot-detail{
		clear: both;
		font-size: 12px;
		color: #B3B5BA;
		margin-left: 15px !important;
		float: left;
		margin-bottom: 6px;
	}
	.foot-details{
		clear: both;
		font-size: 12px;
		color: #5A606E;
		margin-left: 15px !important;
		float: left;
		margin-top: 8px;
	}
</style>