import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { APPLICATION_THEMES } from '~/constants';

const types = {
  SET_LAYOUT_THEME: 'SET_LAYOUT_THEME'
};

export const state = () => ({
  layoutTheme: APPLICATION_THEMES.light
});

type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  layoutTheme: state => state.layoutTheme
};

export const actions: ActionTree<RootState, RootState> = {
  setLayoutTheme({ commit }, theme) {
    commit(types.SET_LAYOUT_THEME, theme);
  }
};

export const mutations: MutationTree<RootState> = {
  [types.SET_LAYOUT_THEME](state, payload) {
    state.layoutTheme = payload;
  }
};
