<template>
  <transition-group
    v-if="countries.length"
    tag="section"
    name="fade"
    appear
    class="countries"
  >
    <country-card v-for="country in countries" :key="country.alpha3Code" :country="country" :width="cardWidth" />
  </transition-group>
  <p v-else class="not-found">
    No result found.
  </p>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { CountryModel } from '~/models/country.model';

@Component
export default class CountryList extends Vue {
    /** *************** Props *****************/
    @Prop({ required: true, type: Array, default: () => [] }) readonly countries: CountryModel[];

    /** *************** Properties *****************/
    cardWidth: number = 200;

    /** *************** Methods *****************/
    /**
   * Calculating the width of the country card image to calculate their height based on 4/3 ratio.
   */
    calcCardWidth() {
      this.$nextTick(() => {
        const width = document.querySelector('.countries__card')?.clientWidth;

        if (width) {
          this.cardWidth = width;
        }
      });
    }

    /** *************** Vue Life cycles *****************/
    created() {
      if (process.client) {
        this.calcCardWidth();
        window.addEventListener('resize', this.calcCardWidth);
      }
    }

    destroyed() {
      window.removeEventListener('resize', this.calcCardWidth);
    }
}
</script>
