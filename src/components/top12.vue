<template>
	<div class="top">
		<div class="top-title">
			插电混动车型最新销量TOP10
		</div>
		<div class="top-title2">
		  <span class="top-title2-v">
		  	排名
		  </span>
		  <span class="top-title2-v2">
		  	企业名称
		  </span>
		  <span class="top-title2-v2">
		  	车型名称
		  </span>
		  <span class="top-title2-v2">
		  	销量（台）
		  </span>
		</div>
		<div class="top-item">
			<ul>
			  <li v-for="(item,index) in satisfactionData" :key="index">
				<span class="top-title2-v" v-if="index===0"><img src="../assets/one.svg"/></span>
				<span class="top-title2-v" v-else-if="index===1"><img src="../assets/two.svg"/></span>
				<span class="top-title2-v" v-else-if="index===2"><img src="../assets/th.svg"/></span>
				<span class="top-title2-v" v-else>{{ index+1 }}</span>
				<span class="top-title2-v2">{{ item.companyName }}</span>
				<span class="top-title2-v2">{{ item.carName }}</span>
				<span class="top-title2-v2">{{ item.sales }}</span>
			  </li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			satisfactionData:{
				type:Array,
				required:true
			}
		}
	}
</script>

<style>
	.top{
		width: 100%;
		height: auto;
	/*	-webkit-box-shadow: #609696 0px 0px 2px;
	    -moz-box-shadow: #609696 0px 0px 2px;
	    box-shadow: #609696 0px 0px 2px;*/
	    background: #FFFFFF;
		box-shadow: 0 2px 10px 0 rgba(96,150,150,0.18);
	}
	.top-title{
		width: 100%;
		height: 60px;
		background: url(../assets/home_bg_laws.svg);
		text-align: left;
		font-size: 18px;
		color: #FFFFFF;
		line-height: 60px;
		padding-left: 20px;
	}
	.top-title2{
		display: flex;
		height: 40px;
		line-height: 40px;
		color: #CCCCCC;
		font-size: 14px;
	}
	.top-title2-v{
		flex: 1;			
	}
	.top-title2-v2{
		flex: 2;		
	}
	.top-item ul li{
		display: flex;
		list-style: none;
		margin-left: -40px;
		height: 42px;
		line-height: 42px;
		font-size: 14px;
		color: #333333 !important;
		border-top:1px dashed #E2E2E2;
	}
</style>