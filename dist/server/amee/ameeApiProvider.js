'use strict';

var https = require('https');

var BUSINESS_HOST = "www.amee.com";
var BUSINESS_PATH = "/api/companies";
var API_USER = 'ffc564f41507a059bde8b8993a9db2e3';
var API_PASS = 'be3cb7b504948b2f76e9413da8b080f7';

var AmeeProvider = {

    /**
     * Executes JSON query against API and returns promise object
     * @param   {String}  url URL of query
     * @returns {Promise} Promise object to be resolved/rejected on API response
     */
    executeApiQuery: function(path, success, error) {
        
        var httpOptions = {
            hostname: BUSINESS_HOST,
            path: path,
            auth: API_USER + ':' + API_PASS
        };
        
        https.get(httpOptions, function(res) {

            //process response body
            var data = '';
            res.on('data', function(chunk) {
                data += chunk;
            });
            
            //when done reading deal with response
            res.on('end', function() {

                //try to parse response as JSON
                var resJson;
                try {
                    resJson = JSON.parse(data);
                } catch(er) {
                    console.error('unable to parse AMEE response (%s): %s', data, er.message);
                    if(typeof error === 'function') {
                        error(er);
                        return;
                    }
                }
                
                //check status code
                if(res.statusCode === 200) {
                    
                    //execute success callback
                    if(typeof success === 'function') {
                        success(resJson);
                    }
                } else {
                    
                    //non-200 status - execute error status
                    if(typeof error === 'function') {
                        console.error('error status: ', res.statusCode);
                        error(resJson);
                    }
                }

            }).on('error', function(e) {
                if(typeof error === 'function') {
                    error(e);
                }
            });
        });
    },
    
    searchByCompanyName: function(q, success, error) {
        var qs = '?company_name=' + encodeURIComponent(q);
        
        this.executeApiQuery(BUSINESS_PATH + qs, success, error);
    }
};

module.exports = AmeeProvider;