<template>
  <v-app>
    <h1>Mathematik interaktiv</h1>
    <v-row>
      <admin />
    </v-row>
    <v-row v-if="session.mode == 'search'">
      <v-row>
        <search />
      </v-row>
      <v-row>
        <items />
      </v-row>
    </v-row>
    <v-row v-if="session.mode == 'itemDetail'">
      <item-details :currentItem="session.currentItem" />
    </v-row>
  </v-app>
</template>

<script>
import Admin from "./components/Admin.vue";
import Search from "./components/Search.vue";
import Items from "./components/Items.vue";
import ItemDetails from "./components/ItemDetails.vue";

export default {
  components: {
    Admin,
    Search,
    Items,
    ItemDetails,
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
};
</script>

<style>
body {
  font-family: sans-serif;
  padding: 10px;
}
</style>
