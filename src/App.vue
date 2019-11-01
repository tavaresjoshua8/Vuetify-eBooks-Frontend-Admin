<template>
    <v-app>
        <v-navigation-drawer
            v-model="drawer"
            app
        >
            <v-list dense>
                <div v-if="$store.state.api_token">
                    <v-list-item
                        two-line
                    >
                        <v-list-item-content>
                            <v-list-item-title class="title">{{ $store.state.user.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ $store.state.user.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="books">
                        <v-list-item-action>
                            <v-icon>mdi-library-books</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Libros</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <v-list-item-action>
                            <v-icon>mdi-logout</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Cerrar Sesión</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </div>

                <v-list-item href="/home">
                    <v-list-item-action>
                        <v-icon>mdi-backburger</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Página Principal</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="indigo"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>eBooks128</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="center"
                >
                    <router-view></router-view>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
      drawer: true,
    }),
    methods: {
        logout(){
            axios.delete('/api/user', {
                params: {
                    api_token: this.$store.state.api_token
                }
            }).then( response => {
                if( response.data.message = 'Success.' ) {
                    this.$router.push({name: 'login'})
                    this.$cookies.remove('api_token')
                    this.$store.state.api_token = null
                    this.$store.state.user = {
                        name: 'Intruso',
                        email: 'invitado',
                    }
                }
            })
        }
    }
}
</script>
