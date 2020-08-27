import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';
import './styles.css';

const TeacherForm = () => {
  const history = useHistory();
  // criamos os estados necessários
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');
  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');
  const [scheduleItems, setScheduleItems] = useState([{week_day: 0, from: '', to: ''}]);

  // função addNewScheduleItem é responsável por atualizar o estado, inserindo um novo campo de horário
  const addNewScheduleItem = () => {
    setScheduleItems([...scheduleItems, {week_day: 0, from: '', to: ''}]);
    // ...scheduleItems, criamos um array novo e utilizamos o spread operator para copiar os itens do array anterior em scheduleItems
    // {week_day: 0, from: '', to: ''}, em seguida incluímos um novo item (que é um objeto) para o array
  }

  // função responsável por atualizar os dados manipulados pelo aluno, week_day, from e to
  const setScheduleItemValue = (position: number, field: string, value: string) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      // se index for igual a position, ou seja, se o índice no array for o mesmo, executa o if
      if (index === position) {
        // [field] faz com que o nome da propriedade não seja "field" e sim a variável week_day, como ela já existe dentro de scheduleItem, é sobreposta com novo valor
        return {...scheduleItem, [field]: value}
        
      }
      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems); // atualizamos o array
  }

  const handleCreateClass = (e: FormEvent) => { // precisamos sinalizar que o parâmetro trata-se de um evento de formulário para o typescript entender
    e.preventDefault(); // previne o comportamento padrão do formulário, ou seja, ser submetido ao clicar no botão submit
    // console.log(name, avatar, whatsapp, bio, subject, cost, scheduleItems);
    api.post('classes', { // acessamos a api do axios e dizemos que o método é post (incluir uma informação no bd)
      name, // short sintax
      avatar, // short sintax
      whatsapp, // short sintax
      bio, // short sintax
      subject, // short sintax
      cost: Number(cost), // definimos cost como number
      schedule: scheduleItems // como o nome do estado não é o mesmo do parâmetro, não é possível aplicar short sintax, e atribuímos a ele o estado
      // aqui utilizamos o then/catch e no TeacherList utilizamos o async/await
    }).then(() => {
      alert('Cadastro realizado com sucesso')
      history.push('/'); // após submetido o formulário redirecionamos para a landing page.
    }).catch(() => {
      alert('Erro no cadastro')
    })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrível que você quer dar aulas." 
        description="O primeiro passo é preencher esse formulário de inscrição."
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>
            {/* a propriedade onChange nos retorna um evento (e), o qual recebemos como parâmetro na arrow function e atualizamos name por meio de setName(e.target.value) */}
            <Input 
              name="name" 
              label="Nome completo" 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <Input 
              name="avatar" 
              label="Avatar" 
              value={avatar} 
              onChange={e => setAvatar(e.target.value)} 
            />
            <Input 
              name="whatsapp" 
              label="WhatsApp" 
              value={whatsapp} 
              onChange={e => setWhatsapp(e.target.value)} 
            />
            <Textarea 
              name="bio" 
              label="Biografia" 
              value={bio} 
              onChange={e => setBio(e.target.value)} 
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
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
            <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={e => setCost(e.target.value)} />
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
            </legend>
            {/* fazemos um map no estado scheduleItems */}
            {scheduleItems.map((scheduleItem, index) => {
              return (
                // definimos como chave para esse map o dia da semana, que será um valor único, o aluno não poderá marcar dois horários no mesmo dia
                <div key={scheduleItem.week_day} className="schedule-item">
                <Select 
                  name="week-day" 
                  label="Dia da semana" 
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                <Input 
                  type="time" 
                  name="from" 
                  label="Das" 
                  value={scheduleItem.from} 
                  onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                />
                <Input 
                  type="time" 
                  name="to" 
                  label="Até" 
                  value={scheduleItem.to} 
                  onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                />
                </div>
              );
            })}
          </fieldset>
          <footer>
            <p><img src={warningIcon} alt="Aviso importante"/>Importante!<br />Preencha todos os dados</p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;