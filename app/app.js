'use strict';

var todo = angular.module('todo', ['ngRoute', 'LocalStorageModule', 'xeditable'])

    .config(['$httpProvider', '$locationProvider', 'localStorageServiceProvider',
        function ($httpProvider, $locationProvider, localStorageServiceProvider) {
            $httpProvider.defaults.withCredentials = true;
            $httpProvider.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.headers.post["Content-Type"] = "application/json";

            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

            localStorageServiceProvider
                .setPrefix('highlow');


        }])

    .run(function(editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});