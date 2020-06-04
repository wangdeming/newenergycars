<template>
	<div>
		<!-- 添加当前页面的index值 -->
		<Header v-bind:currentPageIndex="currentPageIndex"></Header>
		<div class="mainContent">
			<div class="areaSelect">
				<div class="domesticDiv" :class="(type == 1)?'selectDiv':''" @click="areaClick(1)">
					<img :src="(type == 1)?'static/image/China_PRE.svg':'static/image/China_NOR.svg'"/>
					<span :class="(type == 1)?'spanClicked':''">国内政策</span>
				</div>
				<div class="abroadDiv" :class="(type == 2)?'selectDiv':''" @click="areaClick(2)">
					<img :src="(type == 2)?'static/image/foreign_PRE.svg':'static/image/foreign.svg'"/>
					<span :class="(type == 2)?'spanClicked':''">国外政策</span>
				</div>
				<div class="localDiv" :class="(type == 3)?'selectDiv':''" @click="areaClick(3)">
					<img :src="(type == 3)?'static/image/place_PRE.svg':'static/image/place.svg'"/>
					<span :class="(type == 3)?'spanClicked':''">地方政策</span>
				</div>
			</div>
			<div class="contentList">
				<div class="contentItem" v-for="(item,index) in contentList" :key="index" @click="jumpToDetail(item.id)">
					<img :src="item.picture" />
					<div>
						<div class="itemTitle">{{item.title}}</div>
						<div class="itemContent">{{item.content}}</div>
						<div class="itemTime">
							<span>来源：{{item.source}}</span>
							<span>发布时间：{{item.releaseTime}}</span>
						</div>
					</div>
				</div>
				<div class="pagesList">
					<a class="prevBtn" :class="(pageIndex == 1)?'notAllow':''" @click="jumpBtnClick(-1)"></a>
					<ul>
						<li v-for="(item,index) in pageList" 
									:key="index" 
									:class="[(item == pageIndex+'')?'liActive':'',(item == '···')?'notAllow':'']" 
									@click="pageClick(item)">{{item}}</li> 
					</ul>
					<a class="nextBtn" :class="(pageIndex == pageMax)?'notAllow':''" @click="jumpBtnClick(1)"></a>
				</div>
			</div>
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
			var tempType = typeof(this.$route.query.type)=="undefined"?1:this.$route.query.type;
			return {
				pageIndex:1,
				limit:5,
				type:tempType,
				contentList:[],	
				pageList:[],
				pageMax:0,
				currentPageIndex:5,
			}
		},
		created() {
			this._policyList();
		},
		methods: {
			_policyList () {
				const self = this;
				api.get_policyList({
					offset:(this.pageIndex - 1) * 5,
					limit:this.limit,
					type:this.type
				}).then(data => {	
					self.contentList = data.rows;
					var total = data.total;
					self.pageMax = Math.ceil(total / 5);
					self.pageList = [];
					if(self.pageMax < 10){							
						for (var i = 1;i < self.pageMax;i++) {
							self.pageList.push(i + "");
						}
					}else{
						if(self.pageIndex<5){
							for (var i = 1; i < 8; i++) {
								if (i == 6) {
									self.pageList.push("···");										
								} else if (i == 7){
									self.pageList.push(self.pageMax);
								}else{
									self.pageList.push(i + "");
								}
							}
						}else if(self.pageIndex > (self.pageMax - 4)){
							for (var i = 1; i < 8; i++) {
								if (i == 1) {
									self.pageList.push("1");
								} else if (i == 2){
									self.pageList.push("···");
								}else{
									self.pageList.push((self.pageMax - 7 + i) + "");
								}
							}
						}else{
							for (var i = 1; i < 10; i++) {
								if (i == 1) {
									self.pageList.push("1");
								} else if (i == 2 || i == 8){
									self.pageList.push("···");
								}else if (i == 9){
									self.pageList.push(self.pageMax);
								}else{
									self.pageList.push((self.pageIndex - 5 + i) + "");
								}
							}
						}
					}		  			  
				});
			},
			pageClick(item) {
				if(item == '···'){
					return false;
				}
				var currentIndex = parseInt(item);
				this.pageIndex = currentIndex;
				this._policyList();
			},
			areaClick(areaType) {
				if(this.type == areaType){
					return false;
				}
				this.type = areaType;
				this.pageIndex = 1;
				this._policyList();
			},
			jumpBtnClick(number) {
				if(this.pageIndex == 1 && number == -1){
					return false;
				}
				if(this.pageIndex == this.pageMax && number == 1){
					return false;
				}
				this.pageIndex = this.pageIndex + number;
				this._policyList();
			},
			jumpToDetail(id) {
				let routeData = this.$router.resolve({ name: 'xgzcxq', query: {id: id}});
				window.open(routeData.href, '_blank');
			}
		}
	}
