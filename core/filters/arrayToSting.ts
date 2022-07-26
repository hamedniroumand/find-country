import Vue from 'vue';

export default (vue: typeof Vue) => {
  vue.filter('arrayToStringWithComma', (value: string[]) => {
    if (!value) { return ''; }
    return Array.isArray(value) ? value.join(', ') : value;
  });
};
