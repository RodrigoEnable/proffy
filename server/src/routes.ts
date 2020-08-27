import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnetionsController';

const routes = express.Router(); // atribuo a variável routes o módulo de roteamento do express
const classesControllers = new ClassesController(); // criamos uma nova instância (uma cópia) da classe, "ClassesController"
const connectionsController = new ConnectionsController(); // criamos uma nova instância (uma cópia) da classe, "ConnectionsController"

routes.get('/classes', classesControllers.index); // apontamos para a classe, "ClassesController", e executamos o método index
routes.post('/classes', classesControllers.create); // apontamos para a classe, "ClassesController", e executamos o método create
routes.get('/connections', connectionsController.index); // apontamos para a classe, "ConnectionsController", e executamos o método index
routes.post('/connections', connectionsController.create); // apontamos para a classe, "ConnectionsController", e executamos o método create

export default routes;