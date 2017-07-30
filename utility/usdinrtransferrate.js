var rp = require('request-promise');
var cheerio = require('cheerio');

var usdInrTransferDetails = function () {
    var options = {
        uri: 'http://entryindia.com/exchange_rates',
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    return rp(options)
        .then(function ($) {
            var transferDetails = [];
            $('#ei_bxr_table').children().each(function (i, ele) {
                if (ele) {
                    var exchangeRate = $(this).children().first().next().text().trim().substring(0,5);
                    var agencyName = $(this).find('p').first().text();
                    transferDetails.push ({exchangeRate: exchangeRate, agencyName: agencyName});
                }   
            });
            return transferDetails.sort((a, b) => b.exchangeRate - a.exchangeRate);
    })
        .catch(function (err) {
        // Crawling failed or Cheerio choked... 
    });
}


module.exports = {
    usdInrTransferDetails : usdInrTransferDetails
}


