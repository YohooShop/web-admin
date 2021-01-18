import router from './routers'
import store from '@/store'
import Config from '@/settings'
import { buildMenus } from '@/api/system/menu'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { filterAsyncRouter } from '@/store/modules/permission'
NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
router.beforeEach((to, from, next) => {
  
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if (getToken()) {
      // 已登录且要跳转的页面是登录页
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      }else{
        if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
          store.dispatch('GetInfo').then(res => { // 拉取user_info
            // 动态路由，拉取菜单
            loadMenus(next, to)
          }).catch((err) => {
            console.log(err)
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({ path: '/' })
            })
          })

        }else if (store.getters.loadMenus) {
           // 修改成false，防止死循环
          store.dispatch('updateLoadMenus').then(res => {})
          loadMenus(next, to)
        } else {
           next()
        }
      }
  }else {
     /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res.data)
    asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
