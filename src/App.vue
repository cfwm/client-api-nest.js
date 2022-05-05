<template>
  <v-app>
    <UsersView />
  </v-app>
</template>

<script>
import UsersView from '@/components/users/UsersView.vue'

export default {
  name: 'App',

  components: {
    UsersView
  },

  data: () => ({
    //
  }),
};
</script>
