import Vue from 'vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueCookies)

new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount('#app')
