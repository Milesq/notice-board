<template>
  <v-card>
    <v-card-title>{{ $t('addUsers') }}</v-card-title>
    <v-card-text>
      <v-form ref="form" @submit.prevent="createUser" class="d-flex align-center mb-1">
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
        :footer-props="{ 'page-text': '' }"
      >
        <template #item.name="props">
          <v-edit-dialog
            transition="slide-y-transition"
            :return-value.sync="props.item.name"
            @save="updateUser(props.item)"
          >
            <span>
              {{ props.item.name }}
            </span>

            <template #input>
              <v-text-field v-model="props.item.name" single-line />
            </template>
          </v-edit-dialog>
        </template>
        <template #item.actions="{ item }">
          <v-btn class="mx-2" fab dark x-small color="error" @click="deleteUser(item)">
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <v-data-table
        v-else
        class="elevation-1 mt-7"
        :items-per-page="5"
        :headers="headers"
        :items="Array(4).fill({ name: '' })"
        :footer-props="{ 'page-text': '' }"
      >
        <template #item.name>
          <v-skeleton-loader type="table-cell" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
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
        {
          value: 'actions',
        },
      ],
    };
  },
  methods: {
    createUser() {
      if (!this.$refs.form.validate()) return;

      this.$refs.form.resetValidation();

      const newDoc = this.$users.doc();
      newDoc.set({
        name: this.newName,
      });

      this.users.push({ name: this.newName, id: newDoc.id });

      this.newName = '';
    },
    async readUsers() {
      const { docs: users } = await this.$users.get();

      return users.map(user => user.exists && { ...user.data(), id: user.id });
    },
    updateUser({ id, name }) {
      this.$users.doc(id).update({ name });
    },
    deleteUser({ id, name }) {
      if (confirm(this.$t('deletePrompt', { name }))) {
        this.users = this.users.filter(user => user.name != name);
        this.$users.doc(id).delete();
      }
    },
  },
  async created() {
    this.users = await this.readUsers();
  },
};
</script>
