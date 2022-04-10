<template>
  <v-card class="mx-auto my-12">
    <v-card-title>{{ currentItem.Title }}</v-card-title>
    <v-card-text>
      <p>{{ currentItem.Description }}</p>
      <p>
        <b>URL:</b>
        <a href="currentItem.URL" target="_blank">{{ currentItem.URL }}</a>
      </p>

      <div v-if="currentItem.itemType == 'scripts'">
          <p><b>Autor(en):</b> {{ currentItem.author }}</p>
          <p><b>Sprache:</b> {{ currentItem.language }}</p>
      </div>
      <div v-if="currentItem.itemType == 'sagecell'">
          <p><b>Dokumentation:</b><p>
              <p><pre>{{ currentItem.documentation }}</pre></p>
              <p><b>Sprache:</b> {{ currentItem.language }}</p>
      </div>
      <div v-if="currentItem.itemType == 'mathcoach'">
          <p><b>LTI-Unterstützung:</b> {{ currentItem.lti }}</p>
      </div>
      <p><b>Typ:</b> {{ getType }}</p>
      <p><b>Lizenz:</b> {{ currentItem.license }}</p>
      <p><b>Status:</b> {{ getStatus }}</p>
      <p><b>Eintrag gehört:</b> {{ getOwner }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="session.mode = 'search'">Zurück</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      session: this.$root.$data.session,
    };
  },
  props: {
    currentItem: {
      type: Object,
      required: true,
    },
  },
  methods: {},
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