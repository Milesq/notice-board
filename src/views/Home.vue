<template>
  <v-container>
    <v-row justify="center">
      <v-col sm="8" md="4">
        <v-card>
          <v-card-title>{{ $t('typeName') }}</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="submit">
              <v-text-field v-model="name" :label="$t('nameAndSurname')" />
              <v-divider />
              <v-card-actions>
                <v-spacer />
                <v-btn type="submit" color="primary">ok</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from '../../config.json';

export default {
  data: () => ({
    name: '',
  }),
  methods: {
    async submit() {
      const data = await fetch(`${config.firebaseAPI}/checkUserName`, {
        method: 'POST',
        body: JSON.stringify({ name: this.name }),
      }).then(resp => resp.text());

      console.log(data);
    },
  },
};
</script>
