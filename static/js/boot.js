requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        app: '../app',
    },

    shim: {
        d3: {
            exports: 'd3'
        }
    }
});

//Start the main app logic.
requirejs([], function (common) {
    require(['./app']);
});