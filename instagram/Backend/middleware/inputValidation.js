const validateInput = (schema) => {
  const validationMiddleWare = (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(422).send({
        message: `Invalid input parameters`,
        error: error,
      });
    }

    next();
  };
  return validationMiddleWare;
};

module.exports = validateInput;
