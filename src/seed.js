require('dotenv').config();
require('colors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = async (fileName) => {
  if (!fileName) {
    console.log('\n', ' ERROR '.bgRed, 'No file specified.', '\n');
    process.exit(1);
  }

  const dir = path.join(process.cwd(), 'src/database/seeders');
  let file = path.join(dir, `/${fileName.split('.js')[0]}.js`);
  if (!fs.existsSync(file)) {
    console.log('\n', ' ERROR '.bgRed, 'File does not exist.', '\n');
    process.exit(1);
  }

  const { MONGODB_PORT, MONGODB_HOST, MONGODB_USER, MONGODB_PASSWORD } = process.env;
  const dbUri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`;
  await mongoose.connect(dbUri, { useNewUrlParser: true }).then(async (connection) => {
    console.log('\n', ' INFO '.bgBlue, 'Seeding Database.', '\n');
    const seeder = require(file);
    await seeder();
    console.log(file, ' DONE '.green.bold, '\n');

    // close db connection
    await connection.disconnect();
    process.exit(0);
  }).catch((e) => {
    const { message } = e;
    console.log('Database Error:'.red , message);
  });
}
