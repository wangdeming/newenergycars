<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 60px;"></Header>
		<div class="mydfx_mainContent">
			<div class="mydfx_leftNav">
				<Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
			</div>
			<div class="mydfx_rightContent">
				<div class="mydfx_year_header">
					<div class="mydfx_header_title">
						年度新能源汽车出口情况
					</div>
				</div>
				<div class="mydfx_lineChartDiv">
					<chart class="mydfx_chartDiv" :options="lineOption" :auto-resize="true"></chart>
				</div>
				<div class="mydfx_analysis">
					<div class="mydfx_analysis_title">分析总结</div>
					<div class="mydfx_analysis_time">更新时间：{{updateTime}}</div>
					<div class="mydfx_analysis_content"></div>
				</div>
			</div>
		</div>
		<Footer style="margin-top: 42px;"></Footer>
	</div>
</template>

<script>
	import api from '@/api'
	import Footer from './footer.vue'
	import Header from './header.vue'
	import Left from './left.vue'
	export default {
		components: {
				Footer,
				Header,
				Left,
		},
		data() {
			return {
				currentPageIndex:2,
				tflag:'mydfx',
				updateTime:'',
				tabs: [{
						title: "运行情况",
						iscurrent:false,
						children: [{title: "行政省份", tflag: "xzsf",iscurrent:false}, {title: "产业集群", tflag: "cyjq",iscurrent:false},
									{title: "企业&车型排名", tflag: "qycxpm",iscurrent:false}]
				}, {
						title: "供求情况",
						iscurrent:false,
						children: [{title: "国内产销情况", tflag: "gncxqk",iscurrent:false}, {title: "进出口情况", tflag: "jckqk",iscurrent:false},
						{title: "市场供需预测", tflag: "scgxyc",iscurrent:false}]
				},{
						title: "用户群体",
						iscurrent:true,
						children: [{title: "满意度分析", tflag: "mydfx",iscurrent:true}]
				}],
				lineOption:{
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross'
						}
					},
					legend: {
						data:['新能源汽车','纯电动','插电混动','燃油汽车'],
						right:0,
						top:'middle',
						width:100
					},
					xAxis: [
						{
							type: 'category',
							data: [],
							axisPointer: {
								type: 'shadow'
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							name: '满意度',
							axisLabel: {
								formatter: '{value}'
							}
						}
					],
					series: [
						{
							name:'新能源汽车',
							type:'bar',
							data:[],
							itemStyle: {
								color: '#19C2BF'
							},
							barWidth:30
						},
						{
							name:'纯电动',
							type:'bar',
							data:[],
							itemStyle: {
								color: '#AB8BDC'
							},
							barWidth:30
						},
						{
							name:'插电混动',
							type:'bar',
							data:[],
							itemStyle: {
								color: '#25A3F2'
							},
							barWidth:30
						},
						{
							name:'燃油汽车',
							type:'line',
							data:[],
							itemStyle: {
								color: '#FDA762'
							}
						}
					]
				},
			};
		},
		mounted() {
						
		},
		created() {
			this.get_overviewSatisfactionthreeyear();
		},
		methods:{
			getTflag(tflag){
				this.tflag=tflag;
				this.$router.push({
					path: '/' + tflag
				});
			},
			get_overviewSatisfactionthreeyear() {
				api.overviewSatisfactionthreeyear({}).then(res => {
					var data = res.data;
					this.updateTime = data.conclusion.update_datetime;
					$(".mydfx_analysis_content").empty().append(data.conclusion.content);
					var dataList = data.list;
					var yearArr = [];var data1Arr = []; var data2Arr = []; var data3Arr = []; var data4Arr = [];
					for (var i = 0;i<dataList.length;i++) {
						yearArr.push(dataList[i].year);
						var tempList = dataList[i].list;
						for (var j = 0;j<tempList.length;j++) {
							if (tempList[j].type == "1") {
								data1Arr.push(tempList[j].satisfaction);
							}else if (tempList[j].type == "2") {
								data2Arr.push(tempList[j].satisfaction);
							}else if (tempList[j].type == "3") {
								data3Arr.push(tempList[j].satisfaction);
							}else if (tempList[j].type == "4"){
								data4Arr.push(tempList[j].satisfaction);
							}else{
								
							}
						}
					}
					this.lineOption.xAxis[0].data = yearArr;
					this.lineOption.series[0].data = data1Arr;
					this.lineOption.series[1].data = data2Arr;
					this.lineOption.series[2].data = data3Arr;
					this.lineOption.series[3].data = data4Arr;
				});
			}
		},
	}
</script>

<style>
	body{
		background: rgb(242,242,242);
	}
	a:any-link {
		text-decoration: none !important;
	}
	.hidden{
		display: none;
	}
	.mydfx_mainContent{
		width: 1200px;	
		margin: 0 auto;
		text-align: right;
	}
	.mydfx_leftNav{
		width: 220px;
		text-align: left;
	}
	.mydfx_rightContent{
		display: inline-block;
		width: 960px;
		margin-left: 20px;
		background: #FFFFFF;
		text-align: left;
	}
	.mydfx_year_header{
		width: 100%;
		height: 50px;
		margin-top: 50px;
		position: relative;
	}
	.mydfx_header_title{
		width: 220px;
		height: 28px;
		font-family: PingFang-SC-Bold;
		font-size: 20px;
		color: #333333;
		position: absolute;
		top: 6px;
		left: 48px;
		text-align: center;
		border-bottom: 8px solid #DBF6F4;
		border-radius: 2px;
	}
	.mydfx_lineChartDiv{
		width: 860px;
		height: 500px;
		margin: 40px 50px 0;
		box-shadow: 0 2px 4px 0 rgba(200,200,200,0.30);
		border-radius: 4px;
	}
	.mydfx_analysis{
		width: 860px;
		min-height: 120px;
		height: auto;
		margin: 80px 50px 40px;
		background: #F5F5F5;
		border-radius: 3px;
		position: relative;
		padding-top: 68px;
		padding-bottom: 40px;
	}
	.mydfx_analysis_title{
		width: 136px;
		height: 40px;
		font-family: PingFangSC-Semibold;
		font-size: 20px;
		color: #FFFFFF;
		text-align: center;
		line-height: 40px;
		background-image: url(../assets/headline.svg);		
		position: absolute;
		top: -14px;
		left: 362px;
	}
	.mydfx_analysis_time{
		width: auto;
		height: 20px;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #999999;
		position: absolute;
		top: 10px;
		right: 13px;
	}
	.mydfx_analysis_content{
		width: 810px;
		height: auto;
		margin: 0 auto;
	}
	.mydfx_chartDiv{
		width: 100% !important;
		height: 100% !important;
	}
</style>
