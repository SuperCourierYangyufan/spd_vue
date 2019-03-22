import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Core from './views/core'
import error404 from './views/404'
import check from './views/check'
import PathMenu from './components/Content/BaseSite/PathMenu/PathMenu'
import PathMenu_set from './components/Content/BaseSite/PathMenu/PathMenu_set'
import Dictionary from './components/Content/BaseSite/Dictionary/Dictionary'
import Dictionary_set from './components/Content/BaseSite/Dictionary/Dictionary_set'
import PrivilegeRole from './components/Content/BaseSite/PrivilegeRole/PrivilegeRole'
import Hospital from './components/Content/BaseSite/Hospital/hospital'
import hospital_set from './components/Content/BaseSite/Hospital/hospital_set'
import UserRole from './components/Content/BaseSite/UserRole/userRole'
import UserRole_set from './components/Content/BaseSite/UserRole/userRole_set'
Vue.use(Router)

const router = new Router({
  routes: [
      {
          path: '/',
          redirect: '/login'
      },
      {
        path: '/login',
          component: Login
      },
      {
          path: '/core',
          component: Core,
          children:[
              {
                  path: '/core/pathmenu',
                  component: PathMenu
              },
              {
                  path: '/core/pathmenu/set',
                  component: PathMenu_set
              },
              {
                  path: '/core/Dictionary',
                  component: Dictionary
              },
              {
                  path: '/core/Dictionary/set',
                  component: Dictionary_set
              },
              {
                  path: '/core/PrivilegeRole',
                  component: PrivilegeRole
              },
              {
                  path: '/core/hospital',
                  component: Hospital
              },
              {
                  path: '/core/hospital/set',
                  component: hospital_set
              },
              {
                  path: '/core/userRole',
                  component: UserRole
              },
              {
                  path: '/core/userRole/set',
                  component: UserRole_set
              },
          ]
      },
      {
          path: '/404',
          component: error404
      },
      {
          path: '/check',
          component: check
      }
  ]
})
//匹配跳转
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        from.name ? next({
            name: from.name
        }) : next('/404');
    } else {
        next(); //如果匹配到正确跳转
    }
});
export default router
