<template>
  <header class="header">
    <h1 class="header__title">
      Where in the world?
    </h1>
    <button class="header__btn" @click="changeTheme">
      Dark Mode
    </button>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import applicationService from '~/services/application.service';

@Component
export default class LayoutHeader extends Vue {
  changeTheme() {
    applicationService.changeTheme();
  }
}
</script>
