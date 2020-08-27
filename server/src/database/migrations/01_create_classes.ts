import Knex from 'knex';

// os métodos aqui precisam ter exatamente o mesmo nome, up e down

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', table => { // criamos a tabela do bd de nome classes
    table.increments('id').primary(); // criamos o primeiro campo no bd, de nome id
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE'); // aqui temos um exemplo de relacionamento entre campos no knex
  });
}

export async function down(knex: Knex) { // deletamos a tabela
  return knex.schema.dropTable('classes');
}