const { formatResource } = require("./handler");

module.exports = (data) => {
  const fields = [
    // list the object properties you want to return
  ];

  return formatResource(fields, data);
};
