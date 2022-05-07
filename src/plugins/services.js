import axios from 'axios';

export function getCep(cep){
  if(cep.length != 8) return;
  return axios.get(`https://viacep.com.br/ws/${cep}/json`);
}

export function getGitHubUser(user){
  return axios.get(`https://api.github.com/search/users?q=${user}`)
}

export function getGitHubUserRepos(user){
  return axios.get(`https://api.github.com/users/${user}/repos`)
}