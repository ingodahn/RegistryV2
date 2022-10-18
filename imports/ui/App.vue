<template>
  <v-app>
    <v-main>
      <v-container class="py-5">
        <v-row justify="center">
          <h1 class="my-2">Mathematik interaktiv <img src="/images/IDlogo.png" height="40px"/></h1>
        </v-row>
        <v-row v-if="isAdmin">
          <v-btn class="my-2" v-if="session.mode != 'admin'"  color="warning" @click="session.mode = 'admin'"
            >Admin Interface</v-btn
          >
          <admin v-if="session.mode == 'admin'"></admin>
        </v-row>
        <v-row>
          <v-btn
            v-if="currentUser && session.mode == 'search' && session.searchType != 'allTypes'"
            color="primary"
            @click="newItem"
            >Neuer Eintrag</v-btn
          >
        </v-row>
        <div v-if="session.mode == 'search'">
          <v-row justify="center">
            <search />
          </v-row>
          <v-row>
            <items v-if = "!threeLetters"/>
          </v-row>
        </div>
        <v-row v-if="session.mode == 'itemDetail'" justify="center">
          <item-details :currentItem="session.currentItem" />
        </v-row>
        <v-row v-if="session.mode == 'itemEdit'" justify="center">
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
        >Als {{ currentUser.username }} abmelden</v-btn
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
      this.session.mode = "search";
    },
    newItem() {
      this.session.currentItem = {
        Title: "",
        Description: "",
        URL: "https://",
        license: "CC-BY-SA",
        Status: "public",
        itemType: this.session.searchType,
        //owner: this.currentUser._id,
        owner: this.currentUser.username,
        lastModified: new Date(),
      };
      switch (this.session.searchType) {
        case "scripts": {
          this.session.currentItem.author = "Ingo Dahn";
          this.session.currentItem.language = "de";
          break;
        }
        case "jupyter": {
          this.session.currentItem.documentation = "";
          this.session.currentItem.language = "de";
          break;
        }
        case "sagecell": {
          this.session.currentItem.documentation = "";
          this.session.currentItem.language = "de";
          break;
        }
        case "mathcoach": {
          this.session.currentItem.lti = "no";
          break;
        }
      }
      this.$root.$data.session.mode = "itemEdit";
    },
  },
  computed: {
    threeLetters() {
      return (
        this.session.searchType == "allTypes" &&
        this.session.searchTerm.length < 3
      );
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
      Items: [],
      Users: [],
      AllItems: [],
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
