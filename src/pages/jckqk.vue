<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 60px;"></Header>
		<div class="jckqk_mainContent">
			<div class="jckqk_leftNav">
				<Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
			</div>
			<div class="jckqk_rightContent">
				<div class="jckqk_year_header">
					<div class="jckqk_header_title">
						年度新能源汽车出口情况
					</div>
					<select class="jckqk_year_select" @change="changeYear">
						<option v-for="year in yearsArray" :key="year">{{year}}年</option>
					</select>
				</div>
				<div class="jckqk_mapChartDiv">
					<chart ref="mapChart" class="jckqk_chartDiv" :options="mapOption" :auto-resize="true"></chart>
				</div>
				<div class="jckqk_analysis">
					<div class="jckqk_analysis_title">分析总结</div>
					<div class="jckqk_analysis_time">更新时间：{{updateTime}}</div>
					<div class="jckqk_analysis_content"></div>
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
				tflag:'jckqk',
				yearsArray:[],
				theYear:'',
				updateTime:'',
				tabs: [{
						title: "运行情况",
						iscurrent:false,
						children: [{title: "行政省份", tflag: "xzsf",iscurrent:false}, {title: "产业集群", tflag: "cyjq",iscurrent:false},
									{title: "企业&车型排名", tflag: "qycxpm",iscurrent:false}]
				}, {
						title: "供求情况",
						iscurrent:true,
						children: [{title: "国内产销情况", tflag: "gncxqk",iscurrent:false}, {title: "进出口情况", tflag: "jckqk",iscurrent:true},
						{title: "市场供需预测", tflag: "scgxyc",iscurrent:false}]
				},{
						title: "用户群体",
						iscurrent:false,
						children: [{title: "用户偏爱车型", tflag: "yhpacx",iscurrent:false}]
				}],
				mapOption:{
					backgroundColor: '#000',
					tooltip: {
						trigger: "item",
						backgroundColor: "#1540a1",
						borderColor: "#FFFFCC",
						showDelay: 0,
						hideDelay: 0,
						enterable: true,
						transitionDuration: 0,
						extraCssText: "z-index:100",
						formatter: function(params, ticket, callback) {
							//根据业务自己拓展要显示的内容
							var res = "";
							var name = params.name;
							var value = params.value[params.seriesIndex + 1];
							res =
								"<span style='color:#fff;'>" +
								name +
								"</span><br/>数据：" +
								value;
							return res;
						}
					},
					visualMap: {
						//图例值控制
						min: 0,
						max: 10000,
						show: false,
						calculable: true,
						color: ["#0bc7f3"],
						textStyle: {
							color: "#fff"
						},

					},
					geo: {
						map: "world",
						label: {
							emphasis: {
								show: false
							}
						},
						roam: false, //是否允许缩放
						layoutCenter: ["50%", "50%"], //地图位置
						layoutSize: "180%",
						itemStyle: {
							normal: {
								color: "#04284e", //地图背景色
								borderColor: "#5bc1c9" //省市边界线
							},
							emphasis: {
								color: "rgba(37, 43, 61, .5)" //悬浮背景
							}
						}
					},

					series: []
				},
			};
		},
		mounted() {
						
		},
		created() {
			this.getOverviewListyear2();
		},
		methods:{
			getTflag(tflag){
				this.tflag=tflag;
				this.$router.push({
					path: '/' + tflag
				});
			},
			getOverviewListyear2() {
				api.get_overviewListyear2({}).then(res => {
					var data = res.data;
					this.yearsArray = data;
					this.theYear = this.yearsArray[0];
					this.getOverviewJckqkfx();
				});
			},
			getOverviewJckqkfx() {
				api.get_overviewJckqkfx({
					year:this.theYear
				}).then(res => {
					var data = res.data;
					this.updateTime = data.conclusion.update_datetime;
					$(".jckqk_analysis_content").empty().append(data.conclusion.content);
					var bjData = [];
					for (var i = 0;i<data.all.length;i++) {
						bjData.push([{
							name: data.all[i].country,
							value: data.all[i].ratio
						}, {
							name: "中国"
						}])
					}
					var geoCoordMap = {"阿富汗": [69.11, 34.28],"阿尔巴尼亚": [19.49, 41.18],"阿尔及利亚": [3.08, 36.42],"美属萨摩亚": [-170.43, -14.16],"安道尔": [1.32, 42.31],"安哥拉": [13.15, -8.50],"安提瓜和巴布达": [-61.48, 17.20],
						"阿根廷": [-60.00, -36.30],"亚美尼亚": [44.31, 40.10],"阿鲁巴": [-70.02, 12.32],"澳大利亚": [149.08, -35.15],"奥地利": [16.22, 48.12],"阿塞拜疆": [49.56, 40.29],"巴哈马": [-77.20, 25.05],
						"巴林": [50.30, 26.10],"孟加拉国": [90.26, 23.43],"巴巴多斯": [-59.30, 13.05],"白俄罗斯": [27.30, 53.52],"比利时": [4.21, 50.51],"伯利兹": [-88.30, 17.18],"贝宁": [2.42, 6.23],"不丹": [89.45, 27.31],
						"玻利维亚": [-68.10, -16.20],"波斯尼亚和黑塞哥维那": [18.26, 43.52],"博茨瓦纳": [25.57, -24.45],"巴西": [-47.55, -15.47],"英属维尔京群岛": [-64.37, 18.27],"文莱": [115.00, 4.52],"保加利亚": [23.20, 42.45],
						"布基纳法索": [-1.30, 12.15],"布隆迪": [29.18, -3.16],"柬埔寨": [104.55, 11.33],"喀麦隆": [11.35, 3.50],"加拿大": [-75.42, 45.27],"佛得角": [-23.34, 15.02],"开曼群岛": [-81.24, 19.20],
						"中非共和国": [18.35, 4.23],"乍得": [14.59, 12.10],"智利": [-70.40, -33.24],"中国": [116.20, 39.55],"哥伦比亚": [-74.00, 4.34],"科摩罗": [43.16, -11.40],"刚果": [15.12, -4.09],"哥斯达黎加": [-84.02, 9.55],
						"科特迪瓦": [-5.17, 6.49],"克罗地亚": [15.58, 45.50],"古巴": [-82.22, 23.08],"塞浦路斯": [33.25, 35.10],"捷克共和国": [14.22, 50.05],"朝鲜": [125.30, 39.09],"刚果(扎伊尔)": [15.15, -4.20],
						"丹麦": [12.34, 55.41],"吉布提": [42.20, 11.08],"多米尼加": [-61.24, 15.20],"多米尼加共和国": [-69.59, 18.30],"东帝汶": [125.34, -8.29],"厄瓜多尔": [-78.35, -0.15],"埃及": [31.14, 30.01],"萨尔瓦多": [-89.10, 13.40],
						"赤道几内亚": [8.50, 3.45],"厄立特里亚": [38.55, 15.19],"爱沙尼亚": [24.48, 59.22],"埃塞俄比亚": [38.42, 9.02],"福克兰群岛(马尔维纳斯群岛)": [-59.51, -51.40],"法罗群岛": [-6.56, 62.05],"斐济": [178.30, -18.06],
						"芬兰": [25.03, 60.15],"法国": [2.20, 48.50],"法属圭亚那": [-52.18, 5.05],"法属波利尼西亚": [-149.34, -17.32],"加蓬": [9.26, 0.25],"冈比亚": [-16.40, 13.28],"格鲁吉亚": [44.50, 41.43],"德国": [13.25, 52.30],
						"加纳": [-0.06, 5.35],"希腊": [23.46, 37.58],"格陵兰": [-51.35, 64.10],"瓜德罗普岛": [-61.44, 16.00],"危地马拉": [-90.22, 14.40],"根西岛": [-2.33, 49.26],"几内亚": [-13.49, 9.29],"几内亚比绍": [-15.45, 11.45],
						"圭亚那": [-58.12, 6.50],"海地": [-72.20, 18.40],"赫德岛和麦当劳群岛": [74.00, -53.00],"洪都拉斯": [-87.14, 14.05],"匈牙利": [19.05, 47.29],"冰岛": [-21.57, 64.10],"印度": [77.13, 28.37],"印度尼西亚": [106.49, -6.09],
						"伊朗": [51.30, 35.44],"伊拉克": [44.30, 33.20],"爱尔兰": [-6.15, 53.21],"以色列": [35.12, 31.47],"意大利": [12.29, 41.54],"牙买加": [-76.50, 18.00],"约旦": [35.52, 31.57],"哈萨克斯坦": [71.30, 51.10],
						"肯尼亚": [36.48, -1.17],"基里巴斯": [173.00, 1.30],"科威特": [48.00, 29.30],"吉尔吉斯斯坦": [74.46, 42.54],"老挝": [102.36, 17.58],"拉脱维亚": [24.08, 56.53],"黎巴嫩": [35.31, 33.53],"莱索托": [27.30, -29.18],
						"利比里亚": [-10.47, 6.18],"阿拉伯利比亚民众国": [13.07, 32.49],"列支敦士登": [9.31, 47.08],"立陶宛": [25.19, 54.38],"卢森堡": [6.09, 49.37],"马达加斯加": [47.31, -18.55],"马拉维": [33.48, -14.00],
						"马来西亚": [101.41, 3.09],"马尔代夫": [73.28, 4.00],"马里": [-7.55, 12.34],"马耳他": [14.31, 35.54],"马提尼克岛": [-61.02, 14.36],"毛里塔尼亚": [57.30, -20.10],"马约特岛": [45.14, -12.48],"墨西哥": [-99.10, 19.20],
						"密克罗尼西亚(联邦) ": [158.09, 6.55],"摩尔多瓦共和国": [28.50, 47.02],"莫桑比克": [32.32, -25.58],"缅甸": [96.20, 16.45],"纳米比亚": [17.04, -22.35],"尼泊尔": [85.20, 27.45],"荷兰": [4.54, 52.23],
						"荷属安的列斯": [-69.00, 12.05],"新喀里多尼亚": [166.30, -22.17],"新西兰": [174.46, -41.19],"尼加拉瓜": [-86.20, 12.06],"尼日尔": [2.06, 13.27],"尼日利亚": [7.32, 9.05],"诺福克岛": [168.43, -45.20],
						"北马里亚纳群岛": [145.45, 15.12],"挪威": [10.45, 59.55],"阿曼": [58.36, 23.37],"巴基斯坦": [73.10, 33.40],"帕劳": [134.28, 7.20],"巴拿马": [-79.25, 9.00],"巴布亚新几内亚": [147.08, -9.24],"巴拉圭": [-57.30, -25.10],
						"秘鲁": [-77.00, -12.00],"菲律宾": [121.03, 14.40],"波兰": [21.00, 52.13],"葡萄牙": [-9.10, 38.42],"波多黎各": [-66.07, 18.28],"卡塔尔": [51.35, 25.15],"韩国": [126.58, 37.31],"罗马尼亚": [26.10, 44.27],
						"俄罗斯": [37.35, 55.45],"卢旺达": [30.04, -1.59],"圣基茨和尼维斯": [-62.43, 17.17],"圣卢西亚": [-60.58, 14.02],"圣皮埃尔和密克隆": [-56.12, 46.46],"圣文森特和格林纳丁斯": [-61.10, 13.10],"萨摩亚": [-171.50, -13.50],
						"圣马力诺": [12.30, 43.55],"圣多美和普林西比": [6.39, 0.10],"沙特阿拉伯": [46.42, 24.41],"塞内加尔": [-17.29, 14.34],"塞拉利昂": [-13.17, 8.30],"斯洛伐克": [17.07, 48.10],"斯洛文尼亚": [14.33, 46.04],
						"所罗门群岛": [159.57, -9.27],"索马里": [45.25, 2.02],"比勒陀利亚": [28.12, -25.44],"西班牙": [-3.45, 40.25],"苏丹": [32.35, 15.31],"苏里南": [-55.10, 5.50],"斯威士兰": [31.06, -26.18],"瑞典": [18.03, 59.20],
						"瑞士": [7.28, 46.57],"阿拉伯叙利亚共和国": [36.18, 33.30],"塔吉克斯坦": [68.48, 38.33],"泰国": [100.35, 13.45],"马其顿": [21.26, 42.01],"多哥": [1.20, 6.09],"汤加": [-174.00, -21.10],"突尼斯": [10.11, 36.50],
						"土耳其": [32.54, 39.57],"土库曼斯坦": [57.50, 38.00],"图瓦卢": [179.13, -8.31],"乌干达": [32.30, 0.20],"乌克兰": [30.28, 50.30],"阿联酋": [54.22, 24.28],"英国": [-0.05, 51.36],"坦桑尼亚": [35.45, -6.08],
						"美国": [-77.02, 39.91],"美属维尔京群岛": [-64.56, 18.21],"乌拉圭": [-56.11, -34.50],"乌兹别克斯坦": [69.10, 41.20],"瓦努阿图": [168.18, -17.45],"委内瑞拉": [-66.55, 10.30],"越南": [105.55, 21.05],
						"南斯拉夫": [20.37, 44.50],"赞比亚": [28.16, -15.28],"津巴布韦": [31.02, -17.43]};
					var convertData = function(data) {
						var res = [];
						for (var i = 0; i < data.length; i++) {
							var dataItem = data[i];
							var toCoord = geoCoordMap[dataItem[0].name];
							var fromCoord = geoCoordMap[dataItem[1].name];
							if (fromCoord && toCoord) {
								res.push([{
										coord: fromCoord,
										value: dataItem[0].value
									},
									{
										coord: toCoord
									}
								]);
							}
						}
						return res;
					};
					var series = [];
					[["中国", bjData]].forEach(function(item, i) {
						series.push({
								type: "lines",
								zlevel: 2,
								effect: {
									show: true,
									period: 4, //箭头指向速度，值越小速度越快
									trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
									symbol: "arrow", //箭头图标
									symbolSize: 5 //图标大小
								},
								lineStyle: {
									normal: {
										width: 1, //尾迹线条宽度
										opacity: 0, //尾迹线条透明度
										curveness: 0.3 //尾迹线条曲直度
									}
								},

								data: convertData(item[1])
							}, {
								type: "effectScatter",
								coordinateSystem: "geo",
								zlevel: 2,
								rippleEffect: {
									//涟漪特效
									period: 4, //动画时间，值越小速度越快
									brushType: "stroke", //波纹绘制方式 stroke, fill
									scale: 4 //波纹圆环最大限制，值越大波纹越大
								},
								label: {
									normal: {
										show: true,
										position: "right", //显示位置
										offset: [5, 0], //偏移设置
										formatter: "{b}" //圆环显示文字
									},
									emphasis: {
										show: true
									}
								},
								symbol: "circle",
								symbolSize: function(val) {
									return 4 + val[2] / 1000; //圆环大小
								},
								itemStyle: {
									normal: {
										show: false,
									}
								},
								data: item[1].map(function(dataItem) {
									return {
										name: dataItem[0].name,
										value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
									};
								})
							},
							//被攻击点
							{
								type: "scatter",
								coordinateSystem: "geo",
								zlevel: 2,
								rippleEffect: {
									period: 4,
									brushType: "stroke",
									scale: 4
								},
								label: {
									normal: {
										show: true,
										position: "right",
										color: "#00ffff",
										formatter: "{b}",
										textStyle: {
											color: "#0bc7f3"
										}
									},
									emphasis: {
										show: true
									}
								},
								symbol: "pin",
								symbolSize: 30,
								itemStyle: {
									normal: {
										show: true,
										color: "#9966cc"
									}
								},
								data: [{
									name: item[0],
									value: geoCoordMap[item[0]].concat([100])
								}]
							}
						);
					});
					this.mapOption.series = series;
				});
			},
			changeYear(event) {
				this.theYear = event.target.value.substring(0, 4);
				this.getOverviewJckqkfx();				
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
	.hidden{
		display: none;
	}
	.jckqk_mainContent{
		width: 1200px;	
		margin: 0 auto;
		text-align: right;
	}
	.jckqk_leftNav{
		width: 220px;
		text-align: left;
	}
	.jckqk_rightContent{
		display: inline-block;
		width: 960px;
		margin-left: 20px;
		background: #FFFFFF;
		text-align: left;
	}
	.jckqk_year_header{
		width: 100%;
		height: 50px;
		margin-top: 50px;
		position: relative;
	}
	.jckqk_header_title{
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
	.jckqk_year_select{
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
	.jckqk_mapChartDiv{
		width: 860px;
		height: 500px;
		margin: 40px 50px 0;
		box-shadow: 0 2px 4px 0 rgba(200,200,200,0.30);
		border-radius: 4px;
	}
	.jckqk_analysis{
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
	.jckqk_analysis_title{
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
	.jckqk_analysis_time{
		width: auto;
		height: 20px;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #999999;
		position: absolute;
		top: 10px;
		right: 13px;
	}
	.jckqk_analysis_content{
		width: 810px;
		height: auto;
		margin: 0 auto;
	}
	.jckqk_chartDiv{
		width: 100% !important;
		height: 100% !important;
	}
</style>
