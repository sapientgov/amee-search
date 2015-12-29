'use strict';

var express = require('express');
var app = express();
var AmeeProvider = require('./ameeApiProvider');

var AmeeService = function(app) {
    
    app.get('/amee/companies', function(req, res) {
        AmeeProvider.searchByCompanyName(req.query.q, function(resJson) {
            res.status(200).json(resJson);
        }, function(err) {
            console.error('Unable to search companies: ', err);
            res.status(500).send(err);
        });
    });
};

module.exports = AmeeService; 