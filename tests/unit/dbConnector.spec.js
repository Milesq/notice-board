import { createLocalVue } from '@vue/test-utils';
import Db from '../../src/plugins/db';
import { firestore } from 'firebase/app';

test('db connector is working', () => {
  const Vue = createLocalVue();

  Vue.use(Db);

  expect(Vue.prototype.$db).toBeDefined();
  expect(Vue.prototype.$db).toBeInstanceOf(firestore.Firestore);
});
