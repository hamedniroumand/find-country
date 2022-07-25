import { Vue } from 'vue/types/vue';

export default function (vue: typeof Vue) {
  vue.directive('click-outside', {
    bind(el: any, binding: any, vnode: any) {
      el.clickOutsideEvent = function (event: any) {
        if (!(el === event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event);
        }
      };
      document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind(el) {
      document.body.removeEventListener('click', (el as any).clickOutsideEvent);
    }
  });
}
