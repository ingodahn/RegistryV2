<template>
  <v-app>
    <v-main>
      <v-container class="py-5">
        <v-row>
          <h1 class="my-2">Mathematik interaktiv</h1>
        </v-row>
        <v-row>
          <admin v-if="isAdmin" />
        </v-row>
        <div v-if="session.mode == 'search'">
          <v-row>
            <search />
          </v-row>
          <v-row>
            <items />
          </v-row>
        </div>
        <v-row v-if="session.mode == 'itemDetail'">
          <item-details :currentItem="session.currentItem" />
        </v-row>
        <v-row v-if="session.mode == 'itemEdit'">
          <item-edit :currentItem="session.currentItem" />
        </v-row>
        <v-row v-if="session.mode == 'login'">
          <login-form />
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
      <a href="https://dahn-research.eu/impressum.htm" target="_blank"
        >Impressum</a
      >
      &nbsp;<a href="https://dahn-research.eu/privacy.htm" target="_blank"
        >Datenschutzerklärung</a
      >
      &nbsp;
      <v-btn color="primary" @click="logout" v-if="currentUser"
        >Als Autor abmelden</v-btn
      >
      <v-btn color="primary" @click="session.mode = 'login'" v-else
        >Als Autor anmelden</v-btn
      >
    </v-footer>
  </v-app>
</template>

<script>
import Admin from "./components/Admin.vue";
import Search from "./components/Search.vue";
import Items from "./components/Items.vue";
import ItemDetails from "./components/ItemDetails.vue";
import ItemEdit from "./components/ItemEdit.vue";
import LoginForm from "./components/LoginForm.vue";

export default {
  components: {
    Admin,
    Search,
    Items,
    ItemDetails,
    ItemEdit,
    LoginForm,
  },
  data() {
    return {
      session: {
        searchTerm: "",
        searchType: "allTypes",
        mode: "search",
        currentItem: {},
      },
    };
  },
  methods: {
    logout() {
      Meteor.logout();
      this.$root.$data.session.mode = "search";
    },
  },
  meteor: {
    currentUser() {
      return Meteor.user();
    },
    isAdmin() {
      if (this.currentUser) {
        return this.currentUser.username === "admin";
      }
      return false;
    },
    $subscribe: {
      'Items': [],
      'Users': [],
      'AllItems': []
    },
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 10px;
}
</style>
