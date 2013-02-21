require.config({
    paths: {
        'jquery': 'components/jquery/jquery',
        'lodash': 'components/lodash/dist/lodash.min',
        'text'  : 'components/requirejs-text/text',
        'backbone': 'components/backbone/backbone',
        'jquery-ui': 'components/jquery-ui/ui/minified/jquery-ui.custom.min'
    },
    shim: {
        'backbone': {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },
        'jquery-ui': {
            deps: ['jquery']
        } 
    }
});

require([
    "jquery",
    "templateEditor/templateEditorView"
], function($, HTMLEditor) {
   
    var htmlEditor = new HTMLEditor();
    
    $('body').html(htmlEditor.el);

    htmlEditor.render();

    $(window).on('resize', function() {
        htmlEditor.resize.call(htmlEditor);
    });

    setTimeout(function() {
        htmlEditor.$('iframe').attr('height', '100%');
    }, 200);
});
