<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 60px;"></Header>
		<div class="scgxyc_mainContent">
			<div class="scgxyc_leftNav">
				<Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
			</div>
			<div class="scgxyc_rightContent">
				<div class="scgxyc_year_header">
					<div class="scgxyc_header_title">
						近三年新能源汽车产量走势及后两月预测（万元）
					</div>
				</div>
				<div class="scgxyc_lineChartDiv">
					<chart class="scgxyc_chartDiv" :options="lineOption1" :auto-resize="true"></chart>
				</div>
				<div class="scgxyc_year_header">
					<div class="scgxyc_header_title">
						近三年新能源汽车销量走势及后两月预测（万元）
					</div>
				</div>
				<div class="scgxyc_lineChartDiv">
					<chart class="scgxyc_chartDiv" :options="lineOption2" :auto-resize="true"></chart>
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
				tflag:'scgxyc',
				tabs: [{
						title: "运行情况",
						iscurrent:false,
						children: [{title: "行政省份", tflag: "xzsf",iscurrent:false}, {title: "产业集群", tflag: "cyjq",iscurrent:false},
									{title: "企业&车型排名", tflag: "qycxpm",iscurrent:false}]
				}, {
						title: "供求情况",
						iscurrent:true,
						children: [{title: "国内产销情况", tflag: "gncxqk",iscurrent:false}, {title: "进出口情况", tflag: "jckqk",iscurrent:false},
						{title: "市场供需预测", tflag: "scgxyc",iscurrent:true}]
				},{
						title: "用户群体",
						iscurrent:false,
						children: [{title: "满意度分析", tflag: "mydfx",iscurrent:false}]
				}],
				lineOption1:{
					tooltip: {
						trigger: 'item'
					},
					legend: {
						data:['2017','2018','2019']
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name:'',
							type:'line',
							symbol: 'emptyCircle',     //设定为空心点
							symbolSize: 5,   //设定空心点的大小
							data:[],
							itemStyle: {
								color: '#19C2BF',
							},
							lineStyle:{
								type:'dashed'
							}
						},
						{
							name:'',
							type:'line',
							symbol: 'emptyCircle',     //设定为空心点
							symbolSize: 5,   //设定空心点的大小
							data:[],
							itemStyle: {
								color: '#25A3F2',
							},
							lineStyle:{
								type:'dashed'
							}
						},
						{
							name:'',
							type:'line',
							symbol: 'circle',     //设定为实心点
							symbolSize: 5,   //设定实心点的大小
							data:[],
							itemStyle: {
								color: '#25A3F2',
							},
							lineStyle:{
								type:'solid'
							}
						},												
						{
							name:'',
							type:'line',
							symbol: 'circle',     //设定为实心点
							symbolSize: 5,   //设定实心点的大小
							data:[],
							itemStyle: {
								color: '#FDA762',
							},
							lineStyle:{
								type:'solid'
							}
						}
					]
				},
				lineOption2:{
					tooltip: {
						trigger: 'item'
					},
					legend: {
						data:[]
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
					},
					yAxis: {
						type: 'value'
					},
					series: [
						{
							name:'',
							type:'line',
							symbol: 'emptyCircle',     //设定为空心点
                            symbolSize: 5,   //设定空心点的大小
							data:[],
							itemStyle: {
								color: '#19C2BF',
							},
							lineStyle:{
								type:'dashed'
							}
						},
						{
							name:'',
							type:'line',
							symbol: 'emptyCircle',     //设定为空心点
							symbolSize: 5,   //设定空心点的大小
							data:[],
							itemStyle: {
								color: '#25A3F2',
							},
							lineStyle:{
								type:'dashed'
							}
						},
						{
							name:'',
							type:'line',
							symbol: 'circle',     //设定为实心点
							symbolSize: 5,   //设定实心点的大小
							data:[],
							itemStyle: {
								color: '#25A3F2',
							},
							lineStyle:{
								type:'solid'
							}
						},												
						{
							name:'',
							type:'line',
							symbol: 'circle',     //设定为实心点
							symbolSize: 5,   //设定实心点的大小
							data:[],
							itemStyle: {
								color: '#FDA762',
							},
							lineStyle:{
								type:'solid'
							}
						}
					]
				},
			};
		},
		mounted() {
						
		},
		created() {
			this.get_overviewProductionmarketingthreeyear();
		},
		methods:{
			getTflag(tflag){
				this.tflag=tflag;
				this.$router.push({
					path: '/' + tflag
				});
			},
			get_overviewProductionmarketingthreeyear() {
				api.overviewProductionmarketingthreeyear({}).then(res => {
					var data = res.data;
					var foreList = data[0].list;
					var legendArr = [];
					if (foreList[0].year == foreList[1].year) {
						if (foreList[0].year == data[1].year) {
							legendArr.push(foreList[0].year);
							legendArr.push(data[2].year);
							legendArr.push(data[3].year);
							this.lineOption1.legend.data = legendArr;
							this.lineOption2.legend.data = legendArr;
							this.lineOption1.series[0].name = foreList[0].year;
							this.lineOption2.series[0].name = foreList[0].year;
							var tempOption1Data0 = [];var tempOption2Data0 = [];
							for (var i = 0;i<12;i++) {
								if(i == data[1].list.length - 1) {
									tempOption1Data0.push(this.changeUndefinedToZero(data[1].list[i].production));
									tempOption2Data0.push(this.changeUndefinedToZero(data[1].list[i].marketing));
								}else if (i == data[1].list.length) {
									tempOption1Data0.push(this.changeUndefinedToZero(foreList[0].production));
									tempOption2Data0.push(this.changeUndefinedToZero(foreList[0].marketing));
								}else if(i == data[1].list.length + 1){
									tempOption1Data0.push(this.changeUndefinedToZero(foreList[1].production));
									tempOption2Data0.push(this.changeUndefinedToZero(foreList[1].marketing));
								}else{
									tempOption1Data0.push('-');
									tempOption2Data0.push('-');
								}
							}
							this.lineOption1.series[0].data = tempOption1Data0;
							this.lineOption2.series[0].data = tempOption2Data0;
							this.lineOption1.series[1].name = data[1].year;
							this.lineOption2.series[1].name = data[1].year;
							this.lineOption1.series[1].itemStyle.color = '#19C2BF';
							this.lineOption2.series[1].itemStyle.color = '#19C2BF';

							this.lineOption1.series[2].name = data[2].year;
							this.lineOption2.series[2].name = data[2].year;
							this.lineOption1.series[3].name = data[3].year;
							this.lineOption2.series[3].name = data[3].year;
							var tempOption1Data1 = [];var tempOption2Data1 = [];
							for (var i = 0;i<12;i++) {
								if (i < data[1].list.length) {
									tempOption1Data1.push(this.changeUndefinedToZero(data[1].list[i].production));
									tempOption2Data1.push(this.changeUndefinedToZero(data[1].list[i].marketing));
								} else{
									tempOption1Data1.push('-');
									tempOption2Data1.push('-');
								}
							}
							this.lineOption1.series[1].data = tempOption1Data1;
							this.lineOption2.series[1].data = tempOption2Data1;
							this.lineOption1.series[1].lineStyle.type = "solid";
							this.lineOption2.series[1].lineStyle.type = "solid";							
							var tempOption1Data2 = [];var tempOption2Data2 = [];var tempOption1Data3 = [];var tempOption2Data3 = [];
							for (var i = 0;i<12;i++) {
								tempOption1Data2.push(this.changeUndefinedToZero(data[2].list[i].production));
								tempOption2Data2.push(this.changeUndefinedToZero(data[2].list[i].marketing));
								tempOption1Data3.push(this.changeUndefinedToZero(data[3].list[i].production));
								tempOption2Data3.push(this.changeUndefinedToZero(data[3].list[i].marketing));
							}
							this.lineOption1.series[2].data = tempOption1Data2;
							this.lineOption2.series[2].data = tempOption2Data2;
							this.lineOption1.series[3].data = tempOption1Data3;
							this.lineOption2.series[3].data = tempOption2Data3;							
						} else{
							legendArr.push(foreList[0].year);
							legendArr.push(data[1].year);
							legendArr.push(data[2].year);
							this.lineOption1.legend.data = legendArr;
							this.lineOption2.legend.data = legendArr;
							this.lineOption1.series[0].name = foreList[0].year;
							this.lineOption2.series[0].name = foreList[0].year;
							var tempOption1Data0 = [];var tempOption2Data0 = [];
							for (var i = 0;i<12;i++) {
								if (i==0) {
									tempOption1Data0.push(this.changeUndefinedToZero(foreList[0].production));
									tempOption2Data0.push(this.changeUndefinedToZero(foreList[0].marketing));
								} else if (i == 1) {
									tempOption1Data0.push(this.changeUndefinedToZero(foreList[1].production));
									tempOption2Data0.push(this.changeUndefinedToZero(foreList[1].marketing));
								} else {
									tempOption1Data0.push('-');
									tempOption2Data0.push('-');
								}
							}
							this.lineOption1.series[0].data = tempOption1Data0;
							this.lineOption2.series[0].data = tempOption2Data0;
							var tempOption1Data1 = [];var tempOption2Data1 = [];var tempOption1Data2 = [];var tempOption2Data2 = [];var tempOption1Data3 = [];var tempOption2Data3 = [];
							this.lineOption1.series[1].name = data[1].year;
							this.lineOption2.series[1].name = data[1].year;
							this.lineOption1.series[2].name = data[1].year;
							this.lineOption2.series[2].name = data[1].year;
							this.lineOption1.series[3].name = data[2].year;
							this.lineOption2.series[3].name = data[2].year;
							for (var i = 0;i<12;i++) {
								tempOption1Data1.push('-');
								tempOption2Data1.push('-');
								tempOption1Data2.push(this.changeUndefinedToZero(data[1].list[i].production));
								tempOption2Data2.push(this.changeUndefinedToZero(data[1].list[i].marketing));
								tempOption1Data3.push(this.changeUndefinedToZero(data[2].list[i].production));
								tempOption2Data3.push(this.changeUndefinedToZero(data[2].list[i].marketing));
							}
							this.lineOption1.series[1].data = tempOption1Data1;
							this.lineOption2.series[1].data = tempOption2Data1;
							this.lineOption1.series[2].data = tempOption1Data2;
							this.lineOption2.series[2].data = tempOption2Data2;
							this.lineOption1.series[3].data = tempOption1Data3;
							this.lineOption2.series[3].data = tempOption2Data3;
						}
					} else{
						legendArr.push(foreList[1].year);
						legendArr.push(foreList[0].year);
						this.lineOption1.series[0].name = foreList[1].year;
						this.lineOption2.series[0].name = foreList[1].year;
						var tempOption1Data0 = [];var tempOption2Data0 = [];
						for (var i = 0;i<12;i++) {
							if (i==0) {
								tempOption1Data0.push(this.changeUndefinedToZero(foreList[1].production));
								tempOption2Data0.push(this.changeUndefinedToZero(foreList[1].marketing));
							} else{
								tempOption1Data0.push('-');
								tempOption2Data0.push('-');
							}
						}
						this.lineOption1.series[0].data = tempOption1Data0;
						this.lineOption2.series[0].data = tempOption2Data0;
						var theList = data[1].list;var tempOption1Data1 = [];var tempOption2Data1 = [];var tempOption1Data2 = [];var tempOption2Data2 = []; 
						for (var i = 0;i<12;i++) {
							if (i == 10) {
								tempOption1Data1.push(this.changeUndefinedToZero(theList[10].production));
								tempOption2Data1.push(this.changeUndefinedToZero(theList[10].marketing));
								tempOption1Data2.push(this.changeUndefinedToZero(theList[10].production));
								tempOption2Data2.push(this.changeUndefinedToZero(theList[10].marketing));
							} else if(i == 11){
								tempOption1Data1.push(this.changeUndefinedToZero(foreList[0].production));
								tempOption2Data1.push(this.changeUndefinedToZero(foreList[0].marketing));
								tempOption1Data2.push('-');
								tempOption2Data2.push('-');
							}else{
								tempOption1Data1.push('-');
								tempOption2Data1.push('-');
								tempOption1Data2.push(this.changeUndefinedToZero(theList[i].production));
								tempOption2Data2.push(this.changeUndefinedToZero(theList[i].marketing));
							}
						}
						this.lineOption1.series[1].name = data[1].year;
						this.lineOption2.series[1].name = data[1].year;
						this.lineOption1.series[1].data = tempOption1Data1;
						this.lineOption2.series[1].data = tempOption2Data1;
						this.lineOption1.series[2].name = data[1].year;
						this.lineOption2.series[2].name = data[1].year;
						this.lineOption1.series[2].data = tempOption1Data2;
						this.lineOption2.series[2].data = tempOption2Data2;
						var lastList = data[2].list;var tempOption1Data3 = [];var tempOption2Data3 = [];
						legendArr.push(data[2].year);
						for (var i = 0;i<12;i++) {
							tempOption1Data3.push(this.changeUndefinedToZero(lastList[i].production));
							tempOption2Data3.push(this.changeUndefinedToZero(lastList[i].marketing));
						}
						this.lineOption1.series[3].name = data[2].year;
						this.lineOption2.series[3].name = data[2].year;
						this.lineOption1.series[3].data = tempOption1Data3;
						this.lineOption2.series[3].data = tempOption2Data3;
						this.lineOption1.legend.data = legendArr;
						this.lineOption2.legend.data = legendArr;
					}
					
				});
			},
			changeUndefinedToZero(num){
				return typeof(num)=="undefined"?0:num;
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
	.scgxyc_mainContent{
		width: 1200px;	
		margin: 0 auto;
		text-align: right;
	}
	.scgxyc_leftNav{
		width: 220px;
		text-align: left;
	}
	.scgxyc_rightContent{
		display: inline-block;
		width: 960px;
		margin-left: 20px;
		background: #FFFFFF;
		text-align: left;
	}
	.scgxyc_year_header{
		width: 100%;
		height: 50px;
		margin-top: 50px;
		position: relative;
	}
	.scgxyc_header_title{
		width: auto;
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
	.scgxyc_lineChartDiv{
		width: 860px;
		height: 500px;
		margin: 40px 50px 0;
		box-shadow: 0 2px 4px 0 rgba(200,200,200,0.30);
		border-radius: 4px;
	}
	.scgxyc_chartDiv{
		width: 100% !important;
		height: 100% !important;
	}
</style>
