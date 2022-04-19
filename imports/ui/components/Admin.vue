<template>
  <div>
    <v-row>
      <v-col>
        <v-card width="600" height="300" raised>
          <v-card-title>Load data from file:</v-card-title>
          <br />
          <v-card-text>
            <v-file-input
              accept=".json"
              label="Click here to select a .json file"
              outlined
              v-model="sessionFile"
            >
            </v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="session.mode='search'">Zurück</v-btn>
            <v-btn right @click="restoreData">Daten ersetzen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from "vue";
import { Items } from "../../api/collections/ItemsCollection";
export default {
  data() {
    return {
      session: this.$root.$data.session,
      sessionFile: null,
    };
  },
  methods: {
    restoreData() {
      if (!this.sessionFile) {
        alert("No File Chosen");
      }
      var reader = new FileReader();
      // Use the javascript reader object to load the contents
      // of the file in the v-model prop
      reader.readAsText(this.sessionFile);
      reader.onload = () => {
        this.restoreItemData(reader.result);
      };
    },
    restoreItemData(dataString) {
      const data = JSON.parse(dataString);
      if (!data) {
        alert("Incorrect Data Format in File");
        return;
      }
      if (
        confirm(
          "Do you REALLY want to replace all data on " +
            window.location.href +
            "?"
        )
      ) {
        Meteor.call("deleteItem", {});
        data.items.forEach((document) => {
          Meteor.call("insertItem", document);
        });
      }
      alert(
        "Insertion of " +
          data.items.length +
          " items done"
      );
      console.log("Found "+this.allItems.length);
    },
  },
  meteor: {
    allItems() {
      return Items.find({}).fetch();
    },
    restoreItems() {},
  },
};
</script>