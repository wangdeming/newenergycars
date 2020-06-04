import cfg from './config'
import axios from 'axios'
import qs from 'qs'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.timeout = 30000;

// return new Promise((resolve, reject) => {
//   originJsonp(url, option, (err, data) => {
//     if (!err) {
//       resolve(data)
//     } else {
//       reject(err)
//     }
//   })
// })
export default {
  _error (err) {
    log.error(err);
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      log.error(err.response.data);
      log.error(err.response.status);
      log.error(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      log.error(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      log.error('Error', err.message);
    }
    log.error(err.config);
  },
  _success (res) {
    // log.error('[api]', res);
    return Promise.resolve(res.data)
  },
  _get (url, data) {
    return axios.get(url, {params: data})
      .then((res) => {
        return this._success(res)
      })
      .catch((err) => {
        this._error(err)
      })
  },
  _post (url, data) {
    return axios.post(url, qs.stringify(data))
      .then((res) => {
        return this._success(res)
      })
      .catch((err) => {
        this._error(err)
      })
  },
  testPOST (data) {
    return this._post(cfg.getUrl('test'), data)
  },
  testGET (data) {
    return this._get(cfg.getUrl('test'), data);
  },
   //首页-省市分析入口
  get_listprovince (data) {
    return this._post(cfg.getUrl('listprovince'), data)
  },
   //首页-本年度各省份产销量情况
  get_productionmarketingbyprovince (data) {
    return this._post(cfg.getUrl('productionmarketingbyprovince'), data)
  },
    //首页-本年度全国总产销量
	get_productionmarketing (data) {
    return this._post(cfg.getUrl('productionmarketing'), data)
  },
    //首页-各车型满意度排名
	get_satisfaction (data) {
    return this._post(cfg.getUrl('satisfaction'), data)
  },
    //首页-销量排名
	get_sales (data) {
    return this._post(cfg.getUrl('sales'), data)
  },
    //首页-政策概要
	get_policybrief (data) {
    return this._post(cfg.getUrl('policybrief'), data)
	},
	// 政策列表
	get_policyList (data){
		return this._post(cfg.getUrl('policyList'), data)
	},
	// 政策详情
	get_policyDetail (data){
		return this._post(cfg.getUrl('policyDetail'), data)
	},
	// 宏观总览-产业集群
	get_clusterList (data){
		return this._post(cfg.getUrl('cluster_list'), data)
	},
	// 宏观总览-行政省份
	get_enterpriseListenterprise (data){
		return this._post(cfg.getUrl('enterpriseListenterprise'), data)
	},
    // 国内产业政策
    get_domesticPolicylist (data){
        return this._post(cfg.getUrl('domesticPolicylist'), data)
    },
	// 国内产销情况年列表
	get_overviewListyear1 (data){
			return this._post(cfg.getUrl('overviewListyear1'), data)
	},
	// 国内产销情况
	get_overviewGncxqkfx (data){
			return this._post(cfg.getUrl('overviewGncxqkfx'), data)
	},
	// 进出口情况年列表
	get_overviewListyear2 (data){
			return this._post(cfg.getUrl('overviewListyear2'), data)
	},
	// 进出口情况
	get_overviewJckqkfx (data){
			return this._post(cfg.getUrl('overviewJckqkfx'), data)
	},
	// 获取分析结论
    analyseconclusion_getByType (data){
        return this._post(cfg.getUrl('analyseconclusion_getByType'), data)
    },
    // 获取某一年电池产销量
    industrychain_getBatteryByYear (data){
        return this._post(cfg.getUrl('industrychain_getBatteryByYear'), data)
    },
    // 获取某月各类电池产销量分布
    industrychain_getBatteryByYearMonth (data){
        return this._post(cfg.getUrl('industrychain_getBatteryByYearMonth'), data)
    },
    // 获取某一年电机装机量
    industrychain_getMotorByYear (data){
        return this._post(cfg.getUrl('industrychain_getMotorByYear'), data)
    },
    //获取某月各类电机装机量分布
    industrychain_getMotorByYearMonth (data){
        return this._post(cfg.getUrl('industrychain_getMotorByYearMonth'), data)
    },
    // 获取某一年新增充电设施数量
    industrychain_getChargeByYear (data){
        return this._post(cfg.getUrl('industrychain_getChargeByYear'), data)
    },
    //获取某月各类充电设施类型分布
    industrychain_getChargeByYearMonth (data){
        return this._post(cfg.getUrl('industrychain_getChargeByYearMonth'), data)
    },
    //获取产业链数据年份
    industrychain_listYears (data){
        return this._post(cfg.getUrl('industrychain_listYears'), data)
    },
	//获取乘用车企业销量年份
	salesListYears (data){
		return this._post(cfg.getUrl('salesListYears'), data)
	},
	//获取乘用车企业销量排名
	salesListCarCompanyRank (data){
		return this._post(cfg.getUrl('salesListCarCompanyRank'), data)
	},
	//获取车型销量排名
	salesListCarTypeRank (data){
		return this._post(cfg.getUrl('salesListCarTypeRank'), data)
	},
	//汽车满意度分析
	overviewSatisfactionthreeyear (data){
		return this._post(cfg.getUrl('overviewSatisfactionthreeyear'), data)
	},
	//市场供需预测
	overviewProductionmarketingthreeyear (data){
		return this._post(cfg.getUrl('overviewProductionmarketingthreeyear'), data)
	},
	//行政省份年列表
	overviewListyearinenterprise (data){
		return this._post(cfg.getUrl('overviewListyearinenterprise'), data)
	},
}
