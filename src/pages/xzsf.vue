<template>
	<div>
		<Header v-bind:currentPageIndex="currentPageIndex" style="margin-bottom: 60px;"></Header>
		<div class="xzsf_mainContent">
			<div class="xzsf_leftNav">
				<Left v-bind:tabs="tabs" @transferTflag="getTflag"></Left>
			</div>
			<div class="xzsf_rightContent">
				<div class="xzsf_year_header">
					<select class="xzsf_year_select" @change="changeYear">
						<option v-for="year in yearsArray" :key="year">{{year}}年</option>
					</select>
				</div>
				<div class="xzsf_mapContainer" id="map">
					<chart ref="mapChart" class="xzsf_mapDiv" :options="mapOption" :auto-resize="true" @click="onClick" @mouseover="onMousover" @mouseout="onMouseout"></chart>
				</div>
				<div class="xzsf_contentInfo">
					<div class="xzsf_infoTitle">{{infoTitle}}</div>
					<div class="xzsf_infoDesc">{{infoDesc}}</div>
					<table class="xzsf_table">
						<thead>
							<tr>
								<th>市</th>
								<th>企业</th>
								<th>产能（万台）</th>
								<th>投资金额（亿元）</th>
								<th>汇总</th>
							</tr>
						</thead>
						<tbody>
							<template v-for="(item,itemIndex) in listenterprise">
								<tr v-for="(child,childIndex) in item.enterpriseList" :class="(itemIndex%2==0)?'bgColorOne':'bgColorTwo'">
									<td :rowspan="item.enterpriseList.length" :class="(childIndex==0)?'':'hidden'">{{item.city_name}}</td>
									<td>{{child.name}}</td>
									<td>{{child.capacity}}</td>
									<td>{{child.investment_amount}}</td>
									<td :class="(itemIndex==0 && childIndex==0)?'':'hidden'" class="bgColorOne" :rowspan="amountNum">{{investment_amount_num}}</td>
								</tr>
							</template>
						</tbody>
					</table>
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
				tflag:'xzsf',
				listprovince:[],
				selectProvinceId:1,
				listenterprise:[],
				yearsArray:[],
				theYear:'',
				infoTitle:'',
				infoDesc:'',
				amountNum:0,
				investment_amount_num:0,
				tabs: [{
						title: "运行情况",
						iscurrent:true,
						children: [{title: "行政省份", tflag: "xzsf",iscurrent:true}, {title: "产业集群", tflag: "cyjq",iscurrent:false},
									{title: "企业&车型排名", tflag: "xzsf",iscurrent:false}]
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
							color: ['#cccccc', '#3574c8', '#479fd2', '#fba853', '#48c7c0', '#fa8737', '#ffc188', '#4bbdd6']
						}
						//北京：1      四川：2    河南：3     内蒙：4     安徽：5    新疆：6     福建：7 
					},
					geo: {
						map: 'china',
						zoom: 1.1,
						label: {
							normal: {
								show: true,
								color: '#fff'
							},
							emphasis: {
								show: true,
								color: '#fff'
							}
						},
						itemStyle: {
							normal: {
								areaColor: '#ccc',
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
						data: [{name: '北京',value: 0}, {name: '天津',value: 0}, {name: '河北',value: 0}, {name: '重庆',value: 0}, 
								{name: '云南',value: 0}, {name: '贵州',value: 0}, {name: '四川',value: 0}, {name: '河南',value: 0}, 
								{name: '山东',value: 0},{name: '辽宁',value: 0}, {name: '黑龙江',value: 0}, {name: '内蒙古',value: 0},
								{name: '吉林',value: 0},{name: '湖南',value: 0}, {name: '安徽',value: 0}, {name: '浙江',value: 0}, 
								{name: '江西',value: 1}, {name: '湖北',value: 0}, {name: '江苏',value: 0}, {name: '新疆',value: 0}, 
								{name: '甘肃',value: 0}, {name: '山西',value: 0}, {name: '青海',value: 0}, {name: '陕西',value: 0}, 
								{name: '宁夏',value: 0},{name: '广西',value: 0},  {name: '福建',value: 0},  {name: '广东',value: 0}, 
								{name: '海南',value: 0}, {name: '上海',value: 0}, {name: '西藏',value: 0}, {name: '台湾',value: 0}, 
								{name: '香港',value: 0}, {name: '澳门',value: 0}, {name: '南海诸岛',value: 0}]
					}]
				},
			};
		},
		created() {
			this._getOverviewListyearinenterprise();
			this._getIndexListprovince();	
		},
		methods:{
			getTflag(tflag){
				this.tflag=tflag;
				this.$router.push({
					path: '/' + tflag
				});
			},
			_getOverviewListyearinenterprise() {
				api.overviewListyearinenterprise({}).then(res => {
					var data = res.data.data;
					this.yearsArray = data;
					this.theYear = this.yearsArray[0];
					this._getEnterpriseListenterprise();
				});
			},
			_getIndexListprovince(){
				api.get_listprovince({}).then(res => {
					this.listprovince = res.data;
					var provinceArr = [];
					for (var i = 0;i<this.listprovince.length;i++) {
						provinceArr.push(this.listprovince[i].name);
					}
					for (var i=0;i<this.mapOption.series[0].data.length;i++) {
						this.mapOption.series[0].data[i].value = 0;
						for(var j = 0;j<provinceArr.length;j++){
							if(provinceArr[j].indexOf(this.mapOption.series[0].data[i].name) > -1){
								this.mapOption.series[0].data[i].value = 2;
							}
						}
						if(provinceArr[0].indexOf(this.mapOption.series[0].data[i].name) > -1){
							this.mapOption.series[0].data[i].value = 1;
						}
					}
					for (var i = 0;i<this.listprovince.length;i++) {
						if (this.selectProvinceId == this.listprovince[i].id) {
							this.infoTitle = this.listprovince[i].name;
							this.infoDesc = this.listprovince[i].summary;
						}						
					}
				});
			},
			_getEnterpriseListenterprise(){
				for (var i = 0;i<this.listprovince.length;i++) {
					if (this.selectProvinceId == this.listprovince[i].id) {
						this.infoTitle = this.listprovince[i].name;
						this.infoDesc = this.listprovince[i].summary;
					}
				}
				api.get_enterpriseListenterprise({
					province_id:this.selectProvinceId,
					year:this.theYear
				}).then(res => {
					this.amountNum = 0;
					this.investment_amount_num = 0;
					this.listenterprise = res.data;
					for (var i = 0;i<this.listenterprise.length;i++) {
						this.amountNum += this.listenterprise[i].enterpriseList.length;
						for (var j=0;j<this.listenterprise[i].enterpriseList.length;j++) {
							if (typeof(this.listenterprise[i].enterpriseList[j].investment_amount)!="undefined") {
								this.investment_amount_num += this.listenterprise[i].enterpriseList[j].investment_amount;
							} 							
						}
					}
				});
			},
			changeYear(event) {
				this.theYear = event.target.value.substring(0, 4);	
				this._getEnterpriseListenterprise();
			},
			onClick(event, instance, echarts){
				var clickName = event.name;	
				var provinceArr = [];
				for (var i = 0;i<this.listprovince.length;i++) {
					provinceArr.push(this.listprovince[i].name);
				}
				for(var i = 0;i<provinceArr.length;i++){
					if(provinceArr[i].indexOf(clickName) > -1){
						this.selectProvinceId = this.listprovince[i].id;
						this._getEnterpriseListenterprise();
						for (var i=0;i<this.mapOption.series[0].data.length;i++) {
							this.mapOption.series[0].data[i].value = 0;
							for(var j = 0;j<provinceArr.length;j++){
								if(provinceArr[j].indexOf(this.mapOption.series[0].data[i].name) > -1){
									this.mapOption.series[0].data[i].value = 2;
								}
							}
							if(this.mapOption.series[0].data[i].name == clickName){
								this.mapOption.series[0].data[i].value = 1;
							}
						}
					}
				}				
			},
			onMousover(event, instance,echarts){
				const mapChart = this.$refs.mapChart;
				mapChart.dispatchAction({
					type: 'downplay',
					name: event.name,
				});
			},
			onMouseout(event, instance,echarts){
				const mapChart = this.$refs.mapChart;
				mapChart.dispatchAction({
					type: 'downplay',
					name: event.name,
				});
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
	.hidden{
		display: none;
	}
	.xzsf_mainContent{
		width: 1200px;	
		margin: 0 auto;
		text-align: right;
	}
	.xzsf_leftNav{
		width: 220px;
		text-align: left;
	}
	.xzsf_rightContent{
		display: inline-block;
		width: 960px;
		margin-left: 20px;
		background: #FFFFFF;
		text-align: left;
	}
	.xzsf_mapContainer{
		width: 960px;
		height: 610px;
		text-align: left;
	}
	.xzsf_year_header{
		width: 100%;
		height: 50px;
		margin-top: 50px;
		position: relative;
	}
	.xzsf_year_select{
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
	.xzsf_contentInfo{
		width: 960px;
	}
	.xzsf_mapDiv{
		width: 100% !important;
		height: 100% !important;
	}
	.xzsf_infoTitle{
		width: 100%;
		height: 28px;
		line-height: 28px;
		font-family: PingFangSC-Semibold;
		font-size: 20px;
		color: #333333;
		text-align: center;
		margin-bottom: 20px;
	}
	.xzsf_infoDesc{
		width: 820px;
		line-height: 20px;
		margin: 0 auto;
		font-family: PingFang-SC-Regular;
		font-size: 16px;
		color: #333333;
	}
	.xzsf_table{
		width: 820px;
		margin: 0 auto;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.xzsf_table>thead>tr{
		height: 40px;
		background: #6CA6DE;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #FFFFFF;
		text-align: center;
	}
	.xzsf_table>tbody>tr{
		height: 40px;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #333333;
		text-align: center;
	}
	.bgColorOne{
		background: #F3F9FF !important;
	}
	.bgColorTwo{
		background: #E4F2FF !important;
	}
</style>
