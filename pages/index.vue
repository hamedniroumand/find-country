<template>
  <div class="container">
    <section class="filters">
      <search-form :query="$route.query.q" @submit="searchOnCountries" />
      <div style="display: flex">
        <select-box :value="selectedRegionValue" :items="regions" placeholder="Filter by Region" @select="filterRegions" />
        <select-box :value="selectedRegionValue" :items="regions" placeholder="Filter by Region" @select="filterRegions" />
      </div>
    </section>
    <country-list :countries="filteredCountries" />
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
    return this.regions.find(region => region.title.toLowerCase() === this.$route.query?.region?.toString()?.toLowerCase()) || null;
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
    const region = this.regions.find(region => region.value.toLowerCase() === regionValue?.toLowerCase()) || null;

    this.toggleQueryString({ key: 'region', value: region?.title || null });
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
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @include responsive(md) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
