/**
 * @param {Boolean} cache 是否启用路由缓存
 * @param {String} title document.title字段
 */
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: { cache: false, title: '' }
    },
    {
        path: '/configure',
        name: 'configure',
        component: () => import('@/views/configure/Configure.vue'),
        meta: { cache: false, title: '' }
    },
    {
        path: '/conditioning',
        name: 'conditioning',
        component: () => import('@/views/conditioning/Conditioning.vue'),
        meta: { cache: true, title: '' }
    },
    {
        path: '/operation',
        name: 'operation',
        component: () => import('@/views/operation/Operation.vue'),
        meta: { cache: true, title: '' }
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/xwDetail/Detail.vue'),
        meta: { cache: false, title: '' }
    },
]
export default routes
