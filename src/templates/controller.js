exports.create = async (req, res) => {
  let payload,
    status = 200;
  try {
    const {} = req.body;

    // your logic here
  } catch (error) {
    status = 500;
    payload = { error: error.message };
  }

  return res.status(status).json(payload);
};

exports.retrieve = async (req, res) => {
  let payload,
    status = 200;
  try {
    const { id } = req.params;

    // your logic here
  } catch (error) {
    status = 500;
    payload = { error: error.message };
  }

  return res.status(status).json(payload);
};

exports.update = async (req, res) => {
  let payload,
    status = 200;
  try {
    const { id } = req.params;
    const {} = req.body;

    // your logic here
  } catch (error) {
    status = 500;
    payload = { error: error.message };
  }

  return res.status(status).json(payload);
};

exports.delete = async (req, res) => {
  let payload,
    status = 200;
  try {
    const { id } = req.params;

    // your logic here
  } catch (error) {
    status = 500;
    payload = { error: error.message };
  }

  return res.status(status).json(payload);
};
