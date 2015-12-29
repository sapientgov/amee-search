'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var AmeeSearchPageView = require('../amee-search/ameeSearchPageView');

var AmeePageView = Backbone.View.extend({
    el: '#primary-content',
    
    render: function() {
        
        //add the drug search to the page
        this.searchView = new AmeeSearchPageView({searchTarget: 'LABEL'});
        this.$el.html(this.searchView.render().el);
        
    }
});

module.exports = AmeePageView;