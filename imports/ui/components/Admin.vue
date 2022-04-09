<template>
<div>
  <h1>Admin Tools</h1>
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
              <v-btn right @click="restoreData">Daten ersetzen</v-btn>
            </v-card-actions>
          </v-card>
      </v-col>
  </v-row>
</div>
</template>

<script>
import Vue from "vue";
import { items } from "../../api/collections/ItemsCollection";
export default {
  data() {
    return {
        sessionFile: null
    };
  },
  methods: {
      restoreData () {
          alert('Restoring');
      }
  },
  meteor: {
    allItems() {
      return items.find({}).fetch();
    },
    restoreItems() {
        
    }
  },
};
</script>