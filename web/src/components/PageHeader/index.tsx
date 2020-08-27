import React from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';

/* interface é um conceito exclusivo do typescript */
/* com ele definimos o formato das tipagens dos objetos */
interface PageHeaderProps {
  title: string; // informamos que o componente PageHeader recebe uma propriedade title do tipo string e que ela é obrigatória (caso não seja obrigatória, seria 'title?: string')
  description?: string; // // informamos que o componente PageHeader recebe uma propriedade title do tipo string e que ela não é obrigatória 
}

const PageHeader: React.FunctionComponent <PageHeaderProps> = props => {
  /* para habilitar o componente a receber parâmetros com o uso de typescript no projeto, deve-se escrever "React.FunctionComponent" ou a abreviação disso, "React.FC" */
  /* React.FunctionComponent recebe um parâmetro e, para passá-lo, escrevemos no formato de tag, dentro colocamos o interface "<PageHeaderProps>", */
  /* o que dizemos com <PageHeaderProps> é que o componente pode receber essas propriedades */
  return (
    <header className="page-header">
    <div className="top-bar-container">
      <Link to="/">
        <img src={backIcon} alt="Voltar" />
      </Link>
      <img src={logoImg} alt="Proffy" />
    </div>
    <div className="header-content">
      <strong>{props.title}</strong>
      {/* só executamos o <p>{props.description}</p> se tiver uma descrição */}
      {props.description && <p>{props.description}</p>}
      {/* props.children permite que seja renderizado dentro do componente filho tudo que for colocado nele dentro do componente pai <PageHeader>props.children renderiza tudo que está aqui</PageHeader> */}
      {props.children}
    </div>
  </header>
  )
}

export default PageHeader;