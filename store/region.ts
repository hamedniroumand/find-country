import { GetterTree } from 'vuex';
import { DropdownItemModel } from '~/models/abstract.model';

export const state = () => ({
  regions: [
    { title: 'Africa', value: 'africa' },
    { title: 'America', value: 'americas' },
    { title: 'Asia', value: 'asia' },
    { title: 'Europe', value: 'europe' },
    { title: 'Oceania', value: 'oceania' }
  ] as DropdownItemModel[],
  sorts: [
    { title: 'Sort as Country Name', value: 'country-name' },
    { title: 'Sort as Population', value: 'population' }
  ]
});

type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  regions: state => state.regions,
  sorts: state => state.sorts
};
