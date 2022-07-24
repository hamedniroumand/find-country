<template>
  <header class="header">
    <h1 class="header__title">
      Where in the world?
    </h1>
    <button class="header__btn" @click="changeTheme">
      <moon-icon :filled="isMoonIconFilled" />
      Dark Mode
    </button>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import applicationService from '~/services/application.service';

@Component({
  computed: mapGetters('application', ['layoutTheme'])
})
export default class LayoutHeader extends Vue {
  layoutTheme: string;

  changeTheme() {
    applicationService.changeTheme();
  }

  get isMoonIconFilled() {
    return this.layoutTheme === 'dark';
  }
}
</script>
