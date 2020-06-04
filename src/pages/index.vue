<template>
	<div id="app">
		<div class="header">
			<div class="header-main main-width">
				<div class="header-nav">
					<div class="logo">
						<img src="../assets/logo-img.svg" />
					</div>
					<div class="header-nav-nav">
						<div class="header-nav-nav-item">
							<router-link to="">首页</router-link>
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
				</div>
				<div class="header-map">
					<div class="china-map" id="id">
						<chart ref="myChart" class="mapDiv" :options="mapOption" :auto-resize="true"></chart>
					</div>
					<div class="line-map">
						<div class="line-map-map">
							<div class="line-map-map-title">
								<div class="line-map-map-title-left">
									<div class="line-map-title">
										本年度全国总产量(台)
									</div>
									<div class="line-map-num">
										{{ theYearProduction }}
									</div>
								</div>
								<div class="line-map-map-title-left">
									<div class="line-map-title">
										本年度全国总销量(台)
									</div>
									<div class="line-map-num1">
										{{ theYearMarkting }}
									</div>
								</div>
							</div>
							<div class="line-map-sty">
								<chart :options="option" :auto-resize="true"></chart>
							</div>
						</div>
						<div class="line-map-entry">
							<div class="">
								<img src="../assets/entrance.svg" />
								<span>
	      					  企业数据直报入口	
	      					</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="insdutry">
			<div class="insdutry-main main-width">
				<div class="insdutry-title">
					三大产业链
				</div>
				<div class="insdutry-detail">
					新能源汽车属于新兴产业，产业链长，涉及多个行业的发展。电池、电机和电控是新能源汽车的关键零部件
				</div>
				<div class="insdutry-img">
					<div class="insdutry-img-item" @click="goToPage('battery')">
						<div>电池</div>
						<img class="marright" src="../assets/batterypic@2x.png" />
					</div>
					<div class="insdutry-img-item" @click="goToPage('elecmac')">
						<div>电机电控</div>
						<img class="marright" src="../assets/electricalpic@2x.png" />
					</div>
					<div class="insdutry-img-item" @click="goToPage('chafac')">
						<div>充电设施</div>
						<img src="../assets/chargepic.png" />
					</div>
				</div>
			</div>
		</div>
		<div class="policy">
			<div class="insdutry-main main-width">
				<div class="policy-detail">
					<div class="policy-detail-title">
						<span>省市分析入口</span>
					</div>
					<div class="policy-detail-but">
						<button v-for="item in listprovince" :id="item.id" :key="item.id" @click="jumpToSSFX()">{{ item.name }}</button>
					</div>
				</div>
				<div class="policy-detail marwidth">
					<div class="policy-detail-title">
						<a class="selecteda">国内政策</a>
						<a>国外政策</a>
						<a>地方政策</a>
						<div class="more" @click="jumpToXGZC()">
							更多
						</div>
					</div>
					<policyItem :policybriefData="policybriefData"></policyItem>
				</div>
			</div>
		</div>
		<div class="advert">
           <img src="../assets/adv.png"/>
		</div>
		<div class="top10">
			<div class="top10-main-detail">
				<top10 :salesData="salesData"></top10>
			</div>
			<div class="top10-main-detail marwidth">
				<top12 :satisfactionData="satisfactionData"></top12>
			</div>
		</div>
		<Footer></Footer>
	</div>
</template>

