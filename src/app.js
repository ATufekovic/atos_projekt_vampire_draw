var app = angular.module("smartStripApp", ['ngRoute']);
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
        .when("/register", {
            templateUrl : "views/register.html",
            controller : "registerCtrl"
        })
        .when("/gui", {
            templateUrl : "views/gui.html",
            controller : "guiCtrl"
        })
        .when("/about", {
            templateUrl: "views/about.html"
        });
    
});