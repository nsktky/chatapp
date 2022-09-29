<template>
    <v-app id="inspire">
    <chatSidebar/>
      <v-app-bar
        app
        shrink-on-scroll
      >  
        <v-toolbar-title>ユーザーいちらん</v-toolbar-title>
  
        <v-spacer></v-spacer>
  
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
  
      <v-main>
        <v-container>
          <v-row>
            <v-col
              v-for="n in 24"
              :key="n"
              cols="4"
            >
            <router-link :to="{ path: '/chat', query: { user_id: n}}">
                <v-avatar
                color="grey lighten-2"
                size="100"
                >
                </v-avatar>
            </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script>
    import chatSidebar from '@/components/layouts/chatSidebar'
    export default {
        components: {
            chatSidebar
        }
    }
  </script>