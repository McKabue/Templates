/// <reference path="../Scripts/bootstrap.js" />

requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions'
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);

define(function (require) {
    var system = require('durandal/system'), app = require('durandal/app'), viewLocator = require('durandal/viewLocator');
    app = require('durandal/app');


    //viewLocator = require('durandal/viewLocator');
    


    system.debug(true);

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router: true,
        dialog: true
    });

    app.start().then(function () {
        viewLocator.useConvention();

        app.setRoot('viewmodels/shell');
    });
});