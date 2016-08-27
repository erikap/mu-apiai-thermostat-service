var express = require('express');
var router = express.Router();

/* GET / */
router.get('/', function(req, res, next) {
  var request = req.app.locals.apiaiApp.textRequest(req.query.text);
  
  request.on('response', function(response) {
    console.log(response);
    res.status(200).json({ message: response.result.fulfillment.speech });
  });
  
  request.on('error', function(error) {
    console.log(error);
    var err = new Error(error);
    err.status = 400;
    throw err;
  });

  request.end()
});

module.exports = router;
