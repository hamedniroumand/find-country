<template>
  <div v-if="country" class="container single_country">
    <button class="ui-button back-button" @click="$router.back()">
      <back-icon />
      Back
    </button>
    <div class="single_country__row">
      <div class="row__item">
        <img :src="country.flag" :alt="country.name">
      </div>
      <div class="row__item country_col">
        <h1 class="country_col__title">
          {{ country.name }}
        </h1>
        <ul class="country_col__list">
          <li class="country_col__list__item">
            <span>Native Name:</span> {{ country.nativeName }}
          </li>
          <li class="country_col__list__item">
            <span>Population:</span> {{ country.population | numberWithComma }}
          </li>
          <li class="country_col__list__item">
            <span>Region:</span> {{ country.region }}
          </li>
          <li class="country_col__list__item">
            <span>Sub Region:</span> {{ country.subregion }}
          </li>
          <li class="country_col__list__item">
            <span>Capital:</span> {{ country.capital }}
          </li>
          <li class="country_col__list__item">
            <span>Top Level Domain:</span> {{ country.topLevelDomain | arrayToStringWithComma }}
          </li>
          <li class="country_col__list__item">
            <span>Currencies:</span> {{ country.currencies.map(item => item.name) | arrayToStringWithComma }}
          </li>
          <li class="country_col__list__item">
            <span>languages:</span> {{ country.languages.map(item => item.name) | arrayToStringWithComma }}
          </li>
        </ul>
        <div v-if="countryBorders.length" class="borders">
          <p class="borders__title">
            Border Countries:
          </p>
          <div class="border_list">
            <nuxt-link
              v-for="border in countryBorders"
              :key="border.alpha2Code"
              :to="{ name: 'countries-code', params: { code: border.alpha3Code.toLowerCase() } }"
              class="ui-button border_list__btn"
              @click="$router.back()"
            >
              {{ border.name }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { AxiosError } from 'axios';
import { Component } from 'vue-property-decorator';
import { CountryModel } from '~/models/country.model';

@Component({
  validate({ route }) {
    const { code } = route.params;

    return !!code && code.length === 3 && /^[a-z]*$/.test(code);
  },
  async asyncData({ store, route, error: nuxtError }) {
    try {
      const countryCode = route.params.code;
      const [country] = await Promise.all([
        store.dispatch('country/fetchSingleCountry', countryCode),
        store.dispatch('country/fetchAllCountries')
      ]);

      return {
        country
      };
    } catch (err) {
      const error = err as AxiosError;

      if (error.response?.data.status === 404) {
        nuxtError({ statusCode: 404, message: 'This page could not be found' });
      }
    }
  }
})
export default class CountrySinglePage extends Vue {
  country: CountryModel | null = null;

  get countryBorders() {
    if (!this.country?.borders) { return []; }
    return this.country.borders.map(code => this.$store.getters['country/getCountyByCode'](code));
  }
}
</script>

<style lang="scss" scoped>
.single_country {
  .back-button {
    margin-bottom: 3rem;
  }

  &__row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;

    @include responsive(md) {
      flex-direction: row;
      gap: 10rem;
    }

    .row__item {
      width: 100%;
      img {
        width: 100%;
      }
    }

    .country_col {
      &__list {
        list-style: none;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        gap: 0.8rem;

        @include responsive(md) {
          max-height: 9rem;
        }

        &__item {
          span {
            font-weight: $font-weight-medium;
          }
        }
      }
    }
  }

  .borders {
    display: flex;
    margin-top: 3rem;
    gap: 1rem;
    flex-direction: column;

    @include responsive(md) {
      gap: 3rem;
      flex-direction: row;
    }

    &__title {
        flex: none;
        font-weight: $font-weight-medium;
    }

    .border_list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      &__btn {
        text-decoration: none;
      }
    }
  }
}

</style>
