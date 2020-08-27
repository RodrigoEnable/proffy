import knex from 'knex';
import path from 'path'; // path é um método padrão do Node para facilitar o caminho da aplicação

const db = knex({ // knex aceita vários bds além do sqlite3
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true,
});

export default db;