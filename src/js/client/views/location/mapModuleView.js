'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

var MAPS_API_URL = 'https://maps.googleapis.com/maps/api/js';
var PLACES_API_URL = '?libraries=places';
var API_KEY = 'AIzaSyC0l32fdHosB1b5YmlUtlWBfmnUIaI2BMU';

var _instance;

var MapModuleView = Backbone.View.extend({
    el: '#map-module',

    initialize: function (options) {
        if (!options.lat || !options.lon) {
            throw new Error('Must supply location');
        }

        this.lat = options.lat;
        this.lon = options.lon;
    },

    render: function () {
        //load script if needed
        if (typeof google === 'undefined') {
            this.loadScript();
        } else {
            //initializd the map
            this.initializeMap();
        }
    },
    
    triggerResize: function() {
        if(typeof this.map !== 'undefined') {
            google.maps.event.trigger(this.map, 'resize');
            this.map.setOptions({
                center: this.center
            });
        }
    },
    
    loadScript: function() {
        //add listener for custom load event
        $(document).off('map-api-load').one('map-api-load', _.bind(this.initializeMap, this));
        
        //add script for google maps
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = MAPS_API_URL + PLACES_API_URL + '&key=' + API_KEY + '&sensor=true&callback=mapApiLoaded';
        document.body.appendChild(script);
    },

    initializeMap: function () {
        //set map cetner
        this.center = new google.maps.LatLng(this.lat, this.lon);
        var mapOptions = {
            zoom : 14,
            center : this.center,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true,
            draggable: false
        };
        
        //create map object
        this.map = new google.maps.Map(this.$el.get(0), mapOptions);
        
        //add center marker
        var marker = new google.maps.Marker({
            position: this.center,
            animation: google.maps.Animation.DROP,
            map: this.map
        });
    }

});

module.exports = MapModuleView;