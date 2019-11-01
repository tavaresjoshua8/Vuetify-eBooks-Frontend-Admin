import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		api_token: '',
        user: {
            name: 'Intruso',
            email: 'invitado',
        }
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
