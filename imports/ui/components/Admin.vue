<template>
  <div>
    <v-row>
      <v-btn color="primary" class="mx-1 my-1" @click="session.mode='search'">Back</v-btn>
      <v-btn color="primary" class="mx-1 my-1" @click="backupAll">Backup Data</v-btn>
      <v-btn color="warning" class="mx-1 my-1" @click="adminMode='restoreData'">Restore Data</v-btn>
      <v-btn color="primary" class="mx-1 my-1" @click="adminMode='users'">User Management</v-btn>
    </v-row>
    <v-row v-if="adminMode == 'restoreData'">
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
            
            <v-btn right @click="restoreData">Daten ersetzen</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <user-management v-if="adminMode == 'users'"></user-management>
  </div>
</template>

<script>
//import Vue from "vue";
import { Items } from "../../api/collections/ItemsCollection";
import { saveAs } from "file-saver";
import userManagement from "./UserManagement.vue";
export default {
  data() {
    return {
      session: this.$root.$data.session,
      sessionFile: null,
      adminMode: 'none',
    };
  },
  components: {
    userManagement,
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
    },
     backupAll () {
        var backupItems=this.allItems;
        var backupUsers=this.allUsers;
        const backupData = {
          items: backupItems,
          users: backupUsers,
          date: new Date()
        };
        let backupString = JSON.stringify(backupData,null,"\t");
        var blob=new Blob([backupString],{type: "text/plain;charset=utf-8"});
        saveAs(blob,"backup.json");
    },
  },
  meteor: {
    allItems() {
      return Items.find({}).fetch();
    },
    allUsers() {
      return Meteor.users.find({}).fetch();
    },
    restoreItems() {},
  },
};
</script>