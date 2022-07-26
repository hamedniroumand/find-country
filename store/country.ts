import { ActionTree, MutationTree, GetterTree } from 'vuex';
import { CountryModel } from '~/models/country.model';

const types = {
  SET_COUNTRIES: 'SET_COUNTRIES'
};

export const state = () => ({
  countries: [] as CountryModel[]
});

type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  getCountyByCode: state => (code: string) => {
    return state.countries.find(country => country.alpha3Code === code);
  }
};

export const actions: ActionTree<RootState, RootState> = {
  async fetchAllCountries({ commit, state }) {
    if (state.countries.length) {
      return state.countries;
    }
    const countries = await this.$axios.$get('https://restcountries.com/v2/all');

    commit(types.SET_COUNTRIES, countries);
    return countries;
  },
  // eslint-disable-next-line no-empty-pattern
  fetchSingleCountry({ }, countryCode: string) {
    return this.$axios.$get(`https://restcountries.com/v2/alpha/${countryCode}`);
  }
};

export const mutations: MutationTree<RootState> = {
  [types.SET_COUNTRIES](state, payload) {
    state.countries = payload;
  }
};
