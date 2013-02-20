define([
	'backbone', 'underscore',
    "views/template/templateEditor/templatePage/templatePageView",
	"views/sfView"
], function(Backbone, _, PageView, SFView) {

	"use strict";

	var templateContentView = SFView.extend({

        tagName: "iframe",
		
		className: 'templateContent',

		initialize: function(options) {
			this.collection = new Backbone.Collection([
                {
                    id: _.uniqueId("tpage_"),
                    blocks: []
                }
            ]);

            this.pageViews = [];
		},

		serialize: function() { return {}; },

        getFrame: function(selector) {
            return selector ? this.$el.contents().find(selector) : this.$el.contents();
        },

		render: function() {

            this.getFrame('head').append($("<link/>",
                { rel: "stylesheet", href: "/app/js/views/template/templateEditor/templatePage/template.css", type: "text/css" }
            ));

            this.collection.each(this.buildPage, this);

			return this;
		},

        buildPage: function(page, index) {

            var pageView = new PageView({
                model: page
            });

            pageView.parent = this;

            this.getFrame('body').append(pageView.el);

            pageView.render();

            this.pageViews.push(pageView);
        },

        resize: function() {
            _.each(this.pageViews, function(pageView) {
                pageView.resize();
            });
        }
	});

	return templateContentView;
});