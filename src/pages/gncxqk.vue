<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 60px;"></Header>
		<div class="gncxqk_mainContent">
			<div class="gncxqk_leftNav">
				<Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
			</div>
			<div class="gncxqk_rightContent">
				<div class="gncxqk_year_header">
					<div class="gncxqk_header_title">
						年度新能源汽车产销量
					</div>
					<select class="gncxqk_year_select" @change="changeYear">
						<option v-for="year in yearsArray" :key="year">{{year}}年</option>
					</select>
				</div>
				<div class="gncxqk_year_num">
					<div class="gncxqk_year_zcl">
						<span>{{theYear}}全国总产量（台）</span>
						<span>{{zcl}}</span>
					</div>
					<div class="gncxqk_year_zxl">
						<span>{{theYear}}全国总销量（台）</span>
						<span>{{zxl}}</span>
					</div>
				</div>
				<div class="gncxqk_lineChartDiv">
					<chart ref="lineChart" class="gncxqk_chartDiv" :options="lineOption" :auto-resize="true"></chart>
				</div>
				<div class="gncxqk_year_header mgBottom-32">
					<div class="gncxqk_header_title">
						近五年全国产销量趋势
					</div>
				</div>
				<div class="gncxqk_curveChartDiv">
					<chart ref="curveChart" class="gncxqk_chartDiv" :options="curveOption" :auto-resize="true"></chart>
				</div>
				<div class="gncxqk_analysis">
					<div class="gncxqk_analysis_title">分析总结</div>
					<div class="gncxqk_analysis_time">更新时间：{{updateTime}}</div>
					<div class="gncxqk_analysis_content"></div>
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
				tflag:'gncxqk',
				yearsArray:[],
				theYear:'',
				zcl:0,
				zxl:0,
				updateTime:'2018年9月25日',
				tabs: [{
						title: "运行情况",
						iscurrent:false,
						children: [{title: "行政省份", tflag: "xzsf",iscurrent:false}, {title: "产业集群", tflag: "cyjq",iscurrent:false},
									{title: "企业&车型排名", tflag: "qycxpm",iscurrent:false}]
				}, {
						title: "供求情况",
						iscurrent:true,
						children: [{title: "国内产销情况", tflag: "gncxqk",iscurrent:true}, {title: "进出口情况", tflag: "jckqk",iscurrent:false},
						{title: "市场供需预测", tflag: "scgxyc",iscurrent:false}]
				},{
						title: "用户群体",
						iscurrent:false,
						children: [{title: "满意度分析", tflag: "mydfx",iscurrent:false}]
				}],
				lineOption:{
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: ['产量', '销量'],
						align: 'right',
						right: 10
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: ['1月', '2月', '3月', '4月', '5月','6月', '7月', '8月', '9月', '10月','11月','12月'],
						axisLine: {
							lineStyle: {
								color: '#cccccc'
							}
						},
						axisLabel: {
							color: '#999999',
							fontSize: 14
						}
					}],
					yAxis: [{
						type: 'value',
						name: '(万台)',
						nameTextStyle: {
							color: '#999999',
							fontSize: 12
						},
						axisLine: {
							show:false,
							lineStyle: {
								color: '#cccccc'
							}
						},
						axisLabel: {
							formatter: '{value}',
							color: '#999999',
							fontSize: 14
						}
					}],
					series: [{
						name: '产量',
						type: 'bar',
						data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0],
						itemStyle:{
							normal:{
								color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#2F8DF4'
								}, {
									offset: 1.0,
									color: '#00FEFD'
								}], false)
							}
						}
					}, {
						name: '销量',
						type: 'bar',
						data: [0, 0, 0, 0, 0,0, 0, 0, 0, 0,0,0],
						itemStyle:{
							normal:{
								color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#FFA866'
								}, {
									offset: 1.0,
									color: '#FA598B'
								}], false)
							}
						}
					}]
				},
				curveOption:{
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'line' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: ['产量', '销量'],
						align: 'right',
						right: 10
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: ['2014', '2015', '2016', '2017', '2018'],
						axisLine: {
							lineStyle: {
								color: '#cccccc'
							}
						},
						axisLabel: {
							color: '#999999',
							fontSize: 14
						}
					},
					yAxis: {
						type: 'value',
						name: '(万台)',
						nameTextStyle: {
							color: '#999999',
							fontSize: 12
						},
						axisLine: {
							show:false,
							lineStyle: {
								color: '#cccccc'
							}
						},
						axisLabel: {
							formatter: '{value}',
							color: '#999999',
							fontSize: 14
						}
					},
					series: [{
						name: '产量',
						data: [0, 0, 0, 0, 0],
						type: 'line',
						smooth: true,
						itemStyle:{
							normal:{
								color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#2F8DF4'
								}, {
									offset: 1.0,
									color: '#00FEFD'
								}], false)
							}
						}
					},{
						name: '销量',
						data: [0, 0, 0, 0, 0],
						type: 'line',
						smooth: true,
						itemStyle:{
							normal:{
								color:new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#FFA866'
								}, {
									offset: 1.0,
									color: '#FA598B'
								}], false)
							}
						}
					}]
				},
			};
		},
		mounted() {
						
		},
		created() {
			this.getOverviewListyear1();
			this.getProductionmarketing();
		},
		methods:{
			getTflag(tflag){
				this.tflag=tflag;
				this.$router.push({
					path: '/' + tflag
				});
			},
			getOverviewListyear1() {
				api.get_overviewListyear1({}).then(res => {
					var data = res.data;
					this.yearsArray = data;
					this.theYear = this.yearsArray[0];
					this.getOverviewGncxqkfx();
				});
			},
			getOverviewGncxqkfx() {
				api.get_overviewGncxqkfx({
					year:this.theYear
				}).then(res => {
					var data = res.data;
					this.zcl = data.all.production;
					this.zxl = data.all.marketing;
					this.updateTime = data.conclusion.update_datetime;
					var productionArr = [0,0,0,0,0,0,0,0,0,0,0,0];
					var marketingArr = [0,0,0,0,0,0,0,0,0,0,0,0];
					$(".gncxqk_analysis_content").empty().append(data.conclusion.content);
					for (var i = 0;i<data.byMonth.length;i++) {
						var indexNum = parseInt(data.byMonth[i].month);
						productionArr[indexNum - 1] = data.byMonth[i].production;
						marketingArr[indexNum - 1] = data.byMonth[i].marketing;
					}
					this.lineOption.series[0].data = productionArr;
					this.lineOption.series[1].data = marketingArr;
				});
			},
			changeYear(event) {
				this.theYear = event.target.value.substring(0, 4);
				this.getOverviewGncxqkfx();
			},
			//近5年全国总产销量
			getProductionmarketing() {
				api.get_productionmarketing({}).then(res => {
					var data = res.data;
					this.curveOption.xAxis.data = data.x;
					this.curveOption.series[0].data = data.productionArray;
					this.curveOption.series[1].data = data.marketingArray;
				});
			},
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
	.mgBottom-32{
		margin-bottom: 32px;
	}
	.hidden{
		display: none;
	}
	.gncxqk_mainContent{
		width: 1200px;	
		margin: 0 auto;
		text-align: right;
	}
	.gncxqk_leftNav{
		width: 220px;
		text-align: left;
	}
	.gncxqk_rightContent{
		display: inline-block;
		width: 960px;
		margin-left: 20px;
		background: #FFFFFF;
		text-align: left;
	}
	.gncxqk_year_header{
		width: 100%;
		height: 50px;
		margin-top: 50px;
		position: relative;
	}
	.gncxqk_header_title{
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
	.gncxqk_year_select{
		width: 120px;
		height: 36px;
		position: absolute;
		top: 2px;
		right: 92px;
		background: #F5F5F5;
		border-radius: 4px;
		font-family: PingFang-SC-Medium;
		font-size: 16px;
		color: #333333;
		line-height: 36px;
		cursor: pointer;
		border: none;
		outline: none;
	}
	.gncxqk_year_num{
		width: 100%;
		height: 120px;
		margin-top: 42px;
		background: #FFFFFF;
		margin-bottom: 30px;
	}
	.gncxqk_year_zcl{
		display: inline-block;
		width: 360px;
		height: 120px;
		box-shadow: 0 2px 4px 0 rgba(200,200,200,0.30);
		border-radius: 8px;
		margin-left: 88px;
	}
	.gncxqk_year_zxl{
		display: inline-block;
		width: 360px;
		height: 120px;
		box-shadow: 0 2px 4px 0 rgba(200,200,200,0.30);
		border-radius: 8px;
		margin-left: 60px;
	}
	.gncxqk_year_zcl>span:first-child,.gncxqk_year_zxl>span:first-child{
		display: inline-block;
		width: 100%;
		height: 20px;
		line-height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
		text-align: center;
		margin-top: 29px;
	}
	.gncxqk_year_zcl>span:last-child,.gncxqk_year_zxl>span:last-child{
		display: inline-block;
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-family: PingFangSC-Semibold;
		font-size: 28px;
		text-align: center;
		margin-top: 10px;
	}
	.gncxqk_year_zcl>span:last-child{
		color: #28DCDB;
	}
	.gncxqk_year_zxl>span:last-child{
		color: #F17C69;
	}
	.gncxqk_lineChartDiv{
		width: 780px;
		height: 300px;
		margin: 0 auto;
		box-shadow: 0 2px 4px 0 rgba(200,200,200,0.30);
		border-radius: 4px;
	}
	.gncxqk_chartDiv{
		width: 100% !important;
		height: 100% !important;
	}
	.gncxqk_curveChartDiv{
		width: 780px;
		height: 300px;
		margin: 0 auto;
		box-shadow: 0 2px 4px 0 rgba(200,200,200,0.30);
		border-radius: 4px;
	}
	.gncxqk_analysis{
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
	.gncxqk_analysis_title{
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
	.gncxqk_analysis_time{
		width: auto;
		height: 20px;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #999999;
		position: absolute;
		top: 10px;
		right: 13px;
	}
	.gncxqk_analysis_content{
		width: 810px;
		height: auto;
		margin: 0 auto;
	}
</style>