</script>

<style>
	body{
		background: rgb(242,242,242);
	}
	.hidden{
		display: none;
	}
	.mainContent{
		width: 1200px;
		height: auto;
		margin: 0 auto;
	}
	.areaSelect{
		width: 100%;
		height: 120px;
		margin-top: 60px;
	}
	.domesticDiv,.abroadDiv,.localDiv{
		display: inline-block;
		width: 240px;
		height: 120px;
		position: relative;
		cursor: pointer;
	}
	
	.domesticDiv{
		margin-left: 100px;
	}
	.abroadDiv,.localDiv{
		margin-left: 140px;
	}
	.domesticDiv:hover,.abroadDiv:hover,.localDiv:hover{
		background: #FFFFFF;
		border: 1px solid #ECECEC;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
		border-radius: 2px;
	}
	.selectDiv{
		background: #FFFFFF;
		border: 1px solid #ECECEC;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
		border-radius: 2px;
	}
	.selectDiv::after{
		position: absolute;
		display: inline-block;
		bottom: -10px;
		left: 110px;
		width: 0;
		height: 0px;
		content: '';
		border-style: solid;
		border-width: 10px;
		border-color: #fff #fff transparent transparent;
		transform: rotate(135deg);
		box-shadow: 2px -2px 2px rgba(0,0,0,0.10);
	}
	.areaSelect>div>img{
		display: inline-block;
		position: absolute;
		top: 25px;
		left: 96px;
	}
	.areaSelect>div>span{
		display: inline-block;
		width: 64px;
		height: 22px;
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #666666;
		position: absolute;
		bottom: 20px;
		left: 88px;
	}
	.spanClicked{
		color: #00C4D4 !important;
	}
	.contentList{
		width: 1200px;
		height: auto;
		margin-top: 40px;
	}
	.contentItem{
		width: 1200px;
		height: 200px;
		background: #FFFFFF;
		margin-bottom: 20px;
		cursor: pointer;
	}
	.contentItem:hover{
		border: 1px solid #ECECEC;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,0.10);
	}
	.contentItem>img{
		display: inline-block;
		width: 360px;
		height: 100%;
		float: left;
	}
	.contentItem>div{
		display: inline-block;
		width: calc(100% - 360px);
		height: 100%;
		float: left;
	}
	.itemTitle{
		height: 25px;
		line-height: 25px;
		font-family: PingFangSC-Semibold;
		font-size: 18px;
		color: #333333;
		margin-top: 40px;
		margin-left: 30px;
		text-align: left;
	}
	.itemContent{
		height: 40px;
		line-height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
		margin-top: 10px;
		margin-left: 30px;
		text-align: left;
	}
	.itemTime{
		height: 20px;
		line-height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
		margin-top: 25px;
		margin-left: 30px;
		text-align: left;
	}
	.itemTime>span:first-child{
		margin-right: 30px;
	}.pagesList{
		width: 100%;
		height: 25px;
		line-height: 25px;
		margin-top: 60px;
		margin-bottom: 55px;
		text-align: center;		
	}
	.prevBtn{
		display: inline-block;
		width: 20px;
		height: 20px;
		margin-right: 40px;
		background-image: url(../assets/prev.svg);
		background-size: cover;
		cursor: pointer;
		margin-bottom: -3px;
	}
	.nextBtn{
		display: inline-block;
		width: 20px;
		height: 20px;
		background-image: url(../assets/next.svg);
		background-size: cover;
		cursor: pointer;
		margin-bottom: -3px;
	}
	.pagesList>ul{
		display: inline-block;
		height: 100%;
		width: auto;
	}
	.pagesList>ul>li{
		display: inline-block;
		width: 25px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		margin-right: 40px;
		cursor: pointer;
		font-family: PingFangSC-Regular;
		font-size: 18px;
		color: #999999;
	}
	.liActive{
		color: #00C4D4 !important;
	}
	.notAllow{
		cursor: not-allowed !important;
	}
</style>
