const knex = require('knex');
const app = require('./app');

const { PORT, DATABASE_URL } = require('./config');
console.log('1st console ran')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});
console.log('2nd console ran')
app.set('db', db);
console.log('3rd console ran')

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});
