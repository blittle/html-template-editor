define([
	'backbone', 'underscore',
	'text!views/template/templateEditor/templateControls/templateControls.html',
	"views/sfView"
], function(Backbone, _, template, SFView) {

	"use strict";

	var templateControlsView = SFView.extend({
		_template: _.template(template),
		
		className: 'templateControls',
		initialize: function(options) {
			
		},

		serialize: function() { return {}; },		

		render: function() {			
			SFView.prototype.render.call(this);
			return this;
		},

        events: {
            "click .preview": "previewTemplate",
            "click .grid"   : "toggleGridLines",
            "click .block"  : "createBlock",
            "click .vline"   : "createVLine",
            "click .hline"   : "createHLine"
        },

        previewTemplate: function(e) {
            var html = "";

            _.each(this.parent.content.pageViews, _.bind(function(pageView, i) {
                html += pageView.el.outerHTML;
            }, this));

            html = "<html><head>" +
                "<link rel='stylesheet' type='text/css' href='/app/js/views/template/templateEditor/templatePage/templateRendered.css'/>" +
                "</head><body>" + html + "</body></html>";

            var doc = window.open('','myconsole',
                'width=' + $(window).width()/2 + ',height=' + $(window).height()
                    +',menubar=0'
                    +',toolbar=0'
                    +',status=0'
                    +',scrollbars=1'
                    +',resizable=1');

            doc.document.writeln(html);
        },

        toggleGridLines: function() {
            this.parent.content.pageViews[0].$el.closest('body').toggleClass('grid');
        },

        createBlock: function() {
            this.parent.content.pageViews[0].createTextBlock();
        },

        createHLine: function() {
            this.parent.content.pageViews[0].createLine(true);
        },

        createVLine: function() {
            this.parent.content.pageViews[0].createLine(false);
        }
	});

	return templateControlsView;
});