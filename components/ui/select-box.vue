<template>
  <div v-click-outside="outsideClicked" class="ui_dropdown">
    <div class="ui_dropdown__button" @click="open = !open">
      {{ dropdownText }}
      <span class="button_arrow" />
    </div>
    <transition name="fade-slide">
      <div v-if="open" class="ui_dropdown__list">
        <ul class="dropdown_list">
          <li
            v-for="item in items"
            :key="item.value"
            class="dropdown_list__item"
            :class="{'dropdown_list__item--active': item.value === selectedValue}"
            @click="selectItem(item.value)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { DropdownItemModel } from '~/models/abstract.model';

@Component
export default class SelectBox extends Vue {
    @Prop({ type: String, required: true }) readonly placeholder: string;
    @Prop({ type: Array, required: true }) readonly items: DropdownItemModel[];
    @Prop() readonly value: string | null;

    selectedValue: string | null = null;
    open: boolean = false;

    constructor() {
      super();
      this.selectedValue = this.value || null;
    }

    get dropdownText() {
      return this.selectedValue ? this.items.find(item => item.value === this.selectedValue)?.title : this.placeholder;
    }

    selectItem(value: string) {
      this.selectedValue = this.selectedValue !== value ? value : null;
      this.open = false;
      this.$emit('select', this.selectedValue);
    }

    outsideClicked() {
      this.open = false;
    }
}
</script>

<style lang="scss" scoped>
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
.fade-slide-enter-to,
.fade-slide-leave {
  opacity: 1;
  transform: scaleY(1);
}
.fade-slide-enter-active {
  transition: all .3s ease;
}
.fade-slide-leave-active {
  transition: all .2s ease;
}
</style>
