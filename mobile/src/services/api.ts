import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.135:3333', // aqui utilizamos o ip de conexão no bundle do expo, apenas trocamos 'expo para http' e a porta para '3333'
});

export default api;