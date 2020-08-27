import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // colocamos apenas o endereço base, sem as rotas
});

export default api;