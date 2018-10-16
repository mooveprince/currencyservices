var express = require('express');
var rp = require('request-promise');

var log = require ('../utility/logger');
var transferUtil = require ('../utility/usdinrtransferrate');

var router = express.Router();

/* Exchange Rate API */
router.get('/exchangerate', function(req, res, next) {
  log.info ("Request for Exchange Rate");
  var conversionBetween = req.query.cb;

  if (conversionBetween) {
    var options = {
      uri: `http://free.currencyconverterapi.com/api/v3/convert?q=${conversionBetween}&compact=y`,
      json: true
    }

    rp (options)
        .then (exchangeResult => {
            log.info ("Success response sent for currency exchange")
            let exchange = exchangeResult[conversionBetween];
            exchange.val = exchange.val.toFixed(2);
            res.json ({'status': 'success', 'exchangeRate': exchange});
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

router.get ("/transferrate/usdinr", function (req, res, next) {
  log.info ("Request for transfer Rate between USD to INR");

  var apiResult = transferUtil.usdInrTransferDetails ();    
  apiResult.then (data => {
    res.json({'status': 'success', 'exchangeRateList': data})
  });

});

module.exports = router;
