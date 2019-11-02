<template>
    <v-col cols="12" md="6" class="text-center">
        <v-card
            class="elevation-12"
            :loading="loading"
        >
            <v-toolbar
                color="indigo"
                dark
                flat
              >
                <v-toolbar-title>Administrador</v-toolbar-title>
            </v-toolbar>
            <v-form ref="form">
                <v-card-text>
                    <v-alert type="error" v-if="response.error">
                        {{ response.message }}
                    </v-alert>
                    <v-text-field
                        label="E-mail"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                        :rules="rules.email"
                        v-model="email"
                        @keypress.enter="login"
                    ></v-text-field>

                    <v-text-field
                        id="password"
                        label="Contraseña"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        :rules="rules.password"
                        v-model="password"
                        @keypress.enter="login"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="login">Iniciar Sesión</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-col>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        loading: false,
        email: '',
        password: '',
        rules: {
            email: [
                v => !!v || 'El e-mail es necesario.',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Introduzca un e-mail valido.'
            ],
            password: [
                v => !!v || 'La contraseña es necesaria.'
            ]
        },
        response: {
            error: false,
            message: '',
        }
    }),
    methods: {
        login(){
            if( !this.$refs.form.validate() ){
                return
            }
            this.loading = true
            axios.post('/api/user', {
                email: this.email,
                password: this.password
            }).then( response => {
                this.response.error = false
                this.saveUser(response.data.user, response.data.api_token)
            }).catch(error => {
                if( error.response ){
                    this.response = {
                        error: true,
                        message: error.response.data.message
                    }
                } else {
                    this.response = {
                        error: true,
                        message: error
                    }
                }
                this.loading = false
            })
        },
        saveUser(user, token, go = () => { this.$router.push('books') }){
            this.loading = false
            this.$cookies.set('api_token', token)
            this.$store.state.user = user
            this.$store.state.api_token = token
            go()
        }
    },
    mounted() {
        this.loading = true
        let token = this.$cookies.get('api_token')
        if( token ){
            axios.get('/api/user', {
                params: {
                    api_token: token
                }
            }).then( response => {
                this.saveUser(response.data, token, () => {this.$router.go(-1)})
            }).catch( () => {
                this.loading = false
            })
        } else
            this.loading = false
    }
}
</script>
