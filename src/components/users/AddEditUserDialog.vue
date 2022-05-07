<template>
  <v-card height="100%" width="100%" class="scroll-auto">
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

      <v-divider class="mt-n3 mb-3" />

      <v-row no-gutters>
        <v-col cols="6">
          <v-text-field
            label="Login do GitHub"
            outlined
            v-model="user.github.login"
            dense
            class="pr-1"
          />
        </v-col>
        <v-col cols="6" align="center">
          <v-btn
            color="primary"
            elevation="2"
            @click="gitHubButton"
          >{{ user.github.id ? 'Apagar Dados do GitHub' : 'Obter Dados do GitHub' }}
          </v-btn>
        </v-col>
      </v-row>

      <template v-if="showGitHubData">
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              label="URL"
              outlined
              v-model="user.github.url"
              dense
              readonly
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              label="URL HTML"
              outlined
              v-model="user.github.html_url"
              dense
              readonly
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="4">
            <v-text-field
              label="Id do GitHub"
              outlined
              v-model="user.github.id"
              dense
              readonly
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Nº de Repositórios"
              outlined
              v-model="user.github.repos_amount"
              dense
              readonly
              class="px-2"
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Pontuação"
              outlined
              v-model="user.github.score"
              dense
              readonly
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              label="URL dos Repositórios"
              outlined
              v-model="user.github.repos_url"
              dense
              readonly
            />
          </v-col>
        </v-row>

        <v-row no-gutters v-for="(item, index) in user.github.repositories" :key="index">
          <v-col cols="6" >
            <v-text-field
              label="Nome do respositório"
              outlined
              v-model="item.name"
              dense
              readonly
              class="pr-1"
            />
          </v-col>
          <v-col cols="6" >
            <v-text-field
              label="URL do repositório"
              outlined
              v-model="item.url"
              dense
              readonly
              class="pl-1"
            />
          </v-col>
        </v-row>

        <v-row no-gutters v-if="user.github.avatar_url">
          <v-col cols="12" align-self="center" align="center">
            <span>Avatar do GitHub</span>
            <v-img
             :src="user.github.avatar_url"
             position="center"
             contain
             max-height="360px"
             max-width="480px"
            />
          </v-col>
        </v-row>
      </template>

    </v-card-text>

    <v-divider class="mt-n3" />

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
import { getCep, getGitHubUser, getGitHubUserRepos } from '@/plugins/services';
export default {
  props: {
    editedUser: { type: Object }
  },

  data(){
    return{
      dialogTitle: 'Adicionar',
      showGitHubData: false,
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
        },
        github: {
          login: null,
          id: null,
          score: null,
          url: null,
          html_url: null,
          avatar_url: null,
          repos_url: null,
          repos_amount: null,
          repositories: [],
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
      if(this.user.github.login) this.showGitHubData = true;
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
          age: this.user.age,
          address: this.user.address,
          github: this.user.github
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
        getCep(cep).then(async (response) => {
          if(response?.data?.uf) this.user.address.state = response.data.uf;
          if(response?.data?.localidade) this.user.address.city = response.data.localidade;
          if(response?.data?.bairro) this.user.address.district = response.data.bairro;
          if(response?.data?.logradouro) this.user.address.street = response.data.logradouro;
          if(response?.data?.complemento) this.user.address.complement = response.data.complemento;
          if(response?.data?.ibge) this.user.address.ibge = response.data.ibge;
        })
      }
    },

    async completeGitHubUser(){
      getGitHubUser(this.user.github.login).then(async (response) => {
        if(response.status === 200){
          const gitHubUser = response.data.items.find(user => user.login === this.user.github.login);
          if(gitHubUser){
            Object.keys(gitHubUser)
              .forEach(key => {
                const validKeys = ['id', 'score', 'url', 'html_url', 'avatar_url', 'repos_url']
                if(validKeys.includes(key)) this.user.github[key] = gitHubUser[key]
              });
            await this.completeGitHubUserRepos(this.user.github.login);
            this.showGitHubData = true;
          }
        }
      })
    },

    async gitHubButton(){
      if(this.user.github.id) this.deleteUserGitHubData();
      else await this.completeGitHubUser();
    },

    async completeGitHubUserRepos(gitHubUser){
      getGitHubUserRepos(gitHubUser).then(async (response) => {
        if(response.status === 200){
          this.user.github.repos_amount = response.data.length;
          this.user.github.repositories = response.data.map(repo => {
            return {
              name: repo.name,
              url: repo.html_url
            }
          })
        }
      })
    },

    deleteUserGitHubData(){
      Object.keys(this.user.github).forEach(key => {
        this.user.github[key] = null;
      });
      this.showGitHubData = false;
    }

  }

}
</script>

<style scoped>
  .scroll-auto {
    overflow-y: auto;
    overflow-x: auto;
  }
</style>