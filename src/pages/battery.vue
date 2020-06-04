<template>
    <div>
        <div class="row">
            <div class="my-col-lg-5">
                <img src="../assets/batterypic@2x.png" class="img-fluid"/>
            </div>
            <div class="my-col-lg-7">
                <div class="rcon">
                    动力电池是指为交通运输工具提供动力的电池，一般是相对于为便携式电子设备提供能量的小型电池而言。根据电池反应原理的不同可分为铅酸动力电池、镍氢动力电池、锂离子动力电池等等。
                </div>
            </div>
        </div>
        <div class="row mt60">
            <p class="mytitle">动力电池产销量及分布</p>
            <select class="form-control yearsel" @change="changeYear">
                <option v-for="year in yearsArray" :key="year">{{year}}年</option>
            </select>
        </div>
        <div class="row">
            <div class="my-col-lg-6">
                <div class="yearbox boxshadow text-center">
                    <p>年度总产量</p>
                    <div class="year1" v-text="totalProduce"></div>
                </div>
            </div>
            <div class="my-col-lg-6">
                <div class="yearbox boxshadow text-center">
                    <p>年度总销量</p>
                    <div class="year2" v-text="totalSale"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="my-col-lg-12 mt30">
                <div class="chartBox boxshadow">
					<div id="chart1" class="chart1">
						<chart ref="myChart"  :options="option1" :auto-resize="true" @click="onClick" ></chart>
					</div>
					<div id="chart2" class="chart2">
						<chart :options="option2" :auto-resize="true" ></chart>
					</div>
					<div id="chart3" class="chart3">
						<chart :options="option3" :auto-resize="true" ></chart>
					</div>
                </div>
            </div>
        </div>
        <div class="battery_analysis">
        	<div class="battery_analysis_title">分析总结</div>
        	<div class="battery_analysis_time">更新时间：{{updateTime}}</div>
        	<div class="battery_analysis_content"></div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        data () {
            return {    
                totalProduce:'',
                totalSale:'',
                yearsArray:[],
                theYear:'',
				updateTime:'',
                option1:{
                    // color:['#CCCCCC','#999999'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        	type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['产量', '销量'],
						align: 'left',
						left: 10
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'value',
							name: '(GWh)',
							nameTextStyle: {
								color: '#999999',
								fontSize: 10,
								align:'left',
								padding:[30, 30, 0, -4]
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
                            name:'产量',
                            type:'bar',
                            data:[],
                            itemStyle: {
                                normal:{
                                    color: '#28DCDB'                                
                                }
                            }

                        },
                        {
                            name:'销量',
                            type:'bar',
                            data:[],
                            itemStyle: {
                                normal:{
                                    color: '#F17C69'
                                }
                            }
                        }
                    ]
                },
                option2:  {
                    color:['#00C0D9','#00CAC1','#FFA43C','#FF6351'],
                    title : {
                        text: '各类动力电池产量情况（单位：GWh）',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',

                    },
                    calculable : true,
                    series : [
                        {
                            name:'产量情况',
                            type:'pie',
                            radius : [30, 110],
                            roseType : 'area',
                            data:[]
                        }
                    ]
                },
                option3: {
                    color:['#00C0D9','#00CAC1','#FFA43C','#FF6351'],
                    title : {
                        text: '各类动力电池销量情况（单位：GWh）',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        x : 'center',
                        y : 'bottom',
                        data:[]
                    },

                    calculable : true,
                    series : [
                        {
                            name:'销量情况',
                            type:'pie',
                            radius : [30, 110],
                            roseType : 'area',
                            data:[]
                        }
                    ]
                },
			}
        },
		//调用
		mounted(){
			
		},
		created(){
			this._industrychain_listYears();
			this._analyseconclusion_getByType();		 
		},
        methods:{
            onClick(event, instance, echarts){
                var name = event.name;
				this.option1.series[0].itemStyle.normal.color = function (params){
					var key = params.name;
					if(key  == name){
						return "#28DCDB";   
					}else{
						return "#CCCCCC";   
					}
				};
				this.option1.series[1].itemStyle.normal.color = function (params){
					var key = params.name;
					if(key  == name){
						return "#F17C69";   
					}else{
						return "#999999";   
					}
				};
                this._industrychain_getBatteryByYearMonth(this.theYear,event.name.replace('月', ''));
            },
            changeYear(event) {
            	this.theYear = event.target.value.substring(0, 4);
            	this._industrychain_getBatteryByYear(); 
				this._industrychain_getBatteryByYearMonth(this.theYear,1);
            },
            _industrychain_listYears(){
                api.industrychain_listYears({
                    type:3,
                }).then(res => {
                    this.yearsArray = res.data;
					this.theYear = this.yearsArray[0];
					this._industrychain_getBatteryByYear();
					this._industrychain_getBatteryByYearMonth(this.theYear,1);
                })
            },
			_analyseconclusion_getByType() {
				api.analyseconclusion_getByType({
					type:3,
				}).then(res => {
					var data = res.data;
					this.updateTime = data.updateDatetime;
					$(".battery_analysis_content").empty().append(data.content);
				})
			},
            _industrychain_getBatteryByYear () {
                api.industrychain_getBatteryByYear({
                    year:this.theYear
                }).then(res => {
                    var data=res.data;   
					this.totalSale=data.totalSale+'GWh';
					this.totalProduce=data.totalProduce+'GWh';					
                    this.option1.yAxis[0].data=data.xAxis.reverse();
                    this.option1.series[0].data=data.sale.reverse();
                    this.option1.series[1].data=data.produce.reverse();
					this.option1.series[0].itemStyle.normal.color = function (params){
						var key = params.name;
                        if(key  == '1月'){
                            return "#28DCDB";   
                        }else{
                            return "#CCCCCC";   
                        }
					};
					this.option1.series[1].itemStyle.normal.color = function (params){
						var key = params.name;
						if(key  == '1月'){
							return "#F17C69";   
						}else{
							return "#999999";   
						}
					};
                })
            },
            _industrychain_getBatteryByYearMonth (year,month) {
                api.industrychain_getBatteryByYearMonth({
                    year:year,
                    month:month,
                }).then(res => {
                    var data=res.data;
                    var legend2=[];var legend3=[];
                    data.sale.forEach(function (item) {
                        legend2.push(item.name);
                    });
                    data.produce.forEach(function (item) {
                        legend3.push(item.name);
                    });
                    this.option2.legend.data=legend2;
                    this.option3.legend.data=legend3;
                    this.option2.series[0].data=data.sale;
                    this.option3.series[0].data=data.produce;
                })
            },
        }        
    }
