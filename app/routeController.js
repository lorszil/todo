'use strict';

todo.config(['$routeProvider',
    function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: "/views/todo.html",
                controller: 'todoCtrl'
            })
            .when('/category', {
                templateUrl: "/views/category.html",
                controller: 'todoCtrl'
            })
            .when('/task', {
                templateUrl: "/views/task.html",
                controller: 'todoCtrl'
            })
            .when('/home', {
                templateUrl: "/views/todo.html",
                controller: 'todoCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }]);
