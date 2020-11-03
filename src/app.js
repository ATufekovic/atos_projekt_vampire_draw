var app = angular.module("powerstripApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/login.html",
            controller : "loginCtrl"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller : "loginCtrl"
        })
        .when("/about", {
            templateUrl: "views/about.html",
            controller : "loginCtrl"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller : "registerCtrl"
        })
        .when("/gui", {
            templateUrl : "views/gui.html",
            controller : "guiCtrl"
        });
    
});