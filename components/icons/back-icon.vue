<template>
  <svg width="16" height="12" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.5 10.443H5.9603L14.2016 2.20163L12 0L0 12L12 24L14.2016 21.7984L5.9603 13.557H33.5V10.443Z" :fill="color" />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class SearchIcon extends Vue {
    @Prop({ type: Boolean, default: false }) filled: boolean;

    get color() {
      return this.filled ? 'white' : '#888888';
    }
}
</script>
