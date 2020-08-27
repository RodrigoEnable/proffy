import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'; // caso o projeto utilize typescript, é necessário instalar outro módulo, o @types/react-router-dom
import Landing from './pages/Landing';
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route 
      path="/" // caminho para a página principal, a url ou rota de entrada, colocamos apenas a barra nesse caso
      exact // a rota de entrada precisa dessa propriedade para ser acessada exclusivamente se o path for uma "/"
      component={Landing} // o componente que será exibido ao acessar a rota
      />
      <Route 
      path="/study" // caminho para outra página
      component={TeacherList} // o componente que será exibido ao acessar a rota
      />
      <Route 
      path="/give-classes" // caminho para outra página
      component={TeacherForm} // o componente que será exibido ao acessar a rota
      />
    </BrowserRouter>
  );
}

export default Routes;