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
            $('.black-line').children().each(function (i, ele) {
                if (i) {
                    var exchangeRate = $(this).children().first().next().text().trim();
                    var agencyName = $(this).find('strong').text();
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


