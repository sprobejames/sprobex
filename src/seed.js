require('dotenv').config();
require('colors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = async (fileName) => {
const { MONGODB_PORT, MONGODB_HOST, MONGODB_USER, MONGODB_PASSWORD } = process.env;
const dbUri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`;
await mongoose.connect(dbUri, { useNewUrlParser: true }).then(async (connection) => {
  const dir = path.join(__dirname, './database/seeders');

  if (fileName) {
    let file = path.join(dir, `/${fileName.split('.js')[0]}.js`);
    if (fs.existsSync(file)) {
      const seeder = require(file);
      await seeder();
    }
  } else {
    console.log('\n', ' INFO '.bgBlue, 'Seeding Database.', '\n');
    // run all seeders if fileName not specified
    fs.readdirSync(dir).forEach(async (file) => {
      const filePath = path.join(dir, file.split('.js')[0]);
      const seeder = require(filePath);
      await seeder();
      console.log(filePath, ' DONE '.green.bold);
    });
  }

  // close connection
  await connection.disconnect();
  process.exit(0);
}).catch((e) => {
  const { message } = e;
  console.log('Database Error:'.red , message);
});
}

