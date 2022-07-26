<template>
  <div>
    <layout-header />
    <main class="layout_wrapper">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ApplicationService from '~/services/application.service';

@Component
export default class DefaultLayout extends Vue {
  mounted() {
    ApplicationService.initialTheme();
  }
}
</script>
