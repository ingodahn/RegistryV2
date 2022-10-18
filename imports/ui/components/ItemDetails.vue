<template>
  <v-card class="mx-auto my-12">
    <v-card-title>{{ currentItem.Title }}</v-card-title>
    <v-card-text>
      <p>{{ currentItem.Description }}</p>
      <p>
        <b>URL:</b>
        <a :href="currentItem.URL" target="_blank">{{ currentItem.URL }}</a>
      </p>

      <div v-if="currentItem.itemType == 'scripts'">
          <p><b>Autor(en):</b> {{ currentItem.author }}</p>
          <p><b>Sprache:</b> {{ currentItem.language }}</p>
      </div>
      <div v-if="currentItem.itemType == 'jupyter'">
          <p><b>Dokumentation:</b></p>
           <p><pre>{{ currentItem.format }}</pre></p>
            <p><pre>{{ currentItem.kernel }}</pre></p>
              <p><pre>{{ currentItem.documentation }}</pre></p>
              <p><b>Sprache:</b> {{ currentItem.language }}</p>
      </div>
      <div v-if="currentItem.itemType == 'sagecell'">
          <p><b>Dokumentation:</b></p>
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
      let owner = this.currentItem.owner;
      return this.userNames[owner] ? this.userNames[owner] : "Unbekannt";
    },
    userNames () {
      let un = {}
      Meteor.users.find({}).fetch().forEach(element => {
        un[element.username] = element.name;
      });
      return un;
    },
    getType() {
      switch (this.currentItem.itemType) {
        case "scripts":
          return "Skript";
        case "jupyter":
          return "Notebook";
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