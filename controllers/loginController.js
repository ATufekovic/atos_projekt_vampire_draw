angular.module("smartStripApp").controller("loginCtrl", function ($scope, usernameStorage, smartStripStorage, $location, $http) {

    //$scope.strip={};
    $scope.login = function () {
        verifyUsers();

    };

    $scope.init = function () {
        usernameStorage.setUsername("");
        usernameStorage.setID("");

        smartStripStorage.setSmartStrips([]);
    }

    function verifyUsers() {
        var method = "POST";
        var url = "http://localhost:1880/verifyUser";
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
        //console.log(response);
        $scope.badLogin = false;

        usernameStorage.setUsername(response.data[0].username);
        usernameStorage.setID(response.data[0].id);

        getSmartStripsByUserID();
    }

    function _error(response) {
        if (response.status = 400) {
            $scope.badLogin = true;
        }
        console.log(response);
    }

    function getSmartStripsByUserID() {
        var method = "GET";
        var url = "http://localhost:1880/getSmartStripsByUserID";
        var params = { "id": usernameStorage.getID() };
        $http({
            method: method,
            url: url,
            params: params,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(_successSmartStrip, _errorSmartStrip);
    }

    function _successSmartStrip(response) {
        //console.log(response);
        smartStripStorage.setSmartStrips(response.data);
        var _temp = smartStripStorage.getSmartStrips();
        var counter = 0;
        _temp.forEach(strip => {
            getPlugsBySmartStripID(strip, counter);
        });
        //console.log(_temp);
        $location.path("gui");
    }


    function _errorSmartStrip(response) {
        console.log(response);
    }

    function getPlugsBySmartStripID(strip, counter) {
        var method = "GET";
        var url = "http://localhost:1880/getPlugsBySmartStripID";
        var params = { "id": strip.id };
        $http({
            method: method,
            url: url,
            params: params,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function _successGetPlugsBySmartStripID(response) {
            counter += 1;
            smartStripStorage.setPlugs(strip, response.data);
        }, function _errorGetPlugsBySmartStripID(response) {
            console.log(response);
        });
    }
});