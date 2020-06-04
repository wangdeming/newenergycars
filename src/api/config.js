
export default {
  /*protocol: process.env.API_protocol,
  host: process.env.API_host,
  projectName: process.env.API_projectName,*/
  protocol: 'http://',
  host: '172.16.0.200:8777',
  projectName: 'newenergycars',
  getPrefix: function(projectName){
    projectName = projectName || this.projectName;
    return this.protocol + this.host + (projectName ? ('/' + projectName) : '');
  },
  getUrl: function(type){
    return this.getPrefix() + (this.uri[type] || '');
  },
  uri: {
		'test': '/test',
		//首页-省市分析入口
		'listprovince': '/index/listprovince',
		//首页-本年度各省份产销量情况
		'productionmarketingbyprovince': '/index/productionmarketingbyprovince',
		//首页-本年度全国总产销量
		'productionmarketing': '/index/productionmarketing',
		//首页-各车型满意度排名
		'satisfaction': '/index/satisfaction',
		//首页-销量排名
		'sales': '/index/sales',
		//首页-政策概要
		'policybrief': '/index/policybrief',
		'list': '/policy/list',
		// 政策列表
		'policyList':'/policy/list',
		// 政策详情
		'policyDetail':'/policy/detail',
		// 宏观总览-产业集群
		'cluster_list':'/overview/listcluster',
		// 宏观总览-行政省份
		'enterpriseListenterprise':'/overview/listenterprise',
		// 国内产业政策
		'domesticPolicylist':'/domesticPolicy/list',
		// 国内产销情况年列表
		'overviewListyear1':'/overview/listyear1',
		// 国内产销情况
		'overviewGncxqkfx':'/overview/gncxqkfx',
		// 进出口情况年列表
		'overviewListyear2':'/overview/listyear2',
		// 进出口情况
		'overviewJckqkfx':'/overview/jckqkfx',
		// 获取分析结论
		'analyseconclusion_getByType':'/analyseconclusion/getByType',
		// 获取某一年电池产销量
		'industrychain_getBatteryByYear':'/industrychain/getBatteryByYear',
		// 获取某月各类电池产销量分布
		'industrychain_getBatteryByYearMonth':'/industrychain/getBatteryByYearMonth',
		// 获取某一年电机装机量
		'industrychain_getMotorByYear':'/industrychain/getMotorByYear',
		//获取某月各类电机装机量分布
		'industrychain_getMotorByYearMonth':'/industrychain/getMotorByYearMonth',
		// 获取某一年新增充电设施数量
		'industrychain_getChargeByYear':'/industrychain/getChargeByYear',
		//获取某月各类充电设施类型分布
		'industrychain_getChargeByYearMonth':'/industrychain/getChargeByYearMonth',
		//获取某月各类充电设施类型分布
		'industrychain_listYears':'/industrychain/listYears',
		// 获取乘用车企业销量年份
		'salesListYears':'/sales/listYears',
		// 获取乘用车企业销量排名
		'salesListCarCompanyRank':'/sales/listCarCompanyRank',
		// 获取车型销量排名
		'salesListCarTypeRank':'/sales/listCarTypeRank',
		// 汽车满意度分析
		'overviewSatisfactionthreeyear':'/overview/satisfactionthreeyear',
		// 市场供需预测
		'overviewProductionmarketingthreeyear':'/overview/productionmarketingthreeyear',
		// 行政省份年列表
		'overviewListyearinenterprise':'/overview/listyearinenterprise',
	}
}
