import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'; // utilizamos "Link" no lugar do elemento "a" para fazer uso do conceito de SPA
import logoImg from '../../assets/images/logo.svg'; // o caminho para a imagem é atribuído a variável logoImg
import landingImg from '../../assets/images/landing.svg'; // o caminho para a imagem é atribuído a variável landingImg
import studyIcon from '../../assets/images/icons/study.svg'; // o caminho para a imagem é atribuído a variável studyIcon
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'; // o caminho para a imagem é atribuído a variável giveClassesIcon
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'; // o caminho para a imagem é atribuído a variável giveClassesIcon
import api from '../../services/api'; // importamos a api do axios
import './styles.css'; // sempre é preciso 'navegar' até o arquivo pelo './', mesmo ele estando na mesma pasta, como é o caso do styles.css

const Landing = () => {
  // estado que gerencia o total de conexões
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then(response => {
    const {total} = response.data; // sem desestruturação seria const total = response.data.total
    setTotalConnections(total);
    })
  }, []); // o array, resumidamente é, quando eu quero disparar a arrow function dentro de useEffect?
          // dentro do array nós passamos as informações que, quando alteradas, dispara novamente a arrow function
          // se queremos que UseEffect execute uma única vez quando o componente é montado, devemos deixar o array vazio

  return (
    // div#page-landing para gerar a div com id automaticamente
    // div#page-landing-content.container para gerar a div com id e a classe automaticamente
    // div.logo-container para gerar a div com classe automaticamente
    // img.hero-image para gerar a img com classe automaticamente
    // span.total-connections para gerar o span com classe automaticamente
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy"/>
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img 
          src={landingImg} 
          alt="Plataforma de estudos" 
          className="hero-image"/>
        <div className="buttons-container">
          {/* Alteramos "a" por "Link" e "href" por "to" para utilizar a dinâmica do react-router-dom */}
          <Link to="./study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>
          {/* Alteramos "a" por "Link" e "href" por "to" para utilizar a dinâmica do react-router-dom */}
          <Link to="./give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Estudar"/>
            Dar aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração roxo"/>
        </span>
      </div>
    </div>
  )
} 

export default Landing;