<template>
  <main>
    <layout-header />
    <nuxt />
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ApplicationService from '~/services/application.service';

@Component
export default class DefaultLayout extends Vue {
  mounted() {
    ApplicationService.initialTheme();
  }
}
</script>
