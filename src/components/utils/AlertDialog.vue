<template>
  <v-card>
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="12" align="center">
          {{ title }}
        </v-col>
      </v-row>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" align="center">
          {{ text }}
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider class="" />

    <v-card-actions>
      <v-row no-gutters justify="center">
        <v-col cols="auto">
          <v-btn
            elevation="2"
            @click="closeDialog"
          >Cancelar
          </v-btn>
        </v-col>

        <v-col cols="auto" v-if="showConfirmationButton">
          <v-btn
            class="ml-3"
            elevation="2"
            @click="confirmDialog"
          >Confirmar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: { type: String, default: () => '' },
    text: { type: String, default: () => '' },
    showConfirmationButton: { type: Boolean, default: () => false }
  },

  methods: {
    closeDialog(data = null){
      this.$emit('closeDialog', data);
    },

    confirmDialog(data = null){
      this.$emit('confirmDialog', data);
    },

  }
}
</script>

<style>

</style>