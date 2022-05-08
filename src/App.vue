<template>
  <v-app :style="cssVars" class="no-scroll">
    <v-row class="bg-color">
      <v-col cols="12">
        <UsersView class="mx-10"/>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import UsersView from '@/components/users/UsersView.vue'

export default {
  name: 'App',

  components: {
    UsersView
  },

  computed: {
    cssVars(){
      return {
        '--bg-color': this.$vuetify.theme.themes.light.background,
      }
    }
  },
};
</script>

<style>
  .auto-scroll {
    overflow-y: auto;
    overflow-x: auto;
  }

  .no-scroll {
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .bg-color {
    background-color: var(--bg-color);
  }
</style>
