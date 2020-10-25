<template>
  <v-main class="grey lighten-5">
    <v-container class="mt-8">
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <AdminUsers />
        </v-col>
        <v-col cols="12" md="6" lg="8">
          <AdminAnnouncements />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import AdminUsers from '@/components/AdminUsers.vue';
import AdminAnnouncements from '@/components/AdminAnnouncements.vue';

export default {
  components: {
    AdminUsers,
    AdminAnnouncements,
  },
};
</script>
