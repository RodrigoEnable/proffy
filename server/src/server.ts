import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express(); // tudo partirá do express

app.use(cors()); // informamos que comunicaremos frontend e backend em diferentes endereços pelo cors
app.use(express.json()); // informamos ao express que usaremos o formato JSON para os dados
app.use(routes); // informamos que estamos utilizando as rotas disponíveis na variável routes dentro do arquivo routes

// rota é o endereço, exemplo "localhost:3333/users" e recurso é somente "/users"
// métodos http, GET (listar informação), POST (criar informação), PUT (atualizar informação), DELETE (remover informação)
// é possível ter métodos diferentes para a mesma rota
// route params é utilizado para saber qual recurso eu quero atualizar ou deletar e geralmente é acompanhado de um id, exemplo "/users/1"
// query params são outros parâmetros utilizados pela rota, para paginação, ordenação e filtragem no recurso, por exemplo, "/users?page=2&sort=name" (estamos filtrando por nome os usuários da página 2 da listagem)
// para resgatar o valor do body de uma requisição utiliza-se request.body
// para resgatar o valor de route params de uma requisição utiliza-se request.params
// para resgatar o valor de query params de uma requisição utiliza-se request.query

app.listen(3333); // método listen() faz com que app possa "ouvir" requisições http, definimos a porta 3333 para a aplicação, localhost:3333
