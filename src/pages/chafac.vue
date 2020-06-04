<template>
    <div>
        <div class="row">
            <div class="my-col-lg-5">
                <img src="../assets/chargepic.png" class="img-fluid"/>
            </div>
            <div class="my-col-lg-7">
                <div class="rcon">
                    电动汽车充电设施可以为电动汽车提供能量补给。随着技术的不断发展，充电设施的类型会越来越丰富,现阶段电动汽车充电设施可分为交流充电桩、充电站、换电站三类。
                </div>
            </div>
        </div>
        <div class="row mt60">
            <p class="mytitle">新增充电设施月度分布</p>
            <select class="form-control chafac_yearsel" @change="changeYear">
                <option v-for="year in yearsArray" :key="year">{{year}}年</option>
            </select>
        </div>
        <div class="row boxshadow mt40">
			<div class="chafac_year_title">年度新增充电设施量（万个）</div>
			<div class="chafac_year_total">{{total}}</div>
			<div class="chafac_line"></div>
			<div class="my-col-lg-12 mt30">
				<div class="chartBox">
					<div class="chafac_lineChart_div">
						<chart class="lineChart" :options="option1" :auto-resize="true" @click="onClick" ></chart>
					</div>
					<div class="chafac_pieChart_div">
						<chart class="pieChart" :options="option2" :auto-resize="true" ></chart>
					</div>
				</div>
			</div>
        </div>
        <div class="chafac_analysis">
        	<div class="chafac_analysis_title">分析总结</div>
        	<div class="chafac_analysis_time">更新时间：{{updateTime}}</div>
        	<div class="chafac_analysis_content"></div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        data () {
            return {    
                total:'3000,000,000',
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
                    calculable : true,
                    xAxis : [
                        {
                            type : 'value',
							name: '(万台)',
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

                        }
                    ]
                },
                option2:  {
                    color:['#00C0D9','#00CAC1','#FFA43C','#FF6351'],
                    title : {
                        text: '各类充电设施类型分布情况（单位：万个）',
                        left : 'center',
						top : 40,
						textStyle:{
							color:'#333',
							fontSize:16,
							fontFamily:'PingFang-SC-Medium'
						}
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        left : 'center',
                        bottom : 40,
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
                }
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
				console.log(name);
				this.option1.series[0].itemStyle.normal.color = function (params){
					var key = params.name;
					if(key  == name){
						return "#28DCDB";   
					}else{
						return "#CCCCCC";   
					}
				};
                this._industrychain_getChargeByYearMonth(parseInt(this.theYear),event.name.replace('月', ''));
            },
            changeYear(event) {
            	this.theYear = event.target.value.substring(0, 4);
            	this._industrychain_getChargeByYear(); 
				this._industrychain_getChargeByYearMonth(parseInt(this.theYear),1);
            },
            _industrychain_listYears(){
                api.industrychain_listYears({
                    type:5,
                }).then(res => {
                    this.yearsArray = res.data;
					this.theYear = this.yearsArray[0];
					this._industrychain_getChargeByYear();
					this._industrychain_getChargeByYearMonth(parseInt(this.theYear),1);
                })
            },
			_analyseconclusion_getByType() {
				api.analyseconclusion_getByType({
					type:5,
				}).then(res => {
					var data = res.data;
					this.updateTime = data.updateDatetime;
					$(".chafac_analysis_content").empty().append(data.content);
				})
			},
            _industrychain_getChargeByYear () {
                api.industrychain_getChargeByYear({
                    year:parseInt(this.theYear)
                }).then(res => {
                    var data=res.data;   
					this.total = data.total;				
                    this.option1.yAxis[0].data=data.xAxis.reverse();
                    this.option1.series[0].data=data.data.reverse();
					this.option1.series[0].itemStyle.normal.color = function (params){
						var key = params.name;
                        if(key  == '1月'){
                            return "#28DCDB";   
                        }else{
                            return "#CCCCCC";   
                        }
					};
                })
            },
            _industrychain_getChargeByYearMonth (year,month) {
                api.industrychain_getChargeByYearMonth({
                    year:year,
                    month:month,
                }).then(res => {
                    var data=res.data;
                    this.option2.series[0].data=data.data;
                })
            },
        }        
    }
</script>

<style>
    .mt30{
        margin-top: 30px;
    }
	.mt40{
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 40px;
	}
	.mt60{
		margin-top: 60px;
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
	.chafac_year_title{
		width: 100%;
		height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #999999;
		text-align: center;
		margin-top: 30px;
	}
	.chafac_year_total{
		width: 100%;
		height: 40px;
		margin-top: 5px;
		font-family: PingFangSC-Semibold;
		font-size: 28px;
		color: #28DCDB;
		text-align: center;
	}
	.chafac_line{
		width: 100%;
		height: 0.5px;
		background: #CCCCCC;
		margin-top: 15px;
	}
	.chafac_lineChart_div{
		width: 405px;
		height: 500px;
		float: left;
	}
	.chafac_pieChart_div{
		width: 405px;
		height: 500px;
		float: right;
	}
	.pieChart,.lineChart{
		width: 100% !important;
		height: 100% !important;
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
    .chafac_yearsel{
        width: 120px;
        margin-left: 530px;
        display: inline-block;
    }
	.chafac_analysis{
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
	.chafac_analysis_title{
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
	.chafac_analysis_time{
		width: auto;
		height: 20px;
		font-family: PingFang-SC-Medium;
		font-size: 14px;
		color: #999999;
		position: absolute;
		top: 10px;
		right: 13px;
	}
	.chafac_analysis_content{
		width: 810px;
		height: auto;
		margin: 0 auto;
	}
	.chartBox{
		width: 100%;
		height: 100%;
	}
</style>

