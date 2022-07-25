<template>
  <div v-if="country" class="countries__card">
    <img v-lazy-load class="card__image" :data-src="country.flag" :alt="country.name" :style="`height: ${imageHeight}px;`">
    <div class="card__body">
      <nuxt-link :to="countryDetailUrl" class="card_title">
        {{ country.name }}
      </nuxt-link>
      <ul class="card_list">
        <li class="card_list__item">
          <span class="card_list__item--title">Population:</span>
          {{ country.population | numberWithComma }}
        </li>
        <li class="card_list__item">
          <span class="card_list__item--title">Region:</span>
          {{ country.region }}
        </li>
        <li class="card_list__item">
          <span class="card_list__item--title">Capital:</span>
          {{ country.capital }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { CountryModel } from '~/models/country.model';

@Component
export default class CountryCard extends Vue {
  @Prop({ required: true, type: Object, default: () => {} }) readonly country: CountryModel;
  @Prop({ required: true, type: Number, default: 200 }) readonly width: number;

  get countryDetailUrl() {
    return { name: 'countries-code', params: { code: this.country.alpha3Code.toLowerCase() } };
  }

  get imageHeight() {
    return this.width * 3 / 4;
  }
}
</script>
