<template>
  <div>
    <h2>Search Template</h2>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="session.searchTerm"
            label="Suche nach..."
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="session.searchType"
            :items="types"
            label="Suche in..."
          ></v-select>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      session: this.$root.$data.session,
      types: [{text: "... allen Materialien", value: "allTypes"}, {text: "... Skripten", value: "scripts"}, {text: "... Arbeitsblättern", value: "sagecell"}, {text: "... Aufgaben", value: "mathcoach"}]
    }
  },
  methods: {
    
  },
}
</script>

<style scoped>
  
</style>
