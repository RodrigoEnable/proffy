import {Request, Response} from 'express';
import db from '../database/connection';

export default class ConnectionsController {
  async index(request: Request, response: Response) { // lista as conexões, dizemos que os argumentos request e o response vem do express
    const totalConnections = await db('connections').count('* as total'); // totalConnections recebe o total de conexões pelo método count e armazena numa variável de nome total
    const {total} = totalConnections[0]; // o total é gerado quando é feita a primeira conexão na tabela connections, queremos pegar o primeiro total, ou seja, o que ocupa o primeiro índice no array
    return response.json({total}); // aqui retornamos em formato json um objeto com o valor da variável total
  }
  async create(request: Request, response: Response) { // cria as conexões, dizemos que os argumentos request e o response vem do express
    const {user_id} = request.body;
    await db('connections').insert({
      user_id,
    })
    return response.status(201).send();
  }
}