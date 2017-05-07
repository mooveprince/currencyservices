var express = require('express');
var log = require ('../utility/logger');
var rp = require('request-promise');

var router = express.Router();

/* Exchange Rate API */
router.get('/exchangerate', function(req, res, next) {
  log.info ("Request for Test Resource");
  var conversionBetween = req.query.cb;

  if (conversionBetween) {
    var options = {
      uri: `http://free.currencyconverterapi.com/api/v3/convert?q=${conversionBetween}&compact=y`,
      json: true
    }

    rp (options)
        .then (exchangeResult => {
            log.info ("Success response sent for currency exchange")
            res.json ({'status': 'success', 'exchangeRate': exchangeResult[conversionBetween]});
        })
        .catch (err => {
          log.info(`Error in calling API ${err}`);
          res.json ({'status': 'failure', 'description': err});
        }); 
  } else {
      log.info(`Currency Conversion input is required`);
      res.json ({'status': 'failure', 'descripiton': 'Currency Conversion input is required'});
  }

});

module.exports = router;
