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
        <v-col cols="12">
          <v-text-field
            label="Nome"
            placeholder="Digite o nome"
            outlined
            v-model="user.name"
            type="text"
            dense
          />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="9">
          <v-text-field
            label="Sobrenome"
            placeholder="Digite o sobrenome"
            outlined
            v-model="user.surname"
            type="text"
            dense
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            class="pl-2"
            label="Idade"
            placeholder="Digite a idade"
            outlined
            v-model="user.age"
            type="number"
            @keypress="integerNumberOnly"
            dense
          />
        </v-col>
      </v-row>

      <v-divider class="mt-n3 mb-3" />

      <v-row no-gutters>
        <v-col cols="4">
          <v-text-field
            label="CEP"
            placeholder="Digite o CEP"
            outlined
            v-model="user.address.cep"
            v-mask="'#####-###'"
            @input="completeCep"
            dense
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Estado"
            outlined
            v-model="user.address.state"
            dense
            class="px-2"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Cidade"
            outlined
            v-model="user.address.city"
            dense
          />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="6">
          <v-text-field
            label="Logradouro"
            outlined
            v-model="user.address.street"
            dense
            class="pr-1"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Complemento"
            outlined
            v-model="user.address.complement"
            dense
            class="pl-1"
          />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="6">
          <v-text-field
            label="Número"
            outlined
            v-model="user.address.number"
            dense
            class="pr-1"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Código do IBGE"
            outlined
            v-model="user.address.ibge"
            dense
            class="pl-1"
          />
        </v-col>
      </v-row>

    </v-card-text>

    <v-divider class="mt-n8" />

    <v-card-actions>
      <v-row no-gutters justify="end">
        <v-col cols="auto">
          <v-btn
            color="white"
            class="primary--text"
            elevation="2"
            @click="closeDialog"
          >Cancelar
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
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
import { getCep } from '@/plugins/services';
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
        age: null,
        address: {
          cep: null,
          state: null,
          city: null,
          district: null,
          street: null,
          number: null,
          complement: null,
          ibge: null,
        }
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
    },

    async completeCep(){
      const cep = this.user.address.cep.replace(/\D/g, "");
      if(cep.length === 8){
        console.log('cep', cep)
        getCep(cep).then(async (response) => {
          if(response?.data?.uf) this.user.address.state = response.data.uf;
          if(response?.data?.localidade) this.user.address.city = response.data.localidade;
          if(response?.data?.bairro) this.user.address.district = response.data.bairro;
          if(response?.data?.logradouro) this.user.address.street = response.data.logradouro;
          if(response?.data?.complemento) this.user.address.complement = response.data.complemento;
          if(response?.data?.ibge) this.user.address.ibge = response.data.ibge;
        })
      }
    }

  }

}
</script>

<style>

</style>