<template>
<v-row>
  <v-col>
  <v-form class="my-12">
    <v-text-field
      v-model="currentItem.Title"
      label="Titel"
      required
    ></v-text-field>
    <v-textarea
      v-model="currentItem.Description"
      label="Beschreibung"
    ></v-textarea>
    <v-text-field v-model="currentItem.URL" label="URL" required></v-text-field>
    <div v-if="currentItem.itemType == 'scripts'">
      <v-text-field
        v-model="currentItem.author"
        label="Autor(en)"
      ></v-text-field>
      <v-select
        v-model="currentItem.language"
        label="Sprache"
        :items="languages"
        required
      ></v-select>
    </div>
    <div v-if="currentItem.itemType == 'jupyter'">
      <v-select v-model="currentItem.format" label="Format" :items="jupyterFormats">
      </v-select>
      <v-select v-model="currentItem.kernel" label="Kernel" :items="jupyterKernels">
      </v-select>
      <v-textarea
        label="Dokumentation"
        v-model="currentItem.documentation"
      ></v-textarea>
      <v-select
        v-model="currentItem.language"
        label="Sprache"
        :items="languages"
        required
      ></v-select>
    </div>
    <div v-if="currentItem.itemType == 'sagecell'">
      <v-textarea
        label="Dokumentation"
        v-model="currentItem.documentation"
      ></v-textarea>
      <v-select
        v-model="currentItem.language"
        label="Sprache"
        :items="languages"
        required
      ></v-select>
    </div>
    <div v-if="currentItem.itemType == 'mathcoach'">
      <v-select
        v-model="currentItem.lti"
        label="LTI-Unterstützung"
        :items="['no', 'yes']"
        required
      ></v-select>
    </div>
    <v-text-field
      label="Lizenz"
      v-model="currentItem.license"
      required
    ></v-text-field>
    <v-select
      v-model="currentItem.Status"
      label="Status"
      :items="statuses"
      required
    ></v-select>
    <v-select
      v-if="userName == 'admin'"
      v-model="currentItem.owner"
      label="Eintrag von"
      :items="authorNames"
      required
    ></v-select>

    <v-btn color="primary" @click="session.mode = 'search'">Zurück</v-btn>
    <v-btn color="primary" @click="saveItem">Speichern</v-btn>
    <v-btn v-if="currentItem._id" color="error" @click="deleteItem"
      >Löschen</v-btn
    >
  </v-form>
  </v-col>
</v-row>
</template>

<script>
import { Items } from "../../api/collections/ItemsCollection";
import { Meteor } from "meteor/meteor";
export default {
  data() {
    return {
      session: this.$root.$data.session,
      languages: [{text: "Deutsch", value: "de"}, {text: "Englisch", value: "en"}, {text: "Spanisch", value: "es"}, {text: "Französisch", value: "fr"}, {text: "Italienisch", value: "it"}],
      statuses: [{text: "Öffentlich", value: "public"}, {text: "Privat", value: "private"}, {text: "Veraltet", value: "deprecated"}],
      jupyterFormats: [{text: "ipynb-Datei", value: "ipynb"}, {text: "Website", value: "website"},{text: "CoCalc", value: "cocalc"}, {text: "Binder", value: "binder"},{text: "Anderes Format", value: "other"}],
      jupyterKernels: [{text: "Python", value: "python"},{text: "SageMath", value: "sagemath"},{text: "Octave", value: "octave"}, {text: "Maxima", value: "maxima"}]
    };
  },
  props: {
    currentItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    saveItem() {
      this.currentItem.last_modified = new Date();
      if (!this.currentItem.owner) this.currentItem.owner = this.userName
      if (this.currentItem._id) Meteor.call("updateItem", this.currentItem);
      else {
        this.currentItem._id = Meteor.call("insertItem", this.currentItem);
      }
      this.session.mode = "search";
    },
    deleteItem() {
      if (confirm("Wollen Sie diesen Eintrag wirklich löschen?")) {
        Meteor.call("deleteItem", this.session.currentItem);
        this.session.mode = "search";
      }
    },
  },
  computed: {
    getOwner() {
      let owner = this.currentItem.owner;
      return this.userNames[owner] ? this.userNames[owner] : "Unbekannt";
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
    userNames() {
      let un = {};
      Meteor.users
        .find({})
        .fetch()
        .forEach((element) => {
          un[element.username] = element.name;
        });
      return un;
    },
    authorNames() {
      an = [];
      Meteor.users
        .find({})
        .fetch()
        .forEach((element) => {
          if (element.username != "admin")
            an.push({ text: element.name, value: element.username });
        });
      return an;
    },
    userName: function () {
      return Meteor.user() ? Meteor.user().username : null;
    },
  },
};
</script>