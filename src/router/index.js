import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// Components
import Login from '../views/Login.vue'
import BooksCrud from '../views/BooksCrud.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/books',
	},
	{
		path: '/login',
		name: 'login',
		component: Login // () => import('../views/Login.vue')z
	},
	{
		path: '/books',
		name: 'books',
		component: BooksCrud
	}
]

const router = new VueRouter({
	mode: 'history',
	base: '/admin/',
	routes
})

export default router

router.beforeEach(function(to, from, next){
    if( store.state.api_token || to.name == 'login' ){
        return next()
    }
    return next('/login')
})
