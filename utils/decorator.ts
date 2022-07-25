import { createDecorator } from 'vue-class-component';
import debounce from 'lodash.debounce';

export const Debounce = (waitMs: number) =>
  createDecorator((options, key) => {
    if (options.methods && options.methods[key]) {
      const originalMethod = options.methods[key];
      const debounceMethod = debounce(originalMethod, waitMs, {
        leading: false,
        trailing: true
      });

      options.methods[key] = async function (...args: any) {
        await debounceMethod.apply(this, args);
      };
    }
  });
