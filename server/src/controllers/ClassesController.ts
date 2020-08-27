import {Request, Response} from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem { // definimos no interface os tipo de dados que serão iterados no método map
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) { // lista as conexões, dizemos que os argumentos request e o response vem do express
    const filters = request.query;

    // informamos pelo typescript que filters.time é uma string
    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    if (!filters.week_day || !filters.subject || !filters.time) { // se week_day ou subject ou time for false, ou seja, se não foram preenchidos pelo usuário
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }
    const timeInMinutes = convertHourToMinutes(time); // convertemos as horas para minutos 
    //console.log(timeInMinutes);
    const classes = await db('classes') // fazemos a verificação da agenda aqui
      .whereExists(function() { // o método whereExists é utilizado para verificar os registros no bd, se houver o registro solicitado, retorna, senão, não retorna
        this.select('class_schedule.*') //  queremos todos os dados (campos) da tabela class_schedule
          .from('class_schedule') // de class_schedule
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') // se o campo class_id dentro da tabela class_schedule for igual ao campo id dentro da tabela classes
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)]) // se o campo week_day dentro da tabela class_schedule for igual a variável week_day
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) // se o campo de horário from (horário de início de atendimento) for menor ou igual ao horário pretendido pelo aluno
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]) // se o campo de horário to (horário de término de atendimento) for maior que o horário pretendido pelo aluno
      })
      .where('classes.subject', '=', subject) // filtramos a consulta somente para os valores que se encaixarem na verificação pelo método where() do knex
      .join('users', 'classes.user_id', '=', 'users.id') // incluímos os dados do usuário pelo método join() do knex
      .select(['classes.*', 'users.*']); // queremos todos os dados (campos) da tabela classes e todos os dados (campos) da tabela users
    return response.json(classes); // solicitamos que os dados sejam renderizados em json
 
  }

  async create(request: Request, response: Response) { // cria as conexões, dizemos que os argumentos request e o response vem do express
    // criamos uma rota, indicamos o recurso "/classes" e o que queremos executar por meio da arrow function
    // request traz as informações do header e do body da requisição e response as renderiza
    const { // utilizamos a desestruturação para transformar cada propriedade do body em uma variável
      name, 
      avatar, 
      whatsapp, 
      bio, 
      subject, 
      cost, 
      schedule
    } = request.body;
  
    const trx = await db.transaction(); // o método transaction permite que os dados sejam inseridos somente se não houver erro 

    try {
      const insertedUsersIds = await trx('users').insert({ // trs é uma função que recebe como argumento a tabela 'users', a tabela que receberá os dados dentro do objeto pelo método insert()
        name, // utilizamos short sintax
        avatar, // utilizamos short sintax
        whatsapp, // utilizamos short sintax
        bio // utilizamos short sintax
      });

      const user_id = insertedUsersIds[0]; // o user_id é gerado quando é inserido um novo usuário na tabela users, queremos pegar o primeiro usuário inserido, ou seja, o que ocupa o primeiro índice no array

      const insertedClassesIds = await trx('classes').insert({ // trs é uma função que recebe como argumento a tabela 'classes', a tabela que receberá os dados dentro do objeto pelo método insert()
        subject, // utilizamos short sintax
        cost, // utilizamos short sintax
        user_id // utilizamos short sintax
      });

      const class_id = insertedClassesIds[0]; // o class_id é gerado quando é inserido um a nova aula na tabela classes, queremos pegar a primeira aula inserida, ou seja, a que ocupa o primeiro índice no array

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => { // fazemos um map em cada objeto do array e retornamos um novo objeto, informamos que as propriedades iterado no map tem os tipos definidos na interface
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from), // chamamos a função de conversão das horas como valor do objeto e passamos scheduleItem.from como argumento
          to: convertHourToMinutes(scheduleItem.to), // chamamos a função de conversão das horas como valor do objeto e passamos scheduleItem.to como argumento
          class_id
        }
      });

      await trx('class_schedule').insert(classSchedule); // trs é uma função que recebe como argumento a tabela 'class_schedule', a tabela que receberá os dados dentro do objeto pelo método insert()

      await trx.commit(); // se não houver erro, o método commit insere os dados no bd ao mesmo tempo no final

      return response.status(201).send();
      // const data = request.body;
      // console.log(data);
      // return response.send();
      // return response.json({message: 'Hello World'});
      // definimos que o que queremos renderizar (response) é um JSON 
      } catch (err) {
      console.log(err);
      await trx.rollback(); // em caso de erro será desfeita qualquer alteração no banco de dados
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      });
    }
  }
}

