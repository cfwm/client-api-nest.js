<template>
  <v-card elevation="5" class="pb-5" rounded="lg">
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="9">
          <v-btn
            color="primary"
            class="ml-5"
            elevation="2"
            @click="openDialogAddUser"
          >Cadastrar
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            single-line
            hide-details
            class="mr-5"
          />
        </v-col>
      </v-row>
    </v-card-title>

    <v-data-table
      height="60vh"
      :headers="tableHeaders"
      :items="users"
      :search="search"
      :items-per-page="10"
      class="elevation-5 mx-10 rounded-border"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }"
    >
      <template v-for="header in tableHeaders" v-slot:[`header.${header.value}`]="{}">
        <v-row :key="header.value" no-gutters>
          <v-col>{{ header.text }}</v-col>
        </v-row>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-row no-gutters>
          <v-col>
            <v-tooltip color="green" bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  v-on="on"
                  @click="openDetails(item)"
                >mdi-eye
                </v-icon>
              </template>
              <span>Visualizar</span>
            </v-tooltip>

            <v-tooltip color="error" bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="ml-2"
                  small
                  v-on="on"
                  @click="confirmDeletion(item)"
                >mdi-delete
                </v-icon>
              </template>
              <span>Remover</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    users: { type: Array, default: () => [] }
  },

  data(){
    return{
      search: '',
      tableHeaders: [
        { text: 'ID', align: 'start', sortable: true, value: '_id', content: (item, value) => item[value] },
        { text: 'Nome', align: 'start', sortable: true, value: 'name', content: (item, value) => item[value] },
        { text: 'Sobrenome', align: 'start', sortable: true, value: 'surname', content: (item, value) => item[value] },
        { text: 'E-mail', align: 'start', sortable: true, value: 'email', content: (item, value) => item[value] },
        { text: 'Idade', align: 'start', sortable: true, value: 'age', content: (item, value) => item[value] },
        { text: 'CEP', align: 'start', sortable: true, value: 'address.cep', content: (item, value) => item[value] },
        { text: 'Login GitHub', align: 'start', sortable: true, value: 'github.login', content: (item, value) => item[value] },
        { text: 'Ações', align: 'start', sortable: false, value: 'actions', content: (item, value) => item[value] },
      ]
    }
  },

  methods: {
    openDialogAddUser(){
      this.$emit('openDialogAddUser')
    },

    openDetails(item){
      this.$emit('openDetails', item)
    },

    confirmDeletion(item){
      this.$emit('confirmDeletion', item)
    },
  }
}
</script>

<style scoped>
  .rounded-border {
    border-radius: 10px !important;
  }
</style>