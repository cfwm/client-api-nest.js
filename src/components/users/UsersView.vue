<template>
  <v-container fluid>
    <v-row class="mt-5 mb-10" no-gutters>
      <v-col cols="auto">
        <b>Teste Engenheiro de Software Full Stack</b>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <v-card elevation="5">
          <v-row no-gutters class="pt-5">
            <v-col cols="auto">
              <v-btn
                class="ml-5"
                elevation="2"
                @click="openDialogAddUser"
              >Cadastrar
              </v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-autocomplete
                class="mr-5"
                v-model="searchModel"
                :items="users"
                item-text="nome"
                item-value="_id"
                outlined
                dense
                label="Busca"
              ></v-autocomplete>
                <!-- prepend-icon="" -->
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="12">
              <UsersTable
                :users="users"
                class="mx-5 mb-5"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog max-width="50vw" v-model="dialogAddEditUser">
      <AddEditUserDialog
        v-if="dialogAddEditUser"
        :editedUser="selectedUser"
        @closeDialog="closeAddEditUserDialog"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { api } from '@/plugins/axios';
import UsersTable from '@/components/users/UsersTable.vue';
import AddEditUserDialog from '@/components/users/AddEditUserDialog.vue';
export default {
  components: { UsersTable, AddEditUserDialog } ,

  data(){
    return{
      dialogAddEditUser: false,

      users: [],
      selectedUser: null,

      searchModel: null,

    }
  },

  async created() {
    await this.readUsers();
  },

  methods: {
    async readUsers(){
      try {
        const ret = await api.get('users');
        if(ret.status === 200) this.users = ret.data;
      } catch (error) {
        console.log('Error -> ', error)
      }
    },

    openDialogAddUser(){
      this.dialogAddEditUser = true;
    },

    async closeAddEditUserDialog(){
      this.dialogAddEditUser = false;
      this.selectedUser = null;
      await this.readUsers();
    }
  },
}
</script>

<style>

</style>