<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 60px;"></Header>
		<div class="qycxpm_mainContent">
			<div class="qycxpm_leftNav">
				<Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
			</div>
			<div class="qycxpm_rightContent">
				<div class="qycxpm_year_header">
					<div class="qycxpm_header_title">
						年度新能源汽车产销量
					</div>
					<select class="qycxpm_year_select" @change="changeYear">
						<option v-for="year in yearsArray" :key="year">{{year}}年</option>
					</select>
				</div>
				<div class="qycxpm_lineChartDiv">
					<chart class="qycxpm_chartDiv" :options="lineOption" :auto-resize="true"></chart>
				</div>
				<div class="top10">
					<div class="top10-main-detail">
						<top10 :salesData="salesData"></top10>
					</div>
					<div class="top10-main-detail marwidth">
						<top12 :satisfactionData="satisfactionData"></top12>
					</div>
				</div>
				<div class="qycxpm_analysis">
					<div class="qycxpm_analysis_title">分析总结</div>
					<div class="qycxpm_analysis_time">更新时间：{{updateTime}}</div>
					<div class="qycxpm_analysis_content"></div>
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
	import top10 from '@/components/top10.vue'
	import top12 from '@/components/top12.vue'
	export default {
		components: {
				Footer,
				Header,
				Left,
				top10,
				top12,
		},
		mounted() {
						
		},
		data() {
			return {
				currentPageIndex:2,
				tflag:'qycxpm',
				yearsArray:[],
				theYear:'',
				topN:10,
				satisfactionData: [],
				salesData: [],
				updateTime:'',
				tabs: [{
						title: "运行情况",
						iscurrent:true,
						children: [{title: "行政省份", tflag: "xzsf",iscurrent:false}, {title: "产业集群", tflag: "cyjq",iscurrent:false},
									{title: "企业&车型排名", tflag: "qycxpm",iscurrent:true}]
				}, {
						title: "供求情况",
						iscurrent:false,
						children: [{title: "国内产销情况", tflag: "gncxqk",iscurrent:false}, {title: "进出口情况", tflag: "jckqk",iscurrent:false},
						{title: "市场供需预测", tflag: "scgxyc",iscurrent:false}]
				},{
						title: "用户群体",
						iscurrent:false,
						children: [{title: "满意度分析", tflag: "mydfx",iscurrent:false}]
				}],
				lineOption:{
					title: {
						left: 'center',
						text: '新能源汽车乘用车企业销量 TOP10',
						textStyle: {
							color: '#38CAC1',
							fontFamily: 'PingFang-SC-Medium',
							fontSize: 16
						}
					},
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        	type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'value',
							name: '(台)',
							nameTextStyle: {
								color: '#999999',
								fontSize: 10,
								align:'left',
								padding:[30, 0, 0, 10]
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
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
							axisLine: {
								lineStyle: {
									color: '#cccccc'
								}
							},
							axisLabel: {
								color: '#333333',
								fontSize: 14
							},
                            data : []
                        }
                    ],
                    series : [
                        {
                            name:'销量',
                            type:'bar',
                            data:[],
                            itemStyle: {
                                normal:{
                                    color: function (params){
										var colorArr = ['#A8EFEE','#A8EFEE','#A8EFEE','#A8EFEE','#A8EFEE','#A8EFEE','#A8EFEE','#00D2E0','#00A5DC','#1B83DE',];
										var dataIndex = params.dataIndex;
										return colorArr[dataIndex];
									}                                
                                }
                            }

                        }
                    ]
                },
			};
		},
		created() {
			this.getSalesListYears();
			this._analyseconclusion_getByType();
		},
		methods:{
			getTflag(tflag) {
				this.tflag=tflag;
				this.$router.push({
					path: '/' + tflag
				});
			},
			getSalesListYears() {
				api.salesListYears({}).then(res => {
					var data = res.data;
					this.yearsArray = data;
					this.theYear = this.yearsArray[0];
					this.getSalesListCarCompanyRank();
					this.getSalesListCarTypeRank1();
					this.getSalesListCarTypeRank2();
				});
			},
			getSalesListCarCompanyRank() {
				api.salesListCarCompanyRank({
					type:1,
					topN:this.topN,
					year:parseInt(this.theYear)
				}).then(res => {
					var data = res.data;
					var companyArr = [];var salesArr = [];
					for (var i = 0;i<data.length;i++) {
						companyArr.push(data[i].company);
						salesArr.push(data[i].sales);
					}
					var tempNum = this.topN - data.length;
					if (tempNum == 0) {
						
					} else{
						for (var i = 0;i<tempNum;i++) {
							companyArr.push("");
							salesArr.push(0);
						}
					}
					this.lineOption.yAxis[0].data = companyArr.reverse();
					this.lineOption.series[0].data = salesArr.reverse();
				});
			},
			getSalesListCarTypeRank1() {
				api.salesListCarTypeRank({
					topN: 12,
					type:1,
					year:parseInt(this.theYear)
				}).then(res => {					
					this.salesData = res.data
				});
			},
			getSalesListCarTypeRank2() {
				api.salesListCarTypeRank({
					topN: 12,
					type:2,
					year:parseInt(this.theYear)
				}).then(res => {					
					this.satisfactionData = res.data
				});
			},
			changeYear(event) {
				this.theYear = event.target.value.substring(0, 4);
				this.getSalesListCarCompanyRank();
				this.getSalesListCarTypeRank1();
				this.getSalesListCarTypeRank2();
			},
			_analyseconclusion_getByType() {
				api.analyseconclusion_getByType({
					type:7,
				}).then(res => {
					var data = res.data;
					this.updateTime = data.updateDatetime;
					$(".qycxpm_analysis_content").empty().append(data.content);
				})
			},
		}
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
	.qycxpm_mainContent{
		width: 1200px;	
		margin: 0 auto;
		text-align: right;
	}
	.qycxpm_leftNav{
		width: 220px;
		text-align: left;
	}
	.qycxpm_rightContent{
		display: inline-block;
		width: 960px;
		margin-left: 20px;
		background: #FFFFFF;
		text-align: left;
	}
	.qycxpm_year_header{
		width: 100%;
		height: 50px;
		margin-top: 50px;
		position: relative;
	}
	.qycxpm_header_title{
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
	.qycxpm_year_select{
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
	.qycxpm_lineChartDiv{
		width: 880px;
		height: 420px;
		margin: 20px 40px 20px;
	}
	.qycxpm_chartDiv{
		width: 100% !important;
		height: 100% !important;
	}
	.top10 {
		height: 540px;
		width: 880px;
		margin: 0 auto;
	}	
	.top10-main-detail {
		float: left;
		width: 430px;
		height: auto;
		text-align: center;
	}
	.marwidth {
		margin-left: 20px;
	}
	.qycxpm_analysis{
		clear: both;
		width: 880px;
		min-height: 120px;
		height: auto;
		margin: 40px 40px 20px;
		background: #F5F5F5;
		border-radius: 3px;
		position: relative;
		padding-top: 68px;
		padding-bottom: 40px;
	}
	.qycxpm_analysis_title{
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
	.qycxpm_analysis_time{
		width: auto;
		height: 20px;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #999999;
		position: absolute;
		top: 10px;
		right: 13px;
	}
	.qycxpm_analysis_content{
		width: 810px;
		height: auto;
		margin: 0 auto;
	}
</style>
