import { GetterTree } from 'vuex';
import { DropdownItemModel } from '~/models/abstract.model';

export const state = () => ({
  regions: [
    { title: 'Africa', value: 'Africa' },
    { title: 'America', value: 'Americas' },
    { title: 'Asia', value: 'Asia' },
    { title: 'Europe', value: 'Europe' },
    { title: 'Oceania', value: 'Oceania' }
  ] as DropdownItemModel[]
});

type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  regions: state => state.regions
};
