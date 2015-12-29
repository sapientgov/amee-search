'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var MapModuleView = require('../location/mapModuleView');

var CompanyDetailsView = Backbone.View.extend({
    el: '#product-results',
    events: {
    },
    initialize: function(options) {
        this.result = options.result;
        this.template = _.template($('#company-details').html());
    },
    render: function() {
        this.$el.html(this.template(this.result)).show();
        
        //setup map
        if(this.result.lat && this.result.lon) {
            var mapView = new MapModuleView({
                lat: this.result.lat,
                lon: this.result.lon
            });
            mapView.render();
        }
        
        return this;
    }
});

module.exports = CompanyDetailsView;