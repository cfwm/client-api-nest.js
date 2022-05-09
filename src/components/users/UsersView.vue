<template>
  <div>
    <v-row class="my-5" no-gutters>
      <v-col cols="auto">
        <h1>Teste Engenheiro de Software Full Stack</h1>
      </v-col>
    </v-row>

    <UsersTable
      :users="users"
      @openDialogAddUser="openDialogAddUser"
      @openDetails="openDetails"
      @confirmDeletion="confirmDeletion"
    />

    <v-dialog persistent max-width="50vw" v-model="openAddEditUser">
      <AddEditUserDialog
        v-if="openAddEditUser"
        :editedUser="selectedUser"
        @createUser="createUser"
        @updateUser="updateUser"
        @closeDialog="closeAddEditUserDialog"
      />
    </v-dialog>

    <v-dialog persistent max-width="30vw" v-model="openAlertDialog">
      <AlertDialog
        v-if="openAlertDialog"
        :title="titleAlertDialog"
        :text="textAlertDialog"
        :showConfirmationButton="showConfirmButtonAlertDialog"
        @closeDialog="closeAlertDialog"
        @confirmDialog="deleteUser"
      />
    </v-dialog>
  </div>
</template>

<script>
import { api } from '@/plugins/api';
import UsersTable from '@/components/users/UsersTable.vue';
import AddEditUserDialog from '@/components/users/AddEditUserDialog.vue';
import AlertDialog from '@/components/global/AlertDialog.vue';
export default {

  components: { UsersTable, AddEditUserDialog, AlertDialog } ,

  data() {
    return {
      openAddEditUser: false,
      openAlertDialog: false,
      showConfirmButtonAlertDialog: false,
      titleAlertDialog: '',
      textAlertDialog: '',
      users: [],
      selectedUser: null,

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
        const errorData = {
          title: error?.title || 'Erro',
          text: error?.text || 'Não foi possível obter as informações dos usuários.'
        }
        this.openErrorAlertDialog(errorData);
      }
    },

    async updateUser(user){
      try {
        const ret = await api.put(`users/${user._id}`, {
          name: user.name,
          surname: user.surname,
          email: user.email,
          age: user.age,
          address: user.address,
          github: user.github,
        });
        if(ret.status === 200) {
          await this.closeAddEditUserDialog();
          await this.readUsers();
        }
      } catch (error) {
        const errorData = {
          title: error?.title || 'Erro',
          text: error?.text || 'Não foi possível atualizar as informações do usuário.'
        }
        this.openErrorAlertDialog(errorData);
      }
    },

    async createUser(user){
      try {
        const ret = await api.post('users', user);
        if(ret.status === 201) {
          await this.closeAddEditUserDialog();
          await this.readUsers();
        }
      } catch (error) {
        const errorData = {
          title: error?.title || 'Erro',
          text: error?.text || 'Não foi possível criar o usuário.'
        }
        this.openErrorAlertDialog(errorData);
      }
    },

    openDialogAddUser(){
      this.openAddEditUser = true;
    },

    openDetails(item){
      this.selectedUser = item;
      this.openAddEditUser = true;
    },

    async closeAddEditUserDialog(){
      this.openAddEditUser = false;
      this.selectedUser = null;
      await this.readUsers();
    },

    confirmDeletion(item){
      this.selectedUser = item;
      this.titleAlertDialog = 'Exclusão de Usuário';
      this.textAlertDialog = `Tem certeza de que deseja excluir o usuário ${this.selectedUser.name} ${this.selectedUser.surname}?`;
      this.showConfirmButtonAlertDialog = true;
      this.openAlertDialog = true;
    },

    async deleteUser(){
      try {
        const ret = await api.delete(`users/${this.selectedUser._id}`);
        if(ret.status === 200) {
          this.closeAlertDialog();
          await this.readUsers();
        }
      } catch (error) {
        const errorData = {
          title: error?.title || 'Erro',
          text: error?.text || 'Não foi possível excluir o usuário.'
        }
        this.openErrorAlertDialog(errorData);
      }
    },

    closeAlertDialog(){
      this.openAlertDialog = false;
      this.showConfirmButtonAlertDialog = false;
      this.selectedUser = null;
      this.titleAlertDialog = '';
      this.textAlertDialog = '';
    },

    openErrorAlertDialog(error = null){
      this.titleAlertDialog = error?.title || 'Erro';
      this.textAlertDialog = error?.text || 'Não foi possível realizar a ação.';
      this.showConfirmButtonAlertDialog = false;
      this.openAlertDialog = true;
    }
  },
}
</script>

<style scoped>

</style>