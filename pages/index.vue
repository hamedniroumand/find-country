<template>
  <div class="container">
    <section class="filters">
      <search-form :query="$route.query.q" @submit="searchOnCountries" />
      <div class="dropdowns">
        <select-box :value="selectedSortValue" :items="sorts" placeholder="Sort Countries" @select="sortCounties" />
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
import { SORT_VALUES } from '../constants';
import { Debounce } from '~/utils/decorator';
import { CountryModel } from '~/models/country.model';
import { DropdownItemModel } from '~/models/abstract.model';

@Component({
  computed: mapGetters('region', ['regions', 'sorts']),
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
  sorts: DropdownItemModel[];

  /** *************** Getters *****************/
  /**
   * filter on country list and display them.
   */
  get filteredCountries() {
    let countries: CountryModel[] = [];

    countries = this.handleSearchCountries(this.countries);
    countries = this.handleFilterRegion(countries);
    countries = this.handleSortCountries(countries);

    return countries;
  }

  /**
   * Get selected region object based on selected value of dropdown.
   */
  get selectedRegion() {
    return this.regions.find(region => region.value.toLowerCase() === this.$route.query?.region?.toString()?.toLowerCase()) || null;
  }

  get selectedRegionValue() {
    return this.selectedRegion ? this.selectedRegion.value : null;
  }

  /**
   * Get selected sort object based on selected value of dropdown.
   */
  get selectedSort() {
    return this.sorts.find(sort => sort.value.toLowerCase() === this.$route.query?.sort?.toString()?.toLowerCase()) || this.sorts[0];
  }

  get selectedSortValue() {
    return this.selectedSort ? this.selectedSort.value : null;
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
   * Add or remove region value from url's query strings after region selected
   */
  filterRegions(regionValue: string | null) {
    this.toggleQueryString({ key: 'region', value: regionValue });
  }

  /**
   * Add or remove sort value from url's query strings after sort selected.
  */
  sortCounties(sortValue: string | null) {
    this.toggleQueryString({ key: 'sort', value: sortValue });
  }

  /**
   * Filter countries by their name.
  */
  handleSearchCountries(countries: CountryModel[]): CountryModel[] {
    const search = this.$route.query.q?.toString()?.toLowerCase();

    if (!search) { return countries; }
    return countries.filter(country =>
      country.name.toLowerCase().includes(search)
    );
  }

  /**
   * Filter countries by their region.
  */
  handleFilterRegion(countries: CountryModel[]): CountryModel[] {
    if (!this.selectedRegionValue) { return countries; }
    return countries.filter(country => country.region.toLowerCase() === this.selectedRegionValue!.toLowerCase());
  }

  /**
   * Sort countries as population or name.
  */
  handleSortCountries(countries: CountryModel[]): CountryModel[] {
    if (!this.selectedSortValue) { return countries; }
    if (this.selectedSort?.value === SORT_VALUES.population) {
      return [...countries].sort((a, b) => b.population - a.population);
    }
    return [...countries].sort((a, b) => a.name.localeCompare(b.name));
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

  .dropdowns {
    display: flex;
    gap: .5rem;
    flex-direction: column;
    align-items: flex-start;

    @include responsive(md) {
      flex-direction: row;
    }
  }
}
</style>
