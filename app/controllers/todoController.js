'use strict';

todo.controller('todoCtrl', ['$scope', 'localStorageService', function($scope, localStorageService) {

    $scope.savedCategories = localStorage.getItem('categories');
    $scope.categories = (localStorage.getItem('categories')!==null) ? JSON.parse($scope.savedCategories) : [  ];
    localStorage.setItem('categories', JSON.stringify($scope.categories));

    $scope.savedTasks = localStorage.getItem('tasks');
    $scope.tasks = (localStorage.getItem('tasks')!==null) ? JSON.parse($scope.savedTasks) : [  ];
    localStorage.setItem('tasks', JSON.stringify($scope.tasks));

    $scope.category = [];


    $scope.task = [];

    //Category

    $scope.addCategory = function() {
            $scope.categories.push({
                text: $scope.categoryText,
                done: false
            });
            $scope.categoryText = '';
            localStorage.setItem('categories', JSON.stringify($scope.categories));
    };

    $scope.updateCategory = function() {
        var oldCategories = $scope.categories;
        $scope.categories = [];
        angular.forEach(oldCategories, function(category){
            if (!category.done)
                $scope.categories.push(category);
        });
        localStorage.setItem('categories', JSON.stringify($scope.categories));
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.categories, function(category){
            count+= category.done ? 0 : 1;
        });
        return count;
    };

    $scope.removeCategory = function(index) {
        $scope.categories.splice(index, 1);
        localStorage.removeItem(index);

        jsonToLocalStorage($scope.categories);
    };

    function extractJSONFromLocalStorage() {
        return JSON.parse(localStorage.getItem("categories"));
    }

    function jsonToLocalStorage(categories) {
        var jsonTodo = angular.toJson(categories);

        if (jsonTodo != 'null') {
            localStorage.setItem("categories", jsonTodo);
        } else {
            alert("Invalid JSON!");
        }
    }

    //Tasks

    $scope.addTask = function() {
        $scope.tasks.push({
            title: $scope.taskText,
            done: false,
            category: $scope.taskCategory
        });
        $scope.taskText = ''; //clear the input after adding
        $scope.taskCategory = '';
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.tasks, function(task){
            count+= task.done ? 0 : 1;
        });
        return count;
    };

    $scope.saveTask = function(data, id) {
        //$scope.task not updated yet
        angular.extend(data, {id: id});
    };


    $scope.updateTask = function() {
        var oldTasks = $scope.tasks;
        $scope.tasks = [];
        angular.forEach(oldTasks, function(task){
            if (!task.done)
                $scope.tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    };

    $scope.removeTask = function(index) {
        $scope.tasks.splice(index, 1);
        localStorage.removeItem(index);

        jsonToLocalStorageTask($scope.tasks);
    };

    function extractJSONFromLocalStorageTask() {
        return JSON.parse(localStorage.getItem("tasks"));
    }

    function jsonToLocalStorageTask(tasks) {
        var jsonTodo = angular.toJson(tasks);

        if (jsonTodo != 'null') {
            localStorage.setItem("tasks", jsonTodo);
        } else {
            alert("Invalid JSON!");
        }

    }

    $scope.showCategory = function(task) {
        $scope.categories = $scope.categories;
        var selected = [];
        if(task.category) {
            selected = $filter('filter')($scope.categories, {value: task.category});
        }
        return selected.length ? selected[0].text : '';
    };

}]);
