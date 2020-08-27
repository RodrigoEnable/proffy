import Knex from 'knex';

// os métodos aqui precisam ter exatamente o mesmo nome, up e down

export async function up(knex: Knex) {
  return knex.schema.createTable('class_schedule', table => { // criamos a tabela do bd de nome class_schedule
    table.increments('id').primary(); // criamos o primeiro campo no bd, de nome id
    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
    table.integer('class_id').notNullable().references('id').inTable('classes').onUpdate('CASCADE').onDelete('CASCADE'); // aqui temos um exemplo de relacionamento entre campos no knex
  });
}

export async function down(knex: Knex) { // deletamos a tabela
  return knex.schema.dropTable('class_schedule');
}