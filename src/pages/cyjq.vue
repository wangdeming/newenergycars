<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 60px;"></Header>
		<div class="cyjq_mainContent">
			<div class="cyjq_leftNav">
				<Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
			</div>
			<div class="cyjq_rightContent">
				<div class="cyjq_mapContainer" id="map">
					<chart ref="mapChart" class="cyjq_mapDiv" :options="mapOption" :auto-resize="true" @click="onClick" @mouseover="onMousover" @mouseout="onMouseout"></chart>
				</div>
				<div class="cyjq_contentInfo">
					<div class="cyjq_infoTitle">{{infoTitle}}</div>
					<div class="cyjq_infoDesc">{{infoDesc}}</div>
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
		mounted() {
						
		},
		data() {
			return {
				currentPageIndex:2,
				tflag:'cyjq',
				jqSummarys:[],
				jqNames:[],
				selectValue:1,
				selectProvinces:[],
				numberOfCYJQ:0,
				infoTitle:'',
				infoDesc:'',
				tabs: [{
						title: "运行情况",
						iscurrent:true,
						children: [{title: "行政省份", tflag: "xzsf",iscurrent:false}, {title: "产业集群", tflag: "cyjq",iscurrent:true},
									{title: "企业&车型排名", tflag: "qycxpm",iscurrent:false}]
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
				mapOption:{
					visualMap: {
						min: 0,
						max: 7,
						left: 'left',
						top: 'bottom',
						text: ['高', '低'],
						calculable: true,
						show:false,
						inRange: {
							color: ['#cccccc', '#ffc188', '#479fd2', '#fba853', '#48c7c0', '#fa8737', '#4bbdd6', '#ff6f5b']
						}
						//北京：1      四川：2    河南：3     内蒙：4     安徽：5    新疆：6     福建：7 
					},
					 tooltip: {
						show: true,
						formatter: function(params) {
							var res;
							if (params.value > 0) {
								res = params.data.value2;
							} else {
								res = '';
							}
							return res;
						}						
					},
					geo: {
						map: 'china',
						zoom: 1.1,
						label: {
							normal: {
								show: true,
								color: '#333'
							},
							emphasis: {
								show: true,
								color: '#fff'
							}
						},
						itemStyle: {
							normal: {
								areaColor: '#fbfbfb',
								borderColor: '#fff',
							},
							emphasis: {
								areaColor: '#3574c8'
							}
						}
					},
					series: [ {
						type: 'map',
						mapType: 'china',
						geoIndex: 0,
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						},
						data: [{name: '北京',value: 0,value2:''}, {name: '天津',value: 0,value2:''}, {name: '河北',value: 0,value2:''}, {name: '重庆',value: 0,value2:''}, 
								{name: '云南',value: 0,value2:''}, {name: '贵州',value: 0,value2:''}, {name: '四川',value: 0,value2:''}, {name: '河南',value: 0,value2:''}, 
								{name: '山东',value: 0,value2:''},{name: '辽宁',value: 0,value2:''}, {name: '黑龙江',value: 0,value2:''}, {name: '内蒙古',value: 0,value2:''},
								{name: '吉林',value: 0,value2:''},{name: '湖南',value: 0,value2:''}, {name: '安徽',value: 0,value2:''}, {name: '浙江',value: 0,value2:''}, 
								{name: '江西',value: 0,value2:''}, {name: '湖北',value: 0,value2:''}, {name: '江苏',value: 0,value2:''}, {name: '新疆',value: 0,value2:''}, 
								{name: '甘肃',value: 0,value2:''}, {name: '山西',value: 0,value2:''}, {name: '青海',value: 0,value2:''}, {name: '陕西',value: 0,value2:''}, 
								{name: '宁夏',value: 0,value2:''},{name: '广西',value: 0,value2:''},  {name: '福建',value: 0,value2:''},  {name: '广东',value: 0,value2:''}, 
								{name: '海南',value: 0,value2:''}, {name: '上海',value: 0,value2:''}, {name: '西藏',value: 0,value2:''}, {name: '台湾',value: 0,value2:''}, 
								{name: '香港',value: 0,value2:''}, {name: '澳门',value: 0,value2:''}, {name: '南海诸岛',value: 0,value2:''}]
					}]
				},
			};
		},
		created() {
			this._clusterList();
		},
		methods:{
			getTflag(tflag){
				this.tflag=tflag;
				this.$router.push({
					path: '/' + tflag
				});
			},
			_clusterList(){			
				api.get_clusterList({}).then(res => {						
					var data = res.data;					
					this.jqSummarys = [];
					this.jqNames = [];
					this.numberOfCYJQ = data.length;
					this.selectProvinces = [];
					this.infoTitle = typeof(data[0].name)=="undefined"?'':data[0].name;
					this.infoDesc = typeof(data[0].summary)=="undefined"?'':data[0].summary;
					for (var i = 0;i<data.length;i++) {
						this.jqSummarys.push(typeof(data[i].summary)=="undefined"?'':data[i].summary);
						this.jqNames.push(typeof(data[i].name)=="undefined"?'':data[i].name);
						for (var j = 0;j<data[i].provinceList.length;j++) {
							if(data[i].provinceList[j] != null){
								var province = data[i].provinceList[j].name;							
								for (var x = 0;x<this.mapOption.series[0].data.length;x++) {
									if(province.indexOf(this.mapOption.series[0].data[x].name) > -1){
										this.mapOption.series[0].data[x].value = (i+1);
										this.mapOption.series[0].data[x].value2 = data[i].name;
									}
									if(i == 0 && province.indexOf(this.mapOption.series[0].data[x].name) > -1){
										this.selectProvinces.push(this.mapOption.series[0].data[x].name);
									}
								}
							}							
						}
					}
				}).then(res => {
					this.$nextTick(() => {
						const mapChart = this.$refs.mapChart;
						for (var i = 0;i<this.selectProvinces.length;i++) {
							mapChart.dispatchAction({
								type: 'highlight',
								name: this.selectProvinces[i],
							});
						}
					});					
				});				
			},
			onClick(event, instance, echarts){
				var clickValue = event.value;
				if(this.selectValue == clickValue || clickValue == 0){
					return false;
				}else{
					this.selectValue = clickValue;
					const mapChart = this.$refs.mapChart;
					for (var i = 0;i<this.selectProvinces.length;i++) {
						mapChart.dispatchAction({
							type: 'downplay',
							name: this.selectProvinces[i],
						});
					}
					this.selectProvinces = [];
					for (var i = 0;i<this.mapOption.series[0].data.length;i++) {
						if(this.selectValue == this.mapOption.series[0].data[i].value){
							this.selectProvinces.push(this.mapOption.series[0].data[i].name);
						}
					}
					for (var i = 0;i<this.selectProvinces.length;i++) {
						mapChart.dispatchAction({
							type: 'highlight',
							name: this.selectProvinces[i],
						});
					}
					this.infoTitle = this.jqNames[this.selectValue - 1];
					this.infoDesc = this.jqSummarys[this.selectValue - 1];
				}
			},
			onMousover(event, instance,echarts){
				const mapChart = this.$refs.mapChart;
				mapChart.dispatchAction({
					type: 'downplay',
					name: event.name,
				});
				for (var i = 0;i<this.selectProvinces.length;i++) {
					mapChart.dispatchAction({
						type: 'highlight',
						name: this.selectProvinces[i],
					});
				}
			},
			onMouseout(event, instance,echarts){
				const mapChart = this.$refs.mapChart;
				mapChart.dispatchAction({
					type: 'downplay',
					name: event.name,
				});
				for (var i = 0;i<this.selectProvinces.length;i++) {
					mapChart.dispatchAction({
						type: 'highlight',
						name: this.selectProvinces[i],
					});
				}
			}
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
	.cyjq_mainContent{
		width: 1200px;
		height: auto;		
		margin: 0 auto;
		text-align: right;
	}
	.cyjq_leftNav{
		width: 220px;
		height: auto;
		text-align: left;
	}
	.cyjq_rightContent{
		display: inline-block;
		width: 960px;
		height: 920px;
		margin-left: 20px;
		background: #FFFFFF;
		text-align: left;
	}
	.cyjq_mapContainer{
		width: 960px;
		height: 610px;
	}
	.cyjq_contentInfo{
		width: 960px;
		height: 310px;
	}
	.cyjq_mapDiv{
		width: 100% !important;
		height: 100% !important;
	}
	.cyjq_infoTitle{
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-family: PingFangSC-Semibold;
		font-size: 20px;
		color: #333333;
		margin-bottom: 20px;
	}
	.cyjq_infoDesc{
		width: 820px;
		height: 220px;
		line-height: 22px;
		font-family: PingFang-SC-Regular;
		font-size: 16px;
		color: #333333;
		margin: 0 auto;
	}
</style>
