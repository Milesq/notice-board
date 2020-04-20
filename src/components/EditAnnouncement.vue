<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template #activator="{ on }">
      <div v-on="on">
        <slot></slot>
      </div>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container width="50%" class="py-5 px-sm-10">
        <v-row>
          <v-col cols="12" sm="6" class="mx-auto">
            <v-form>
              <v-text-field width="50%" :label="$t('titleWord')" outlined />
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
};
</script>
