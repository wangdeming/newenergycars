<template>
	<div class="policyItem">
		<div class="policyItem-left">
			<div class="policyItem-left-img">
				<img v-bind:src="typeof(policybriefData[0])=='undefined'?'':policybriefData[0].picture"/>
				 <div class="inbox">
						{{ typeof(policybriefData[0])=='undefined'?'':policybriefData[0].title }}
				 </div>
			</div>
			<div class="policyItem-left-img">
				<img v-bind:src="typeof(policybriefData[1])=='undefined'?'':policybriefData[1].picture"/>
				 <div class="inbox">
						{{ typeof(policybriefData[1])=='undefined'?'':policybriefData[1].title }}
				 </div>
			</div>
		</div>
		<div class="policyItem-right">
			<ul>
				<li v-for="(item,index) in policybriefData" :key="index" @click="jumpToXGZCXQ(item.id)" v-show="index!=0 && index!=1">
					<!--<img v-bind:src="item.picture"/>-->
					<div class="policyItem-right-title">{{ item.title }}</div>
					<div class="policyItem-right-time">{{ item.releaseTime }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
		   policybriefData:{
		     	type:Array,
				required:true
		   }
		},
		methods:{
			jumpToXGZCXQ(itemId) {
					let routeData = this.$router.resolve({ name: 'xgzcxq', query: {id: itemId}});
					window.open(routeData.href, '_blank');
			},
		},
	}
</script>

<style>
	.policyItem{
		width: 100%;
		height: 268px;
		padding: 20px 10px 20px 20px;
	}
	.policyItem-left{
		width: 180px;
		float: left;
	}
	.policyItem-left-img{
		 position: relative;
         overflow: hidden;
         margin-bottom: 20px;
	}
	.policyItem-left-img img{
		width: 180px;
		height: 100px;		
	}
	.policyItem-right{
		width: 370px;
        padding: 10px 0px 10px 0px;
		float: left;
	}
	.policyItem-right ul li{		
		margin-left: 0px;
		text-align: left;
		font-size: 16px;
		color: #333333;
	   /* color: #38CAC1;*/
	    height: 40px;
	    line-height: 40px;
	    list-style-image: url(../assets/Rectangle.svg);
	}
	.selectli{
		color: #38CAC1 !important;
	}
	.policyItem-right-title{
		width: 230px;
		float: left;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		display:block;
		cursor: pointer;
	}
	.policyItem-right-title:hover{
		color: #38CAC1;
	}
	.policyItem-right-time{
		width: 80px;
		float: right;
		font-size: 14px;
		color: #999999;
		height: 40px;
		line-height: 40px;		
	}
	.inbox {
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #FFF;
        width: 100%;
        position: absolute;
        bottom: -30px;
        background: rgba(0,0,0,0.30);
		border-radius: 0px 0px 4px 4px;
        transition: 1s;/*过渡效果*/
        overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		display:block;
    }
    .policyItem-left-img:hover>.inbox {
                bottom: 0;
            }

</style>