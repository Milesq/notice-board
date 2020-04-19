<template>
  <v-card>
    <v-card-text>
      <v-form ref="form" @submit.prevent="newUser" class="d-flex align-center mb-1">
        <v-text-field :rules="nameRules" v-model="newName" :label="$t('nameAndSurname')" />
        <v-btn type="submit" class="ma-2" tile outlined color="primary">
          <v-icon left>mdi-check</v-icon>Save
        </v-btn>
      </v-form>

      <v-divider />
      <v-text-field
        :label="$t('search')"
        append-icon="mdi-search"
        hide-details
        v-model="searchText"
      />

      <v-data-table
        v-if="users.length"
        class="elevation-1 mt-7"
        :items-per-page="5"
        :headers="headers"
        :items="users"
        :search="searchText"
      >
        <template #item.name="props">
          <v-edit-dialog
            transition="slide-y-transition"
            :return-value.sync="props.item.name"
            @save="update"
          >
            {{ props.item.name }}
            <template #input>
              <v-text-field v-model="props.item.name" single-line />
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>

      <v-data-table
        v-else
        class="elevation-1 mt-7"
        :items-per-page="5"
        :headers="headers"
        :items="Array(5).fill({ name: '' })"
      >
        <template #item.name>
          <v-skeleton-loader type="table-cell" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line
import { firestore } from 'firebase/app';

export default {
  data() {
    return {
      searchText: '',
      newName: '',
      users: [],
      nameRules: [
        name => name.length == 0 || /^[a-zA-Z\s]+$/.test(name) || this.$t('nameErrors[0]'),
        name => name.length == 0 || /.+\s.+/.test(name) || this.$t('nameErrors[1]'),
      ],
      headers: [
        {
          text: this.$t('name'),
          align: 'start',
          value: 'name',
        },
      ],
    };
  },
  methods: {
    newUser() {
      if (!this.$refs.form.validate()) return;

      this.$refs.form.resetValidation();
      this.users.push({ name: this.newName });
      this.newName = '';
      this.update();
    },
    update() {
      console.log(this.users);
    },
  },
  async created() {
    /** @type {firestore.Firestore} */
    const db = this.$db.collection('users');
    const { docs: users } = await db.get();

    this.users = users.map(user => user.exists && user.data());
  },
};
</script>
