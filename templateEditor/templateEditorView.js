define([
	'backbone', 'underscore',
	'text!views/template/templateEditor/templateEditor.html',
	"views/sfView",
    "views/template/templateEditor/templateContent/templateContentView",
    "views/template/templateEditor/templateControls/templateControlsView"
], function(Backbone, _, template, SFView, TemplateContentView, TemplateControlsView) {

	"use strict";

	var templateEditorView = SFView.extend({

		_template: _.template(template),
		
		className: 'templateEditor',

		initialize: function(options) {
            this.createSubView("controls", TemplateControlsView);
            this.createSubView("content", TemplateContentView);
		},

		render: function() {
			SFView.prototype.render.call(this);

            this.resize();

			return this;
		},

        resize: function() {
            this.$el.css({
                height: $(window).height() - 84
            });

            this.content.resize();
        }
	});

	return templateEditorView;
});