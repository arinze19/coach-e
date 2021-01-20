import { createRouter, createWebHistory } from 'vue-router';
import CoachesList                        from './pages/coaches/CoachesList.vue';
import CoachesRegisteration               from './pages/coaches/CoachesRegisteration.vue';
import CoachesDetails                     from './pages/coaches/CoachesDetails'
import RegisteredRequests                 from './pages/requests/RegisteredRequests.vue';
import ContactCoach                       from './pages/requests/ContactCoach.vue'
import ErrorPage                          from './pages/ErrorPage.vue';
import UserAuth                           from './pages/auth/UserAuth.vue';
import store                              from './store/index.js'



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },     
        { path: '/coaches', component: CoachesList },
        {
            name: 'contact-coach-by-id',
            path: '/coaches/:id', 
            component: CoachesDetails, 
            props: true,
            children: [
            { path: 'contact', component: ContactCoach }
        ]},
        { path: '/register', component: CoachesRegisteration, meta: { requiresAuth: true } },
        { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true }},
        { path: '/requests', component: RegisteredRequests, meta: { requiresAuth: true }},
        { path: '/:notFound(.*)', component: ErrorPage }
    ]
});


router.beforeEach(function (to, _, next) {
    if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if(to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next('/coaches')
    } else {
        next()
    }

})


export default router 