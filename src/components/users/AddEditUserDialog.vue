<template>
  <v-card>
    <v-card-title>
      <v-row no-gutters>
        <v-col cols="6">
          {{ dialogTitle }}
        </v-col>
        <v-col cols="6" align="end">
          <v-icon @click="closeDialog"
          >mdi-close
          </v-icon>
        </v-col>
      </v-row>
    </v-card-title>

    <v-divider class="mb-3" />

    <v-card-text>

      <v-row no-gutters>
        <v-col cols="12" align-self="end">
          <v-text-field
            label="Nome"
            placeholder="Digite o nome"
            outlined
            v-model="user.name"
            type="text"
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" align-self="end">
          <v-text-field
            label="Sobrenome"
            placeholder="Digite o sobrenome"
            outlined
            v-model="user.surname"
            type="text"
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            label="Idade"
            placeholder="Digite a idade"
            outlined
            v-model="user.age"
            type="number"
            @keypress="integerNumberOnly"
            dense
          ></v-text-field>
        </v-col>
      </v-row>

    </v-card-text>

    <v-divider class="mt-n8" />

    <v-card-actions>
      <v-row no-gutters justify="end">
        <v-col cols="auto">
          <v-btn
            elevation="2"
            @click="closeDialog"
          >Cancelar
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            class="ml-3"
            elevation="2"
            @click="saveUser"
            :disabled="disabledSaveButton"
          >Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    editedUser: { type: Object }
  },

  data(){
    return{
      dialogTitle: 'Adicionar',
      user: {
        name: null,
        surname: null,
        age: null
      }
    }
  },

  computed: {
    disabledSaveButton(){
      return !this.user.name || !this.user.surname || !this.user.age;
    }
  },

  created(){
    if(this.editedUser) {
      Object.assign(this.user, this.editedUser);
      this.dialogTitle = 'Editar';
    }
  },

  methods: {
    closeDialog(){
      this.$emit('closeDialog')
    },

    saveUser(){
      if(this.editedUser) {
        this.$emit('updateUser', {
          id: this.editedUser._id,
          name: this.user.name,
          surname: this.user.surname,
          age: this.user.age
        });
      }
      else {
        this.$emit('createUser', this.user);
      }
    },



    integerNumberOnly($event){
      const integerNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      if(!integerNumbers.includes($event.key)) $event.preventDefault();
    }

  }

}
</script>

<style>

</style>