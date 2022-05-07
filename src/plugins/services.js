import axios from 'axios';

export function getCep(cep){
  if(cep.length != 8) return;
  return axios.get(`https://viacep.com.br/ws/${cep}/json`);
}