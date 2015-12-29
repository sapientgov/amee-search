'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

//page view objects
var AmeePageView = require('../views/page/ameePageView');

var AppRouter = Backbone.Router.extend({
    
    routes: {
        '': 'label'
    },
    
    label: function() {
        
        //change section background
        $('body').css('background-image',"url(../img/canitakethis.jpg)");
        
        //init drug label view
        this.mainView = new AmeePageView();
        this.mainView.render();
    }
});

module.exports = AppRouter;