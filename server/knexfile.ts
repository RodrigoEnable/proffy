import path from 'path';

module.exports = { // necessário utilizar a sintaxe antiga, module.exports, não pode ser "export default"
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') // caminho para o bd
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations') // caminho para a migrations
  },
  useNullAsDefault: true,
};