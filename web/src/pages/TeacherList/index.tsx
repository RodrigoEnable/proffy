import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';
import './styles.css';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [weekday, setWeekday] = useState('');
  const [time, setTime] = useState('');

  const searchTeachers = async (e: FormEvent) => {
    e.preventDefault();
    //console.log(subject, weekday, time)
    // não podemos enviar diretamente os parâmetros numa requisição get, somente post e put
    // numa requisição get solicitamos dentro da propriedade params
    // aqui utilizamos o async/await e no TeacherForm utilizamos o then/catch
    const response = await api.get('classes', {
      params: {
        subject, // short sintax
        week_day: weekday, // como o nome do estado não é o mesmo do parâmetro, não é possível aplicar short sintax, e atribuímos a ele o estado
        time // short sintax
      }
    });
    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select 
            name="subject" 
            label="Matéria" 
            value={subject}
            onChange={e => setSubject(e.target.value)}
            options={[
              {value: 'Artes', label: 'Artes'},
              {value: 'Biologia', label: 'Biologia'},
              {value: 'Ciências', label: 'Ciências'},
              {value: 'Educação Física', label: 'Educação Física'},
              {value: 'Física', label: 'Física'},
              {value: 'Geografia', label: 'Geografia'},
              {value: 'Matemática', label: 'Matemática'},
              {value: 'História', label: 'História'},
              {value: 'Português', label: 'Português'},
              {value: 'Programação', label: 'Programação'},
            ]}
          />
          <Select 
            name="week-day" 
            label="Dia da semana" 
            value={weekday}
            onChange={e => setWeekday(e.target.value)}
            options={[
              {value: '0', label: 'Domingo'},
              {value: '1', label: 'Segunda-Feira'},
              {value: '2', label: 'Terça-Feira'},
              {value: '3', label: 'Quarta-Feira'},
              {value: '4', label: 'Quinta-Feira'},
              {value: '5', label: 'Sexta-Feira'},
              {value: '6', label: 'Sábado'},
            ]}
          />
          {/* como definimos no componente Input que queremos todos os atributos padrão do elemento input, quando inserimos o type="time" funciona normalmente */}
          <Input 
            type="time" 
            name="time" 
            label="Hora" 
            value={time} 
            onChange={e => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>
      <main>
        {/* realizamos um map para listar os professores */}
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList;