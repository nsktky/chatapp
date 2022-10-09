<template>
  <v-app id="inspire">
    <chatSidebar />
    <v-app-bar app shrink-on-scroll>
      <v-toolbar-title>ルーム一覧</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col v-for="room in rooms" :key="room.id" cols="4">
            <router-link :to="{ path: '/chat', query: { room_id: room.id } }">
              <v-avatar color="grey lighten-2" size="100">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                  v-if="!room.thumbnailUrl"
                />

                <img
                  :src="room.thumbnailUrl"
                  alt="John"
                  v-if="room.thumbnailUrl"
                />
              </v-avatar>
            </router-link>
          </v-col>
          <!-- <v-col v-for="n in 24" :key="n" cols="4">
            <router-link :to="{ path: '/chat', query: { user_id: n } }">
              <v-avatar color="grey lighten-2" size="100"> </v-avatar>
            </router-link>
          </v-col> -->
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import chatSidebar from "@/components/layouts/chatSidebar";
import firebase from "@/firebase/firebase";
export default {
  components: {
    chatSidebar,
  },
  data: () => ({
    rooms: [],
  }),
  mounted() {
    this.getRooms();
  },
  methods: {
    async getRooms() {
      this.rooms = [];
      const roomRef = firebase.firestore().collection("rooms");
      const snapshot = await roomRef.get();
      snapshot.forEach((doc) => {
        this.rooms.push(doc.data());
      });
    },
  },
};
</script>
