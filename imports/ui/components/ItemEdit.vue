<template>
  <v-form class="mx-auto my-12">
    <v-text-field v-model="currentItem.Title" label="Title" required></v-text-field>
    <v-textarea v-model="currentItem.Description" label="Description"></v-textarea>
    <v-text-field v-model="currentItem.URL" label="URL" required></v-text-field>
      <div v-if="currentItem.itemType == 'scripts'">
        <v-text-field v-model="currentItem.author" label="Author(s)"></v-text-field>
        <v-select v-model="currentItem.language" label="Language" :items="languages" required></v-select>
      </div>
      <div v-if="currentItem.itemType == 'sagecell'">
        <v-textarea label="Documentation" v-model="currentItem.documentation"></v-textarea>
        <v-select v-model="currentItem.language" label="Language" :items="languages" required></v-select>
      </div>
      <div v-if="currentItem.itemType == 'mathcoach'">
        <v-select v-model="currentItem.lti" label="LTI-Support" :items="['no','yes']" required></v-select>
      </div>
      <v-text-field label="License" v-model="currentItem.license" required></v-text-field>
      <v-select v-model="currentItem.Status" label="Status" :items="statuses" required></v-select>
      <v-select v-model="currentItem.owner" label="Owner" :items="users" required></v-select>
      
    
      <v-btn color="primary" @click="session.mode = 'search'">Zurück</v-btn>
      <v-btn color="primary" @click="updateItem">Speichern</v-btn>
  </v-form>
</template>

<script>
import { Items } from "../../api/collections/ItemsCollection";
export default {
  data() {
    return {
      session: this.$root.$data.session,
      languages: ["de", "en", "es", "fr", "it", "ja", "ko", "pt", "ru", "zh"],
      statuses: ["public", "private", "deprecated"],
      users: [{text: "Ingo Dahn", value: "6mYpk6vXoocKmmwxH"},
      {text: "MathCoach-Team", value: "RnawNjw4T2eYaFcAi"},
      {text: "Wigand Rathmann", value: "yhc4GHyXccvf5g3E9"}]
    };
  },
  props: {
    currentItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateItem() {
      this.currentItem.lastModified = new Date();
      Meteor.call("updateItem",this.currentItem);
      this.session.mode = "search";
    }
  },
  computed: {
    getOwner() {
      switch (this.currentItem.owner) {
        case "6mYpk6vXoocKmmwxH":
          return "Ingo Dahn";
        case "RnawNjw4T2eYaFcAi":
          return "MathCoach-Team";
        case "yhc4GHyXccvf5g3E9":
          return "Wigand Rathmann";
        default:
          return "Unbekannt";
      }
    },
    getType() {
      switch (this.currentItem.itemType) {
        case "scripts":
          return "Skript";
        case "sagecell":
          return "Arbeitsblatt";
        case "mathcoach":
          return "Aufgabe";
        default:
          return "Unbekannt";
      }
    },
    getStatus() {
      switch (this.currentItem.Status) {
        case "public":
          return "Öffentlich";
        case "private":
          return "Privat";
        case "deprecated":
          return "Veraltet";
        default:
          return "Unbekannt";
      }
    },
  },
};
</script>