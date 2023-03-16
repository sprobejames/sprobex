#!/usr/bin/env node
require('colors');
const path = require('path');
const yargs = require('yargs');
const fs = require('fs');
const replace = require('replace-in-file');

const capitalize = s => (s && s[0].toUpperCase() + s.slice(1)) || "";

const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

// valid comma
const commands = [
  'make:controller',
  'make:exception',
  'make:mail',
  'make:middleware',
  'make:model',
  'make:service',
  'make:validator',
  'make:test',
];

let { argv: args } = yargs
  .scriptName("sprobex")
  .usage("Usage: sprobex [make:command] <fileName>")
  .command('make:controller <controllerName>'.cyan, 'Create a new Controller file.')
  .command('make:exception <exceptionName>'.cyan, 'Create a new Exception file.')
  .command('make:mail <mailName>'.cyan, 'Create a new Mail file.')
  .command('make:middleware <middlewareName>'.cyan, 'Create a new Middleware file.')
  .command('make:model <modelName>'.cyan, 'Create a new Model file.')
  .command('make:service <serviceName>'.cyan, 'Create a new Service file.')
  .command('make:test <testName>'.cyan, 'Create a new Test file.')
  .command('make:validator <validatorName>'.cyan, 'Create a new Validator file.')
  .help('h')
  .alias('h', 'help')
  .version("1.0.0")
  .alias('v', 'version');

const [command, fileName = args[0]] = args._;
if (!command) process.exit(1);
if (!commands.includes(command)) {
  console.log(`sprobex ${command} does not exist.`.red);
  process.exit(1);
}

const type = command.split(':')[1];
let dir = path.join(`src/${type}s`);
if (type === 'mail') dir = path.join(`src/views/${type}`);
if (type === 'validator') dir = path.join(`src/middlewares/${type}s`);
if (type === 'test') dir = path.join(`src/${type}s/feature`);
let file = path.join(dir, `/${fileName}.${type}.js`);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(file)) {
  let template = path.join(`src/templates/${type}.js`);

  if (type === 'mail') {
    template = path.join(`src/templates/mail.handlebars`);
    file = path.join(dir, `/${fileName}.handlebars`);
  }

  fs.copyFileSync(template, file);

  if (type === 'model') {
    const options = {
      files: file,
      from: /MODEL_NAME/g,
      to: capitalize(fileName),
    };
    replace.sync(options);
  }

  if (type === 'exception') {
    const options = {
      files: file,
      from: /CUSTOM_EXCEPTION/g,
      to: capitalize(fileName),
    };
    replace.sync(options);
  }
}

console.log(`${capitalize(type)} created successfully.`.green);
console.log(`Created ${capitalize(type)}`.green, file);
process.exit(0);
