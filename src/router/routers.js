import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
    {path: '/login', component: (resolve) => require(['@/views/login/index'], resolve), hidden: true},
    { 
      path: '/404',
      component: (resolve) => require(['@/views/features/404'], resolve),
      hidden: true
    },
    { 
      path: '/landPage',
      component: (resolve) => require(['@/views/shop/homeconfig/LandPage/index'], resolve),
      hidden: true
    },
    {
      path: '',
      component: Layout,
      redirect: '/home',
      children: [{
        path: 'home',
        name: 'home',
        component: (resolve) => require(['@/views/home/index'], resolve),
        meta: {title: '首页', icon: 'home'}
      }]
    },
    {
      path: '/user',
      component: Layout,
      hidden: true,
      redirect: 'noredirect',
      children: [
        {
          path: 'center',
          component: (resolve) => require(['@/views/system/user/center'], resolve),
          name: '个人中心',
          meta: { title: '个人中心' }
        }
      ]
    },
    // {
    //   path: '/wechat',
    //   name: 'wechat',
    //   component: Layout,
    //   redirect: '/wechat/menu',
    //   meta: {title: '微信管理', icon: 'product'},
    //   children: [
    //     { 
    //     path: 'menu',
    //     name: 'menu',
    //     component: () => import('@/views/wechat/menu/index'),
    //     meta: {title: '微信菜单', icon: 'product-list'}
    //     },
    //     { 
    //       path: 'article',
    //       name: 'article',
    //       component: () => import('@/views/wechat/article/index'),
    //       meta: {title: '图文管理', icon: 'product-list'}
    //       },
    //       { 
    //         path: 'reply',
    //         name: 'reply',
    //         component: () => import('@/views/wechat/reply/index'),
    //         meta: {title: '自动回复', icon: 'product-list'}
    //       },
    //       { 
    //         path: 'addReply',
    //         name: 'addReply',
    //         component: () => import('@/views/wechat/reply/add'),
    //         meta: {title: '新增自动回复'},
    //         hidden: true
    //       },
    //       { 
    //         path: 'updateReply',
    //         name: 'updateReply',
    //         component: () => import('@/views/wechat/reply/update'),
    //         meta: {title: '更新自动回复'},
    //         hidden: true
    //       },
    //       { 
    //         path: 'fans',
    //         name: 'fans',
    //         component: () => import('@/views/wechat/fans/index'),
    //         meta: {title: '粉丝管理', icon: 'product-list'}
    //       },
    //       { 
    //         path: 'message',
    //         name: 'message',
    //         component: () => import('@/views/wechat/message/index'),
    //         meta: {title: '消息管理', icon: 'product-list'}
    //       },
    //       { 
    //         path: 'template',
    //         name: 'template',
    //         component: () => import('@/views/wechat/template/index'),
    //         meta: {title: '模板管理', icon: 'product-list'}
    //       },
    //       { 
    //         path: 'config/office',
    //         name: 'config',
    //         component: () => import('@/views/wechat/config/index'),
    //         meta: {title: '公共号配置', icon: 'product-list'}
    //       },
    //       { 
    //         path: 'config/pay',
    //         name: 'configPay',
    //         component: () => import('@/views/wechat/config/pay'),
    //         meta: {title: '微信支付配置', icon: 'product-list'}
    //       },
    //       { 
    //         path: 'config/app',
    //         name: 'configApp',
    //         component: () => import('@/views/wechat/config/wxapp'),
    //         meta: {title: '微信小程序配置', icon: 'product-list'}
    //       },
    //    ]
    //   },
    // {
    //   path: '/pms',
    //   component: Layout,
    //   redirect: '/pms/product',
    //   name: 'pms',
    //   meta: {title: '商品', icon: 'product'},
    //   children: [
    //     {
    //     path: 'product',
    //     name: 'product',
    //     component: () => import('@/views/pms/product/index'),
    //     meta: {title: '商品列表', icon: 'product-list'}
    //     },
    //     {
    //       path: 'addProduct',
    //       name: 'addProduct',
    //       component: () => import('@/views/pms/product/add'),
    //       meta: {title: '添加商品', icon: 'product-add'}
    //     },
    //     {
    //       path: 'updateProduct',
    //       name: 'updateProduct',
    //       component: () => import('@/views/pms/product/update'),
    //       meta: {title: '修改商品', icon: 'product-add'},
    //       hidden: true
    //     },
    //     {
    //       path: 'productRecycle',
    //       name: 'productRecycle',
    //       component: () => import('@/views/pms/product/index'),
    //       meta: {title: '商品回收站', icon: 'product-recycle'},
    //       hidden: true
    //     },
    //     {
    //       path: 'productComment',
    //       name: 'productComment',
    //       component: () => import('@/views/pms/product/index'),
    //       meta: {title: '商品评价', icon: 'product-comment'},
    //       hidden: true
    //     },
    //     {
    //       path: 'productCate',
    //       name: 'productCate',
    //       component: () => import('@/views/pms/productCate/index'),
    //       meta: {title: '商品分类', icon: 'product-cate'}
    //     },
    //     {
    //       path: 'addProductCate',
    //       name: 'addProductCate',
    //       component: () => import('@/views/pms/productCate/add'),
    //       meta: {title: '添加商品分类'},
    //       hidden: true
    //     },
    //     {
    //       path: 'updateProductCate',
    //       name: 'updateProductCate',
    //       component: () => import('@/views/pms/productCate/update'),
    //       meta: {title: '修改商品分类'},
    //       hidden: true
    //     },
    //     {
    //       path: 'productAttr',
    //       name: 'productAttr',
    //       component: () => import('@/views/pms/productAttr/index'),
    //       meta: {title: '商品类型', icon: 'product-attr'}
    //     },
    //     {
    //       path: 'productAttrList',
    //       name: 'productAttrList',
    //       component: () => import('@/views/pms/productAttr/productAttrList'),
    //       meta: {title: '商品属性列表'},
    //       hidden: true
    //     },
    //     {
    //       path: 'addProductAttr',
    //       name: 'addProductAttr',
    //       component: () => import('@/views/pms/productAttr/addProductAttr'),
    //       meta: {title: '添加商品属性'},
    //       hidden: true
    //     },
    //     {
    //       path: 'updateProductAttr',
    //       name: 'updateProductAttr',
    //       component: () => import('@/views/pms/productAttr/updateProductAttr'),
    //       meta: {title: '修改商品属性'},
    //       hidden: true
    //     },
    //     {
    //       path: 'brand',
    //       name: 'brand',
    //       component: () => import('@/views/pms/brand/index'),
    //       meta: {title: '品牌管理', icon: 'product-brand'}
    //     },
    //     {
    //       path: 'addBrand',
    //       name: 'addBrand',
    //       component: () => import('@/views/pms/brand/add'),
    //       meta: {title: '添加品牌'},
    //       hidden: true
    //     },
    //     {
    //       path: 'updateBrand',
    //       name: 'updateBrand',
    //       component: () => import('@/views/pms/brand/update'),
    //       meta: {title: '编辑品牌'},
    //       hidden: true
    //     },
    //   ]
    // },
    // {
    //   path:'/sub',
    //   component: Layout,
    //   redirect: '/sub/subjectList',
    //   name: 'sub',
    //   meta: {title: '专题', icon: 'subject'},
    //   children: [
    //     {
    //       path: 'subjectList',
    //       name: 'subjectList',
    //       component: () => import('@/views/sub/subjectList/index'),
    //       meta: {title: '专题列表', icon: 'subject-list'},
    //     },
    //     {
    //       path: 'addSubject',
    //       name: 'addSubject',
    //       component: () => import('@/views/sub/subjectList/add'),
    //       meta: {title: '添加专题'},
    //       hidden:true
    //     },
    //     {
    //       path: 'updateSubject',
    //       name: 'updateSubject',
    //       component: () => import('@/views/sub/subjectList/update'),
    //       meta: {title: '编辑专题'},
    //       hidden:true
    //     },
    //     {
    //       path: 'subjectCate',
    //       name: 'subjectCate',
    //       component: () => import('@/views/sub/subjectCate/index'),
    //       meta: {title: '专题分类', icon: 'subject-cate'}
    //     },
    //     {
    //       path: 'addSubjectCate',
    //       name: 'addSubjectCate',
    //       component: () => import('@/views/sub/subjectCate/add'),
    //       meta: {title: '添加专题分类'},
    //         hidden:true
    //     },
    //     {
    //       path: 'updateSubjectCate',
    //       name: 'updateSubjectCate',
    //       component: () => import('@/views/sub/subjectCate/update'),
    //       meta: {title: '编辑专题分类'},
    //         hidden:true
    //     },
    //   ],
    // },
    // {
    //   path: '/oms',
    //   component: Layout,
    //   redirect: '/oms/order',
    //   name: 'oms',
    //   meta: {title: '订单', icon: 'order'},
    //   children: [
    //     {
    //       path: 'order',
    //       name: 'order',
    //       component: () => import('@/views/oms/order/index'),
    //       meta: {title: '订单列表', icon: 'product-list'}
    //     },
    //     {
    //       path: 'orderDetail',
    //       name: 'orderDetail',
    //       component: () => import('@/views/oms/order/orderDetail'),
    //       meta: {title: '订单详情'},
    //       hidden:true
    //     },
    //     {
    //       path: 'deliverOrderList',
    //       name: 'deliverOrderList',
    //       component: () => import('@/views/oms/order/deliverOrderList'),
    //       meta: {title: '发货列表'},
    //       hidden:true
    //     },
    //     {
    //       path: 'orderSetting',
    //       name: 'orderSetting',
    //       component: () => import('@/views/oms/order/setting'),
    //       meta: {title: '订单设置', icon: 'order-setting'}
    //     },
    //     {
    //       path: 'returnApply',
    //       name: 'returnApply',
    //       component: () => import('@/views/oms/apply/index'),
    //       meta: {title: '退货申请处理', icon: 'order-return'}
    //     },
    //     {
    //       path: 'refund',
    //       name: 'refund',
    //       component: () => import('@/views/oms/refund/index'),
    //       meta: {title: '退款申请处理', icon: 'order-refund'}
    //     },
        
    //     {
    //       path: 'returnReason',
    //       name: 'returnReason',
    //       component: () => import('@/views/oms/apply/reason'),
    //       meta: {title: '退货原因设置', icon: 'order-return-reason'}
    //     },
    //     {
    //       path: 'returnApplyDetail',
    //       name: 'returnApplyDetail',
    //       component: () => import('@/views/oms/apply/applyDetail'),
    //       meta: {title: '退货原因详情'},
    //       hidden:true
    //     },
    //     {
    //       path: 'refundDetail',
    //       name: 'refundDetail',
    //       component: () => import('@/views/oms/refund/refundDetail'),
    //       meta: {title: '退款详情'},
    //       hidden:true
    //     }
    //   ]
    // },
    // {
    //   path:'/sms',
    //   component: Layout,
    //   redirect: '/sms/coupon',
    //   name: 'sms',
    //   meta: {title: '营销', icon: 'sms'},
    //   children: [
    //     {
    //       path: 'flash',
    //       name: 'flash',
    //       component: () => import('@/views/sms/flash/index'),
    //       meta: {title: '秒杀活动列表', icon: 'sms-flash'}
    //     },
    //     {
    //       path: 'flashSession',
    //       name: 'flashSession',
    //       component: () => import('@/views/sms/flash/sessionList'),
    //       meta: {title: '秒杀时间段列表'},
    //       hidden:true
    //     },
    //     {
    //       path: 'selectSession',
    //       name: 'selectSession',
    //       component: () => import('@/views/sms/flash/selectSessionList'),
    //       meta: {title: '秒杀时间段选择'},
    //       hidden:true
    //     },
    //     {
    //       path: 'flashProductRelation',
    //       name: 'flashProductRelation',
    //       component: () => import('@/views/sms/flash/productRelationList'),
    //       meta: {title: '秒杀商品列表'},
    //       hidden:true
    //     },
    //     {
    //       path: 'coupon',
    //       name: 'coupon',
    //       component: () => import('@/views/sms/coupon/index'),
    //       meta: {title: '优惠券列表', icon: 'sms-coupon'}
    //     },
    //     {
    //       path: 'addCoupon',
    //       name: 'addCoupon',
    //       component: () => import('@/views/sms/coupon/add'),
    //       meta: {title: '添加优惠券'},
    //       hidden:true
    //     },
    //     {
    //       path: 'updateCoupon',
    //       name: 'updateCoupon',
    //       component: () => import('@/views/sms/coupon/update'),
    //       meta: {title: '修改优惠券'},
    //       hidden:true
    //     },
    //     {
    //       path: 'couponHistory',
    //       name: 'couponHistory',
    //       component: () => import('@/views/sms/coupon/history'),
    //       meta: {title: '优惠券领取详情'},
    //       hidden:true
    //     },
    //     {
    //       path: 'brand',
    //       name: 'homeBrand',
    //       component: () => import('@/views/sms/brand/index'),
    //       meta: {title: '品牌推荐', icon: 'product-brand'}
    //     },
    //     {
    //       path: 'new',
    //       name: 'homeNew',
    //       component: () => import('@/views/sms/new/index'),
    //       meta: {title: '新品推荐', icon: 'sms-new'}
    //     },
    //     {
    //       path: 'hot',
    //       name: 'homeHot',
    //       component: () => import('@/views/sms/hot/index'),
    //       meta: {title: '人气推荐', icon: 'sms-hot'}
    //     },
    //     {
    //       path: 'subject',
    //       name: 'homeSubject',
    //       component: () => import('@/views/sms/subject/index'),
    //       meta: {title: '专题推荐', icon: 'sms-subject'},
    //     },
  
    //     {
    //       path: 'advertise',
    //       name: 'homeAdvertise',
    //       component: () => import('@/views/sms/advertise/index'),
    //       meta: {title: '广告列表', icon: 'sms-ad'}
    //     },
    //     {
    //       path: 'addAdvertise',
    //       name: 'addHomeAdvertise',
    //       component: () => import('@/views/sms/advertise/add'),
    //       meta: {title: '添加广告'},
    //       hidden:true
    //     },
    //     {
    //       path: 'updateAdvertise',
    //       name: 'updateHomeAdvertise',
    //       component: () => import('@/views/sms/advertise/update'),
    //       meta: {title: '编辑广告'},
    //       hidden:true
    //     }
    //   ]
    // },
    // {
    //   path:'/setting',
    //   component: Layout,
    //   redirect: '/setting/address',
    //   name: 'setting',
    //   meta: {title: '设置', icon: 'setting'},
    //   children: [
    //     {
    //       path: 'address',
    //       name: 'address',
    //       component: () => import('@/views/setting/address/index'),
    //       meta: {title: '发货地址设置', icon: 'setting-address'}
    //     },
    //     {
    //       path: 'addAddress',
    //       name: 'addAddress',
    //       component: () => import('@/views/setting/address/add'),
    //       meta: {title: '添加发货地址'},
    //       hidden:true
    //     },
    //     {
    //       path: 'updateAddress',
    //       name: 'updateAddress',
    //       component: () => import('@/views/setting/address/update'),
    //       meta: {title: '添加发货地址'},
    //       hidden:true
    //     },
  
    //     {
    //       path: 'account',
    //       name: 'account',
    //       component: () => import('@/views/setting/account/index'),
    //       meta: {title: '账号设置', icon: 'seting-account'},
    //       hidden:true
    //     },
    //   ]
    // },
    
    // {
    //   path:'/system',
    //   component: Layout,
    //   redirect: '/system/user',
    //   name: 'system',
    //   meta: {title: '系统管理', icon: 'system-manger'},
    //   children: [
    //     {
    //       path: 'user',
    //       name: 'user',
    //       component: () => import('@/views/system/user'),
    //       meta: {title: '用户管理', icon: 'system-user'},
    //     },
    //     {
    //       path: 'role',
    //       name: 'role',
    //       component: () => import('@/views/system/role'),
    //       meta: {title: '角色管理', icon: 'system-role'},
    //     },
    //     {
    //       path: 'job',
    //       name: 'job',
    //       component: () => import('@/views/system/job'),
    //       meta: {title: '岗位管理', icon: 'system-job'},
    //     },
    //     {
    //       path: 'dept',
    //       name: 'dept',
    //       component: () => import('@/views/system/dept'),
    //       meta: {title: '部门管理', icon: 'system-dept'},
    //     },
    //     {
    //       path: 'menu',
    //       name: 'menu',
    //       component: () => import('@/views/system/menu'),
    //       meta: {title: '菜单管理', icon: 'system-menu'},
    //     },
    //     {
    //       path: 'userCenter',
    //       name: 'userCenter',
    //       component: () => import('@/views/system/user/center'),
    //       hidden: true,
    //     },
    //   ],
    // },
    // {
    //   path:'/tools',
    //   component: Layout,
    //   redirect: '/tools/email',
    //   name: 'tools',
    //   meta: {title: '系统工具', icon: 'sys-tools'},
    //   children: [
    //     {
    //       path: 'email',
    //       name: 'email',
    //       component: () => import('@/views/tools/email'),
    //       meta: {title: '邮箱工具', icon: 'tools-email'},
    //     },
    //     {
    //       path: 'aliPay',
    //       name: 'aliPay',
    //       component: () => import('@/views/tools/aliPay'),
    //       meta: {title: '支付宝工具', icon: 'tools-ailPay'},
    //     },
    //     {
    //       path: 'aliyunOSS',
    //       name: 'aliyunOSS',
    //       component: () => import('@/views/tools/aliyunOSS'),
    //       meta: {title: '云存储工具', icon: 'tools-oss'},
    //     }
    //   ]
    // },
  
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})