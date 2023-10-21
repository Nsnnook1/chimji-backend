module.exports = (err, req, res, next) => {
    if(err.name === 'ValidationError'){
      err.statusCode = 400;
    }
    return res.status(err.statusCode || 500).json({ msg: err.message });
  };
  