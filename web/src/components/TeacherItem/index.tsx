import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';
import './styles.css';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: number;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FunctionComponent <TeacherItemProps> = ({teacher}) => {
  const createNewConnection = () => {
    api.post('/connections', {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
    <header>
      <img src={teacher.avatar} alt={teacher.name} />
      <div>
        <strong>{teacher.name}</strong>
        <span>{teacher.subject}</span>
      </div>
    </header>
    <p>{teacher.bio}</p>
    <footer>
      <p>Preço/Hora <strong>R$ {teacher.cost}</strong></p>
      <a 
        onClick={createNewConnection} // ao clicar chamamos a função createNewConnection que atualiza a contagem de conexões na landing page
        href={`https://wa.me/${teacher.whatsapp}`} // necessário a propriedade rel="noopener noreferrer" para não incorrer numa falha de segurança
        target="_blank" rel="noopener noreferrer">
        <img src={whatsappIcon} alt="Whatsapp"/>
        Entrar em contato
      </a>     
    </footer>
  </article>
  );
}

export default TeacherItem;