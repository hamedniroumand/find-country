import Vue from 'vue';

export default (vue: typeof Vue) => {
  vue.filter('numberWithComma', (value: string | number) => {
    if (!value) { return ''; }
    return String(value).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  });
};
