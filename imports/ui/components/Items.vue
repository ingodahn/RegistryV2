<template>
  <div>
    <v-form v-if="somethingFound">
      <v-row>
        <v-col>
          <v-list three-line>
            <v-list-item-group>
              <v-list-item
                v-for="(item, i) in itemsFound"
                :key="i"
                @click="showItemDetails(item)"
              >
                <v-img
                  :src="getIcon(item.itemType)"
                  max-width="40"
                  max-height="40"
                  class="mx-2"
                ></v-img>
                <v-list-item-content>
                  <a :href="item.URL" target="_blank">
                    <v-list-item-title v-text="item.Title"></v-list-item-title>
                  </a>
                  <v-list-item-subtitle
                    v-text="item.Description"
                    :class="item.Status"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-form>
    <v-row class="mx-1" v-else><p>Keine Ergebnisse gefunden.</p></v-row>
  </div>
</template>

<script>
import { Items } from "../../api/collections/ItemsCollection";
import { Meteor } from "meteor/meteor";
export default {
  data() {
    return {
      session: this.$root.$data.session,
    };
  },
  meteor: {
    itemsFound() {
      const searchType = this.session.searchType,
        searchTerm = this.session.searchTerm;
      if (searchType == "allTypes" && searchTerm.length < 3) {
        return [];
      }

      let pattern = {
        $or: [
          { Title: { $regex: searchTerm, $options: "i" } },
          { Description: { $regex: searchTerm, $options: "i" } },
        ],
      };
      if (searchType != "allTypes") pattern.itemType = searchType;
      return Items.find(pattern, { sort: { last_modified: -1 } }).fetch();
    },
    somethingFound() {
      return this.itemsFound.length > 0;
    },
  },
  methods: {
    getIcon(type) {
      const base = "/images/";
      switch (type) {
        case "scripts":
          return base + "scripts.png";
          break;
        case "jupyter":
          return base + "jupyter.png";
          break;
        case "sagecell":
          return base + "sagecell.png";
          break;
        case "mathcoach":
          return base + "mathcoach.png";
          break;
        default:
          return base + "script.png";
      }
    },
    showItemDetails(item) {
      if (this.userName == item.owner || this.isAdmin) {
        this.session.mode = "itemEdit";
      } else {
        this.session.mode = "itemDetail";
      }
      this.session.currentItem = item;
    },
  },
  computed: {
    isAdmin: function () {
      return this.userName == "admin";
    },
    userName: function () {
      return Meteor.user() ? Meteor.user().username : null;
    },
  },
};
</script>

<style scoped>
.deprecated {
  background-color: #f44336;
}
.private {
  background-color: #ff9800;
}
</style>
