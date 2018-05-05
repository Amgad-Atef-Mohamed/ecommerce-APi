module.exports = {
  determinePagination : function (pageNumber = 1, perPage = 10) {
    return { limit: perPage, offset: (pageNumber-1) * perPage }
  },
  logError: function logErrors (err, req, res, next) {
    console.error(err.stack);
    next(err);
  },
  HandleErrorforclient: function clientErrorHandler (err, req, res, next) {
    if (err instanceof SyntaxError) {
      res.status(400).json({message: 'invalid json format'});
    }
    if (err != null && typeof err === 'object') {
      const error = {
        statusCode: 400,
        error: 'Bad Request',
        message: err.message
      };
      return res.status(400).json(error);
    }

    return res.status(503).json({ message: 'Service Unavailable now , please try again in seconds'});
  }
};