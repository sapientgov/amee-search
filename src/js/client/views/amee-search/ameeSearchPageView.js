'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var AmeeService = require('../../service/ameeService');
var AmeeSearchResultsView = require('./ameeSearchResultsView');
var CompanyDetailsView = require('./companyDetailsView');

var AmeeSearchPageView = Backbone.View.extend({
    
    events: {
		'keyup input[name="brand-name"]': 'updateAutocomplete',
        'blur input[name="brand-name"]': 'clearResultsOnDelay',
        'focus input[name="brand-name"]': 'updateAutocomplete'
    },
    
    render: function() {
		
        //setup search fields
        var inputTemplate = _.template($('#drug-search-template').html());
        this.$el.html(inputTemplate());

        //enable chaining
        return this;
    },
    
    updateAutocompleteResults: function(qOriginal) {
        this.handleAutocompleteDrugSearch(AmeeService.searchByCompanyName(qOriginal), qOriginal);
    },
    
	//This function is called when the user selects a company in the autopopulate search dropdown
    chooseResult: function(selection, count) {
        
        var view = new CompanyDetailsView({
            result: selection
        });
        view.render();
		
	},
    
    handleAutocompleteDrugSearch: function(apiPromise, q) {
        var self = this;
        
        apiPromise.done(function(data) {
            
            //only update results if the field value is the same as what was requested
            if(self.$('input[name="brand-name"]').val() === q) {
                self.$('#count-results-list').empty();
                _.each(data.companies, function(item) {
                    var view = new AmeeSearchResultsView({
                        result: item, 
                        callback: _.bind(self.chooseResult, self)
                    });
					
					//display each result in the autopopulate dropdown - maybe filter out results with out the search term?
				    self.$('#count-results-list').append(view.render().el); 
                });
            }
            
        }).fail(function() {
            //if the input value is the same as what we're looking for, clear the results
            if(self.$('input[name="brand-name"]').val() === q) {
                self.$('#count-results-list').empty();
            }
        });
    },
	
    /**
     * Clears the result after a short delay. This should only be used 
     * onblur to allow the click handler to fire before the element is cleared
     */
    clearResultsOnDelay: function() {
        var self = this;
       _.delay(function() {
           self.$('#count-results-list').empty();
       }, 300);
    },
    
    updateAutocomplete: _.debounce(function(event) {
        var val = this.$('input[name="brand-name"]').val();
        if(val && val.length > 2) {
            this.updateAutocompleteResults(val);
        }
    }, 200)
});

module.exports = AmeeSearchPageView;