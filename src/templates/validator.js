const handler = require('./handler');
const { body } = require('express-validator');

/**
 * @see https://express-validator.github.io/docs/sanitization  On how to implement
 * @see https://github.com/validatorjs/validator.js#validators List of available rules
 */
const rules = [
  // define your rules here
  // body('email').isEmail().normalizeEmail(),
];

module.exports = [...[rules], handler];