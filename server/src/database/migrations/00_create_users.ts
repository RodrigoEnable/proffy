import Knex from 'knex';

// os métodos aqui precisam ter exatamente o mesmo nome, up e down

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => { // criamos a tabela do bd de nome users
    table.increments('id').primary(); // criamos o primeiro campo no bd, de nome id
    table.string('name').notNullable();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();
  });
}

export async function down(knex: Knex) { // deletamos a tabela
  return knex.schema.dropTable('users');
}