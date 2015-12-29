'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var AmeeSearchResultsView = Backbone.View.extend({
    tagName: 'li',
    
    attributes: {
        'class': 'result-item'
    },
    
    events: {
        'click': 'handleSelect'
    },
    
    initialize: function(options) {
        this.result = options.result;
        this.callback = options.callback;
    },
    
    render: function() {
        var self = this;
        
        //check that we have results to show
        if(!this.result) {
            throw new Error('No result to render');
        }
        
        //setup display
        var resHtml = this.result.name;
        if(this.result.amee_industry_score) {
            resHtml += ' (' + this.result.amee_industry_score + ')';
        } else {
            resHtml += ' (N/A)';
        }
        
        //add the term to the item
        this.$el.text(resHtml);
        
        //enable chaining
        return this;
    },
    
    handleSelect: function() {
        this.callback(this.result, this.result.count);
    }
});

module.exports = AmeeSearchResultsView;