define([
	'backbone', 'underscore',
	'text!views/template/templateEditor/element/ElementContextDialog/elementContextDialog.html',
	"views/sfView"
], function(Backbone, _, template, SFView) {

	"use strict";

	var ElementContextDialogView = SFView.extend({
		_template: _.template(template),
		
		className: 'elementContextDialog whiteDialog clickWrapper',

		initialize: function(options) {
            this.$element = this.options.element.$el;
		},

		serialize: function() { return {}; },		

		render: function() {			
			SFView.prototype.render.call(this);

            this.$el.show("blind", 200);

			return this;
		},

        events: {
            "click .borders": "toggleBorders",
            "click .edit"   : "editElement",
            "click .delete" : "deleteElement"
        },

        toggleBorders: function() {
            this.options.element.setBorder(!this.options.element.hasBorder());
        },

        editElement: function() {
            this.options.element.enableEdit.call(this.options.element);
        },

        deleteElement: function() {
            this.options.element.parent.collection.remove(this.model.cid);
        }
	});

	return ElementContextDialogView;
});