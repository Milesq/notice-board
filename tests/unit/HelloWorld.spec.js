import Vue from 'vue';
import Vuetify from 'vuetify';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import HelloWorld from '@/components/HelloWorld';

Vue.use(Vuetify);

const localVue = createLocalVue();
localVue.use(Vuetify);

describe('CustomNavigationDrawer.vue', () => {
  const vuetify = new Vuetify();

  it('should show props', () => {
    const wrapper = shallowMount(HelloWorld, {
      localVue,
      vuetify,
      propsData: {
        msg: 'abc',
      },
    });

    expect(wrapper.html()).toMatch(/abc/);
  });
});
