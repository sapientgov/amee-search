'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var accounting = require('accounting');

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
        
        //format sales and employee numbers
        if(typeof this.result.annual_sales_local !== 'undefined' && this.result.annual_sales_local !== null) {
            this.result.sales_formatted = accounting.formatNumber(this.result.annual_sales_local);
        }
        if(typeof this.result.employees_total !== 'undefined' && this.result.employees_total !== null) {
            this.result.emps_formatted = accounting.formatNumber(this.result.employees_total);
        }
        
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