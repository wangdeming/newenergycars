import Vue from 'vue'
import Router from 'vue-router'
import xgzc from '@/pages/xgzc'
import index from '@/pages/index'
import industry from '@/pages/industry'
import cyjq from '@/pages/cyjq'
import xzsf from '@/pages/xzsf'
import xgzcxq from '@/pages/xgzcxq'
import gncxqk	from '@/pages/gncxqk'
import jckqk	from '@/pages/jckqk'
import chain from '@/pages/chain'
import qycxpm from '@/pages/qycxpm'
import mydfx from '@/pages/mydfx'
import scgxyc from '@/pages/scgxyc'
import ssfx from '@/pages/ssfx'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index',
        query: { type: 'index' }
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      props: (route) => ({ query: route.query })
    },
    {
      path: '/xgzc',
      name: 'xgzc',
      component: xgzc,
      props: (route) => ({ query: route.query })
    },
    {
        path: '/industry',
        name: 'industry',
        component: industry,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/cyjq',
        name: 'cyjq',
        component: cyjq,
        props: (route) => ({ query: route.query })
    },
    {
        path: '/xzsf',
        name: 'xzsf',
        component: xzsf,
        props: (route) => ({ query: route.query })
    },
		{
				path: '/xgzcxq',
				name: 'xgzcxq',
				component: xgzcxq,
				props: (route) => ({ query: route.query })
		},
		{
				path: '/gncxqk',
				name: 'gncxqk',
				component: gncxqk,
				props: (route) => ({ query: route.query })
		},
		{
				path: '/jckqk',
				name: 'jckqk',
				component: jckqk,
				props: (route) => ({ query: route.query })
		},
      {
          path: '/chain',
          name: 'chain',
          component: chain,
          props: (route) => ({ query: route.query })
      },
			{
					path: '/qycxpm',
					name: 'qycxpm',
					component: qycxpm,
					props: (route) => ({ query: route.query })
			},
			{
					path: '/mydfx',
					name: 'mydfx',
					component: mydfx,
					props: (route) => ({ query: route.query })
			},
			{
					path: '/scgxyc',
					name: 'scgxyc',
					component: scgxyc,
					props: (route) => ({ query: route.query })
			},
			{
					path: '/ssfx',
					name: 'ssfx',
					component: ssfx,
					props: (route) => ({ query: route.query })
			},
  ]
})
