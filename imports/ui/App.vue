<template>
  <v-app>
    <h1>Mathematik interaktiv</h1>
    <admin/>
    <search/>
    <items/>
  </v-app>
</template>

<script>
import Admin from './components/Admin.vue';
import Search from './components/Search.vue'
import Items from './components/Items.vue'

export default {
  components: {
    Admin,
    Search,
    Items,
  },
  data () {
    return {
      session: {
        searchTerm: '',
        searchType: 'allTypes',
      }
    }
  }
}
</script>

<style>
  body {
    font-family: sans-serif;
    padding: 10px;
  }
</style>
