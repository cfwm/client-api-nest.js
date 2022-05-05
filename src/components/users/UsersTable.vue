<template>
  <div>
    <v-data-table
      height="55vh"
      :headers="tableHeaders"
      :items="users"
      :items-per-page="5"
      class="elevation-5"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    users: { type: Array, default: () => [] }
  },



  data(){
    return{
      tableHeaders: [
        { text: 'ID', align: 'start', sortable: true, value: '_id' },
        { text: 'Nome', align: 'start', sortable: true, value: 'nome' },
        { text: 'Idade', align: 'start', sortable: true, value: 'idade' },
        // { text: 'Endereço', align: 'start', sortable: true, value: 'address' },
      ]
    }
  }
}
</script>

<style>

</style>