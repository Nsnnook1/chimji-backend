const createErr = (msg, statusCode) => {
    const err = new Error(msg);
    err.statusCode = statusCode;
    return err;
  };
  
  module.exports = createErr;
  