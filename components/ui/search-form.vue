<template>
  <div class="search_form">
    <search-icon :filled="layoutTheme === 'dark'" />
    <input
      name="search"
      type="text"
      placeholder="Search for a country..."
      :value="search"
      @input="$emit('submit', $event.target.value)"
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  computed: mapGetters('application', ['layoutTheme'])
})
export default class SearchForm extends Vue {
  @Prop({ default: '', type: String }) readonly query: string;

  search: string = '';
  layoutTheme: string;

  created() {
    this.search = this.query;
  }

  @Watch('query')
  onQueryChanged() {
    this.search = this.query;
  }
}
</script>
