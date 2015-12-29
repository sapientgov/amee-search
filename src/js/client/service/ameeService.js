'use strict';

var $ = require('jquery');

var BUSINESS_URL = "/amee/companies";
var API_USER = 'ffc564f41507a059bde8b8993a9db2e3';
var API_PASS = 'be3cb7b504948b2f76e9413da8b080f7';

var AmeeService = {

    /**
     * Executes JSON query against API and returns promise object
     * @param   {String}  url URL of query
     * @returns {Promise} Promise object to be resolved/rejected on API response
     */
    executeApiQuery: function(url) {

        return $.ajax({
            type: 'GET',
            dataType: 'json',
            url: url
        });
    },
    
    searchByCompanyName: function(q) {
        var qs = '?q=' + q;
        
        return this.executeApiQuery(BUSINESS_URL + qs).fail(function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR, textStatus, errorThrown);
        });
    }
};

module.exports = AmeeService;