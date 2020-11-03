angular.module("smartStripApp").controller("registerCtrl", function ($scope, $http, usernameStorage, smartStripStorage) {
    $scope.$watch('username', function () { $scope.test(); });
    $scope.$watch('password', function () { $scope.test(); });
    $scope.$watch('passwordConfirm', function () { $scope.test(); });

    $scope.init = function () {
        usernameStorage.setUsername("");
        usernameStorage.setID("");
        smartStripStorage.setSmartStrips([]);
    }

    $scope.register = function () {
        addUser();
    }
    function addUser() {

        var method = "POST";
        var url = "http://localhost:1880/addUser";
        var data = { "username": $scope.username, "password": $scope.password };

        $http({
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_success, _error);
    }

    function _success(response) {
        clearFormData();
    }

    function _error(response) {
        console.log(response.statusText);
    }

    /*function _refreshUsersData() {
        $http({
            method : 'GET',
            url : 'ovdje_ide_url'
        }).then(function successCallback(response) {
            $scope.users = response.data;
        }, function errorCallback(response) {
            console.log(response.statusText);
        });
    }*/

    function clearFormData() {
        $scope.username = "";
        $scope.password = "";
        $scope.passwordConfirm = "";
    }

    $scope.test = function () {
        if ($scope.password !== $scope.passwordConfirm) {
            $scope.error = true;
        }
        else {
            $scope.error = false;
        }
        if (usernameIsValid($scope.username)) $scope.usernameWrongInput = false;
        else $scope.usernameWrongInput = true;
        if (passwordIsValid($scope.password)) $scope.passwordWrongInput = false;
        else $scope.passwordWrongInput = true;
    }

    function usernameIsValid(username) {
        return /^(?=.{8,50}$)[a-zA-Z]([_.-]?[a-zA-Z0-9])*$/.test(username);
    }

    function passwordIsValid(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}$/.test(password);
    }


});