<script>
	var policybriefType = 1;
	import Footer from './footer.vue'
	import policyItem from '@/components/policyItem.vue'
	import top10 from '@/components/top10.vue'
	import top12 from '@/components/top12.vue'
	import api from '@/api'

	var data = [{name: "北京",value: 0},{name: "天津",value: 0},{name: "河北",value: 0},{name: "山西",value: 0},{name: "内蒙古",value: 0},{name: "辽宁",value: 0},
							{name: "吉林",value: 0},{name: "黑龙江",value: 0},{name: "上海",value: 0},{name: "江苏",value: 0},{name: "浙江",value: 0},{name: "安徽",value: 0},
							{name: "福建",value: 0},{name: "江西",value: 0},{name: "山东",value: 0},{name: "河南",value: 0},{name: "湖北",value: 0},{name: "湖南",value: 0},
							{name: "重庆",value: 0},{name: "四川",value: 0},{name: "贵州",value: 0},{name: "云南",value: 0},{name: "西藏",value: 0},{name: "陕西",value: 0},
							{name: "甘肃",value: 0},{name: "青海",value: 0},{name: "宁夏",value: 0},{name: "新疆",value: 0},{name: "广东",value: 0},{name: "广西",value: 0},{name: "海南",value: 0},
						];

	var geoCoordMap = {};
	export default {
		components: {
			Footer,
			policyItem,
			top10,
			top12,
		},
		data() {
			return {
				listprovince: [],
				satisfactionData: [],
				policybriefData: [],
				productionmarketingData: {},
				theYearProduction:'0',
				theYearMarkting:'0',
				salesData: [],
				proData:[],
				option: {
					title: {
						text: '近五年全国总产销量(万台)',
						textStyle: {
							fontSize: 14,
							color: '#666666'
						}
					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						left: '6%',
						right: '4%',
						bottom: '3%',
						top: '18%',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						axisLine: {
							lineStyle: {
								color: '#CCCCCC'
							}
						},
						axisLabel: {
							color: '#A7B7D6',
						},
						data: [2014, 2015, 2016, 2017, 2018],

					},
					yAxis: {
						type: 'value',
						axisLine: {
							lineStyle: {
								color: '#CCCCCC'
							}
						},
						axisLabel: {
							color: '#A7B7D6',
						},
						splitLine: {
							lineStyle: {
								color: '#CCCCCC',
								opacity: 0.5
							}
						},
						maxInterval: 10,
					},
					series: [{
						type: 'line',
						smooth: true,
						lineStyle: {
							color: '#F17C69'
						},
						showSymbol: true,
						showAllSymbol: true,
						itemStyle: {
							color: '#F17C69'
						},
						data: [20, 10, 35, 30, 40, 25, 10],
					}, {
						type: 'line',
						smooth: true,
						lineStyle: {
							color: '#28DCDB'
						},
						showSymbol: true,
						showAllSymbol: true,
						itemStyle: {
							color: '#28DCDB'
						},
						data: [10, 30, 25, 30, 40, 15, 20],
					}]
				},

				mapOption: {
					title: {
						text: '',
						subtext: '',
						x: 'center',
						textStyle: {
							color: "#fff",
							fontFamily: '等线',
							fontSize: 18
						},
						subtextStyle: {
							fontSize: 15,
							fontFamily: '等线'
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: function(params) {
							var toolTiphtml = ''
							for(var i = 0; i < data.length; i++) {
								if(params.name == data[i].name) {
									toolTiphtml +=data[i].name + '<br>'
										toolTiphtml += "产能:" + data[i].value + "<br>";
								}
							}
							return toolTiphtml;
						}
					},
					geo: {
						show: true,
						map: 'china',
						label: {
							normal: {
								show: false
							},
							emphasis: {
								show: false,
							}
						},
						roam: false,
						itemStyle: {
							normal: {
								borderColor: 'rgba(147, 235, 248, 1)',
								borderWidth: 1,
								areaColor: {
									type: 'radial',
									x: 0.5,
									y: 0.5,
									r: 0.8,
									colorStops: [{
										offset: 0,
										color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
									}, {
										offset: 1,
										color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								},
								shadowColor: 'rgba(128, 217, 248, 1)',
								// shadowColor: 'rgba(255, 255, 255, 1)',
								shadowOffsetX: -2,
								shadowOffsetY: 2,
								shadowBlur: 10
							},
							emphasis: {
								areaColor: '#389BB7',
								borderWidth: 0
							}
						},
					},
					series: [{
							name: '散点',
							type: 'effectScatter',
							coordinateSystem: 'geo',
							data: this.convertData(data),
							symbolSize: function(val) {
								var valueArr = [];
								for(var i=0;i<data.length;i++){
									valueArr.push(data[i].value);
								}
								var max = Math.max.apply(null,valueArr);
								return val[2] * 15 / max;
							},
							label: {
								normal: {
									formatter: '{b}',
									position: 'right',
									textStyle: {
                                    color: '#fff'
                               },
									show: true
								},
								emphasis: {
									show: true
								}
							},
							itemStyle: {
								normal: {
									color: '#FFC848',
									shadowBlur: 10,
									shadowColor: 'yellow',
									show: false
								}
							}
						},
						{
							type: 'map',
							map: 'china',
							geoIndex: 0,
							aspectScale: 0.75, //长宽比
							showLegendSymbol: false, // 存在legend时显示
							label: {
								normal: {
									show: true
								},
								emphasis: {
									show: false,
									textStyle: {
										color: '#fff'
									}
								}
							},
							roam: true,
							itemStyle: {
								normal: {
									areaColor: '#031525',
									borderColor: '#3B5077',
								},
								emphasis: {
									areaColor: '#2B91B7'
								}
							},
							animation: false,
							data: data
						},

					]
				}

			}
		},
		created() {
			this._get_listprovince();
			this._get_sales();
			this._get_satisfaction();
			this._get_policybrief();
			this._get_productionmarketingbyprovince();
			this._get_productionmarketing();
		},
		methods: {
			//获取省市分析入口数据
			_get_listprovince() {
				api.get_listprovince({}).then(res => {
					this.listprovince = res.data
				});
			},
			//获取销量排名
			_get_sales() {
				api.get_sales({
					topN: 12,
					type:1,
				}).then(res => {
					this.salesData = res.data
				});
			},
			//获取满意度排名
			_get_satisfaction() {
				api.get_sales({
					topN: 12,
					type:2
				}).then(res => {
					this.satisfactionData = res.data
				});
			},
			//获取政策概要
			_get_policybrief() {
				api.get_policybrief({
					topN: 7,
					type: policybriefType
				}).then(res => {
					this.policybriefData = res.data;
				});
			},
			//获取本年度各省份产销量情况
			_get_productionmarketingbyprovince() {
				api.get_productionmarketingbyprovince({}).then(res => {					
					  var capacityData=res.data;
						for(var i = 0;i<capacityData.length;i++){
							var province_name = capacityData[i].province_name;
							for(var j=0;j<data.length;j++){
								if(province_name.indexOf(data[j].name) > -1){
									data[j].value = capacityData[i].capacity;
								}
							}
						}
					const myChart = this.$refs.myChart;
					/*获取地图数据*/
					myChart.showLoading();
					var geoJson = require("../asset/get/s/chinamap.json");
					var mapFeatures = geoJson.features;
					myChart.hideLoading();
					mapFeatures.forEach(function(v) {
						// 地区名称
						var name = v.properties.name;
						// 地区经纬度
						geoCoordMap[name] = v.properties.cp;

					});
						this.mapOption.series[0].data=this.convertData(data);
						this.mapOption.series[1].data=data;				
					var i = 0;
					var dataLength = data.length;
					setInterval(function() {
						// console.log(opt.data);
						myChart.dispatchAction({
							type: 'highlight',
							name: data[i].name,
						});
						 myChart.dispatchAction({
			                type: 'showTip',
			                seriesIndex:0 ,//第几条series
                			dataIndex: (i) % dataLength,//第几个tooltip
			            });
						setTimeout(function() {
							myChart.dispatchAction({
								type: 'downplay',
								name: data[i].name,
							});
							i++;
							if(i > 30) {
								i = 0
							}
						}, 1000);

					}, 2000);

				});
			},

			convertData(data) {
				var res = [];
				for(var i = 0; i < data.length; i++) {
					var geoCoord = geoCoordMap[data[i].name];
					if(geoCoord) {
						res.push({
							name: data[i].name,
							value: geoCoord.concat(data[i].value),
						});
					}
				}
				return res;
			},
			//获取本年度全国总产销量
			_get_productionmarketing() {
				api.get_productionmarketing({}).then(res => {
					if(typeof(res.data.currentYear) != "undefined"){
						this.theYearProduction = res.data.currentYear.production;
						this.theYearMarkting = res.data.currentYear.marketing;
					}					
					this.option.xAxis.data = res.data.x;
					this.option.series[0].data=res.data.marketingArray;
					this.option.series[1].data=res.data.productionArray;
				});
			},
			goToPage(tflag) {
				this.$router.push({
				  path: '/chain',
				  query: {
					tflag: tflag
				  }
				});
			},
			jumpToXGZC() {
				this.$router.push({
					path: '/xgzc',
					query: {
						type: policybriefType
					}
				});
			},
			jumpToSSFX() {
				this.$router.push({
					path: '/ssfx'
				});
			},
		},
		mounted() {
			var chart;
			const self = this;
			$(".policy-detail-title>a").each(function(index, item) {
				$(item).click(function() {
					if(index == 0) {
						policybriefType = 1;
					} else if(index == 1) {
						policybriefType = 2;
					} else if(index == 2) {
						policybriefType = 3;
					}
					$(".policy-detail-title>a").removeClass("selecteda");
					$(item).addClass("selecteda");
					self._get_policybrief();
				});
			});

		}
	}
</script>

<style scoped>
	.china-map .echarts {
		width: 100%;
		height: 580px;
		margin-left: -2%;
		margin-top: 2%;
	}
	
	.line-map-sty .echarts {
		width: 100%;
		height: 280px;
		margin-left: -2%;
		margin-top: 2%;
	}
	
	.line-map-sty {
		padding: 1px 20px 20px 20px;
	}
	a{
		cursor: pointer;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin: 0 auto;
		width: 100%;
	}
	
	.main-width {
		width: 1200px;
	}
	
	.header {
		width: 100%;
		height: 670px;
		background-image: url(../assets/BG.svg);
	}
	
	.header-main {
		margin: 0 auto;
	}
	
	.header-nav {
		height: 70px;
		width: 100%;
	}
	
	.header-map {
		height: 600px;
		width: 100%;
		display: flex;
	}
	
	.logo {
		line-height: 70px;
		float: left;
	}
	
	.header-nav-nav {
		float: left;
		width: 500px;
		display: flex;
		margin-left: 80px;
	}
	
	.header-nav-nav-item {
		flex: 1;
		line-height: 70px;
	}
	
	.header-nav-nav-item a {
		color: #FFFFFF;
		text-decoration: none;
		font-size: 14px;
	}
	
	.china-map {
		flex: 79;
	}
	
	.line-map {
		flex: 41;
	}
	
	.line-map-map {
		opacity: 0.96;
		background: #FFFFFF;
		border-radius: 6px;
		width: 100%;
		height: 380px;
		margin-top: 60px;
	}
	
	.line-map-entry {
		background: #9AFFFF;
		box-shadow: 0 4px 8px 0 rgba(23, 177, 166, 0.69);
		border-radius: 4px;
		margin-top: 30px;
		height: 50px;
		width: 100%;
		line-height: 50px;
		font-size: 16px;
		color: #17AAA8;
		text-align: center;
	}
	
	.line-map-entry span {
		margin-left: 5px;
	}
	
	.line-map-entry img {
		/*margin-bottom: 10px;*/
	}
	
	.line-map-map-title {
		display: flex;
	}
	
	.line-map-map-title-left {
		flex: 1;
		margin-top: 25px;
	}
	
	.line-map-title {
		font-size: 14px;
		color: #999999;
	}
	
	.line-map-num {
		font-size: 28px;
		color: #28DCDB;
	}
	
	.line-map-num1 {
		font-size: 28px;
		color: #F17C69;
	}
	
	.insdutry {
		width: 100%;
		height: 412px;
	}
	
	.insdutry-main {
		text-align: center;
		margin: 0 auto;
	}
	
	.insdutry-title {
		font-size: 30px;
		color: #333333;
		margin-top: 88px;
		line-height: 42px;
		height: 42px;
	}
	
	.insdutry-detail {
		font-size: 20px;
		color: #999999;
		line-height: 28px;
		height: 28px;
		margin-top: 10px;
	}
	
	.insdutry-img {
		width: 100%;
	}
	
	.insdutry-img-item {
		float: left;
		transition-duration: 0.3s;
		transition-property: transform;
		position: relative;
		transform-style: preserve-3d;
	}
	.insdutry-img-item div{
		margin: 0 auto;
		z-index: 100px;
		position: absolute;
		font-size: 24px;
        color: #FFFFFF;
        top:125px;
        width: 370px;
        transform:translateZ(50px)
	}
	
	.insdutry-img-item div::before{
		transform: translateY(-5px);
	}
	.insdutry-img-item :hover {
		cursor: pointer;
		transform: translateY(-5px);
	}
	.insdutry-img-item :hover div{
		transform: translateY(-5px);
	}
	
	.insdutry-img-item ::before {
		background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
		height: 10px;
		width: 100px;
		opacity: 0;
		position: absolute;
		content: '';
		z-index: -1;
		top: 100%;
		left: 0%;
		transition-duration: 0.3s;
		transition-property: transform, opacity;
	}
	
	.insdutry-img-item:hover::before {
		opacity: 1;
		transform: translateY(5px);
	}
	
	.insdutry-img-item img {
		width: 370px;
		height: 200px;
		margin-top: 50px;
	}
	
	.policy {
		width: 100%;
		height: 520px;
		background-color: #F6F6F6;
	}
	
	.policy-detail {
		width: 580px;
		height: 320px;
		background-color: #FFFFFF;
		float: left;
		margin-top: 100px;
		border-radius: 8px;
		/*box-shadow:-3px 3px 3px #d6d6d6;*/
		-webkit-box-shadow: #d6d6d6 0px 0px 10px;
		-moz-box-shadow: #d6d6d6 0px 0px 10px;
		box-shadow: #d6d6d6 0px 0px 10px;
	}
	
	.more {
		font-size: 14px;
		color: #999999;
		float: right;
		margin-right: 16px;
		cursor: pointer;
	}
	
	.policy-detail-title {
		text-align: left;
		height: 50px;
		line-height: 50px;
		padding-left: 8px;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.policy-detail-title span {
		font-size: 18px;
		color: #333333;
	}
	
	.policy-detail-title a {
		font-size: 18px;
		color: #999999;
		margin-right: 15px;
	}
	/*.policy-detail-title button:focus{
		color: #38CAC1 !important;
		display: inline-block;
		line-height: 49px;
		height: 49px;
		border-bottom: 2px solid #38CAC1;
	}*/
	
	.selecteda {
		color: #38CAC1 !important;
		display: inline-block;
		line-height: 49px;
		height: 49px;
		border-bottom: 2px solid #38CAC1!important;
	}
	
	.policy-detail-but {
		width: 100%;
		height: 268px;
		/*padding-left: 19px;*/
	}
	
	.policy-detail-but button {
		border: 1px solid #CCCCCC;
		border-radius: 2px;
		width: 94px;
		height: 32px;
		background-color: #FFFFFF;
		float: left;
		margin-top: 10px;
		margin-left: 18px;
		font-size: 14px;
		color: #CCCCCC;
		outline: 0 none !important;
		cursor: pointer;
		blr: expression(this.onFocus=this.blur());
	}
	
	.policy-detail-but button:hover {
		background: #8CCAC6 !important;
		border-radius: 2px;
		color: #FFFFFF !important;
	}
	
	.policy-detail-but button:focus {
		background: #8CCAC6 !important;
		border-radius: 2px;
		border: none;
		color: #FFFFFF !important;
	}
	
	.advert img {
		width: 100%;
		height: 120px;
		background: url(../assets/adv.png);
	}
	
	.top10 {
		height: 800px;
		width: 1200px;
		margin: 0 auto;
	}
	
	.top10-main-detail {
		width: 580px;
		height: auto;
		float: left;
		margin-top: 96px;
	}
	
	.marwidth {
		margin-left: 40px;
	}
	
	.marright {
		margin-right: 45px;
	}
</style>