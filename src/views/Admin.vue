<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <AdminUsers />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AdminUsers from '@/components/AdminUsers.vue';

export default {
  components: {
    AdminUsers,
  },
};
</script>
