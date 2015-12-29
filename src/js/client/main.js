'use strict';

var $ = window.$ = window.jQuery = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var AppRouter = require('./routes/appRouter');

var Bootstrap = require('./libs/bootstrap/bootstrap');
Bootstrap.jQuery = $;

//setup router
$(function() {
    //setup router
    window.AppRouter = new AppRouter();

    //start Backbone history
    Backbone.history.start();
});

//add error handling
window.onerror = function() {
    alert('Whoops! FDA Anywhere encountered an error and cannot complete your request. Please cross your fingers and try again.');
};