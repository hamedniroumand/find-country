import { ActionTree } from 'vuex';

export const state = () => ({});

type RootState = ReturnType<typeof state>;

export const actions: ActionTree<RootState, RootState> = {
  async fetchAllCountries() {
    const countries = await this.$axios.$get('https://restcountries.com/v2/all');

    return countries;
  }
};
