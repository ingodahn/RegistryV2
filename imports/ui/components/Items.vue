<template>
  <div>
    <h2>Items Template</h2>
    <v-form>
      <v-row>
        <v-col cols="12" sm="6">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, i) in itemsFound" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.Title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import { Items } from "../../api/collections/ItemsCollection";
export default {
  data() {
    return {
      session: this.$root.$data.session,
    };
  },
  meteor: {
    itemsFound() {
      const searchType = this.session.searchType, searchTerm = this.session.searchTerm;
       if (searchType == 'allTypes' && searchTerm.length < 3) {
          return [];
      }
    let pattern = {
              $or: [
                  {Title: {$regex: searchTerm, $options: 'i'}},
                  {Description: {$regex: searchTerm, $options: 'i'}}
              ]
          };
      //let pattern = {Title: {$regex:searchTerm, $options: 'i'}};

      if (searchType != 'allTypes') pattern.itemType=searchType;
      console.log(Items.find(pattern, {sort: {last_modified: -1}}).fetch().length);
      return Items.find(pattern).fetch();
      //return [{title: "Test", type: "scripts"}];
    }
  },
  methods: {},
  computed: {
  }
};
</script>

<style scoped>
</style>
