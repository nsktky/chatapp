<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-sheet color="grey lighten-4" class="pa-4">
      <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

      <div class="username">{{ auth && auth.displayName }}</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text, to] in links" :key="icon" :to="to" link>
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  mounted() {
    this.auth = JSON.parse(sessionStorage.getItem("user"));
  },
  data: () => ({
    drawer: null,
    links: [
      ["mdi-inbox-arrow-down", "Inbox", "/"],
      ["mdi-send", "Send", "/about"],
      ["mdi-delete", "Trash", "/about"],
      ["mdi-alert-octagon", "Spam", "/about"],
    ],
    auth: null,
  }),
  methods: {
    logout() {
      console.log("logout call");
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.message = "ログアウトしました";
          this.$router.push("/userlogin");
        })
        .catch((error) => {
          console.log("fail", error);
        });
    },
  },
};
</script>
