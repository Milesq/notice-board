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
export default {
  data: () => ({
    name: '',
  }),
  methods: {
    submit() {},
  },
};
</script>
