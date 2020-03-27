const knex = require('knex');
const app = require('./app');

const { PORT, DATABASE_URL } = require('./config');
// here is the set up of the server portion where the connection to the database/the database connection variable is set and where the app listens to the port
const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.set('db', db);


app.listen(PORT);