</script>

<style>
    .mt30{
        margin-top: 30px;
    }
    .chart1,.chart2,.chart3{
        float: left;
    }
    .chart3,.chart2{
        margin-top: 10px;
    }
    .chart1 .echarts{
        width: 400px;
        height: 750px;
    }
    .chart2 .echarts,.chart3 .echarts{
        width: 400px;
        height: 350px;
    }
    .my-col-lg-12,.my-col-lg-5,.my-col-lg-7,.my-col-lg-6{
        padding-left: 15px;
        padding-right: 15px;
    }
    .my-col-lg-5{
        width:41.66%;
    }
    .my-col-lg-6{
        width:50%;
    }
    .my-col-lg-7{
        width:58.34%;
    }
    .boxshadow{
        background: #FFFFFF;
        box-shadow: 0 2px 7px 0 rgba(200,200,200,0.30);
        border-radius: 8px;
    }
    .rcon{
        font-size: 14px !important;
        padding: 60px 30px;
    }
    .yearbox{
        font-size: 14px;
        color: #999999;
        text-align: center;
        height: 120px;
        padding: 30px 0px;
        margin-top: 30px;
    }
    .yearbox div{
        font-weight: 600;
        font-size: 28px;
        line-height: 20px;
    }
    .year1{
        color: #28DCDB;
    }
    .year2{
        color: #F17C69;
    }
    .yearsel{
        width: 120px;
        margin-left: 520px;
        display: inline-block;
    }
	.battery_analysis{
		width: 860px;
		min-height: 120px;
		height: auto;
		margin: 40px 0 20px;
		background: #F5F5F5;
		border-radius: 3px;
		position: relative;
		padding-top: 68px;
		padding-bottom: 40px;
	}
	.battery_analysis_title{
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
	.battery_analysis_time{
		width: auto;
		height: 20px;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #999999;
		position: absolute;
		top: 10px;
		right: 13px;
	}
	.battery_analysis_content{
		width: 810px;
		height: auto;
		margin: 0 auto;
	}
	.chartBox{
		width: 100%;
		height: 100%;
	}
</style>