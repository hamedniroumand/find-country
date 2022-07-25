<template>
  <div class="container">
    <section class="filters">
      <search-form :query="$route.query.q" @submit="searchOnCountries" />
      <select-box :value="selectedRegionValue" :items="regions" placeholder="Filter by Region" @select="filterRegions" />
    </section>
    <transition-group
      v-if="filteredCountries.length"
      tag="section"
      name="fade"
      appear
      class="countries"
    >
      <country-card v-for="country in filteredCountries" :key="country.alpha3Code" :country="country" :width="cardWidth" />
    </transition-group>
    <p v-else class="not-found">
      No result found.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { Debounce } from '~/utils/decorator';
import { CountryModel } from '~/models/country.model';
import { DropdownItemModel } from '~/models/abstract.model';

@Component({
  computed: mapGetters('region', ['regions']),
  async asyncData({ store, error }) {
    try {
      const countries = await store.dispatch('country/fetchAllCountries');

      return {
        countries
      };
    } catch (err) {
      error({ statusCode: 400, message: 'Something went wrong.' });
    }
  }
})
export default class IndexPage extends Vue {
  /** *************** Properties *****************/
  countries: CountryModel[] = [];
  cardWidth: number = 0;
  region: DropdownItemModel | null = null;
  regions: DropdownItemModel[];

  /** *************** Getters *****************/

  /**
   * filter on country list and display them.
   */
  get filteredCountries() {
    let countries: CountryModel[] = [];

    countries = this.handleSearchCountryFilter(this.countries);
    countries = this.handleRegionFilter(countries);

    return countries;
  }

  /**
   * Get selected region object based on selected value of dropdown
   */
  get selectedRegion() {
    return this.regions.find(region => region.value.toLowerCase() === this.region?.value?.toLowerCase()) || null;
  }

  get selectedRegionValue() {
    return this.selectedRegion ? this.selectedRegion.value : null;
  }

  /** *************** Methods *****************/

  /**
   * Add or remove search query params.
   */
  @Debounce(500)
  searchOnCountries(country: string) {
    this.toggleQueryString({ key: 'q', value: country });
  }

  /**
   * Set selected region after choosing dropdown item and append or remove region query params.
   */
  filterRegions(regionValue: string | null) {
    this.region = this.regions.find(region => region.value.toLowerCase() === regionValue?.toLowerCase()) || null;
    this.toggleQueryString({ key: 'region', value: this.region?.title || null });
  }

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

  /**
   * Filter countries by their name.
  */
  handleSearchCountryFilter(countries: CountryModel[]): CountryModel[] {
    const search = this.$route.query.q?.toString()?.toLowerCase();

    if (!search) { return countries; }
    return countries.filter(country =>
      country.name.toLowerCase().includes(search)
    );
  }

  /**
   * Filter countries by their region.
  */
  handleRegionFilter(countries: CountryModel[]): CountryModel[] {
    if (!this.selectedRegionValue) { return countries; }
    return countries.filter(country => country.region.toLowerCase() === this.selectedRegionValue!.toLowerCase());
  }

  /**
   * Add or remove a query string to url
  */
  private toggleQueryString(query: { key: string, value: string | null }) {
    this.$router.push({
      query: {
        ...this.$route.query,
        [query.key]: query.value ? query.value?.toLowerCase() : undefined
      }
    });
  }

  /** *************** Vue Life cycles *****************/

  created() {
    if (process.client) {
      this.calcCardWidth();
      window.addEventListener('resize', this.calcCardWidth);
    }
    if (this.$route.query.region) {
      this.region = this.regions.find(region => region.title.toLowerCase() === this.$route.query.region) || null;
    }
  }

  destroyed() {
    window.removeEventListener('resize', this.calcCardWidth);
  }
}
</script>
