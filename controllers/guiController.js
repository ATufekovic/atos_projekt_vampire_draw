angular.module("smartStripApp").controller("guiCtrl", function ($scope, usernameStorage, smartStripStorage, $http, $timeout) {
    $scope.$watch('stripName',function() {$scope.testAddNewStrip();});
    $scope.$watch('stripNumber',function() {$scope.testAddNewStrip();});

    $scope.smartStrips = [];
    $scope.powerDrawConsumption;
    

    $scope.testAddNewStrip = function() {
        if($scope.stripNameIsValid($scope.stripName)) $scope.stripNameWrongInput=false;
        else $scope.stripNameWrongInput=true;
        if($scope.stripNumberIsValid($scope.stripNumber)) $scope.stripNumberWrongInput=false;
        else $scope.stripNumberWrongInput=true;
    }

    $scope.stripNameIsValid = function(stripName) {
        return /^(?=.{2,50}$)[a-zA-Z]([_.-]?[a-zA-Z0-9])*$/.test(stripName);
    }

    $scope.stripNumberIsValid = function(stripNumber){
        if(stripNumber>0 && stripNumber<20) return true;
        else return false;
    }
    
    window.setInterval(function(){
        smartStripStorage.smartstripConsumption();
        $scope.$apply();
        console.log("asd");
    }, 5000);

    $scope.getSmartstripConsumption = function(){
        smartStripStorage.smartstripConsumption();
        console.log("asd");
    }

    $scope.toggleSmartStrip = function(x){
        //smartStripStorage.smartstripConsumption(x.id);
        //console.log(x.id);
        $scope.switchMasterState(x.id);
        //$scope.$apply();
   }

   $scope.togglePlug = function(x,y){
       if(x.masterState==true){
        $scope.switchState(y.id);
        //$scope.$apply();
       
    }    
   }

   $scope.addStrip = function(){
        $scope.addSmartStrip();
   }

    $scope.deleteStrip = function(x){
        $scope.deleteSmartStrip(x.id);
    }


    $scope.addSmartStrip = function() {
        var method = "POST";
        var url = "http://localhost:1880/addSmartStrip";
        var data={"ownerID":usernameStorage.getID(),"name": $scope.stripName, "numOfPlugs": $scope.stripNumber};
        $http({
            method : method,
            url : url,
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( $scope._successaddSmartStrip, $scope._erroraddSmartStrip);
    }

    $scope._successaddSmartStrip = function(response) {
        $scope.getSmartStripsByUserID();
        $scope.stripName="";
        $scope.stripNumber="";
    }

    $scope._erroraddSmartStrip = function(response) {
        console.log(response);
    }

    $scope.deleteSmartStrip = function(id) {
        var method = "POST";
        var url = "http://localhost:1880/deleteSmartStrip";
        var data={"ownerID":usernameStorage.getID(),"id":id};
        $http({
            method : method,
            url : url,
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( $scope._successDeleteSmartStrip, $scope._errorDeleteSmartStrip);
    }

    $scope._successDeleteSmartStrip = function(response) {
        $scope.getSmartStripsByUserID();
    }

    $scope._errorDeleteSmartStrip = function(response) {
        console.log(response);
    }

    $scope.switchMasterState = function(id) {
        var method = "POST";
        var url = "http://localhost:1880/switchMasterState";
        var data={"id": id};
        $http({
            method : method,
            url : url,
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( $scope._successSwitchMasterState, $scope._errorSwitchMasterState);
    }

    $scope._successSwitchMasterState = function(response) {
        //console.log(response);
        smartStripStorage.changeStripMasterState(response.data[0]);
    }

    $scope._errorSwitchMasterState = function(response) {
        console.log(response);
    }

    $scope.switchState = function(id) {
        var method = "POST";
        var url = "http://localhost:1880/switchState";
        var data={"id": id};
        $http({
            method : method,
            url : url,
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( $scope._successSwitchState, $scope._errorSwitchMasterState);
    }

    $scope._successSwitchState = function(response) {
        smartStripStorage.changePlugState(response.data[0]);
    }

    $scope._errorSwitchMasterState = function(response) {
        console.log(response);
    }

    $scope.users = [
        { username: "test1", email: "email1@ma.il" },
        { username: "test2", email: "email2@ma.il" }
    ];

    $scope.dropDown = function (chosen = "default") {
        $scope.smartStrip = chosen;
    };

    $scope.red = function() {
        if (!document.getElementsByTagName || !document.createTextNode) return;
        var rows = document.getElementById('tablica').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
        for (i = 0; i < rows.length; i++) {
            rows[i].onclick = function() {
                $scope.redak=this.rowIndex;
            }
        }
    }

    $scope.init = function(){
        $scope.smartStrips = smartStripStorage.getSmartStrips();
    }

    $scope.getSmartStripsByUserID = function() {
        var method = "GET";
        var url = "http://localhost:1880/getSmartStripsByUserID";
        var params={"id" : usernameStorage.getID()};
        $http({
            method : method,
            url : url,
            params : params,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( $scope._successSmartStrip, $scope._errorSmartStrip);
    }

    $scope._successSmartStrip = function(response) {
        smartStripStorage.setSmartStrips(response.data);
        var _temp = smartStripStorage.getSmartStrips();
        _temp.forEach(strip => {
            $scope.getPlugsBySmartStripID(strip);
        });
        $timeout($scope.init(),2000);
    }

    $scope._errorSmartStrip = function(response) {
        console.log(response);
    }

    $scope.getPlugsBySmartStripID = function(strip) {
        var method = "GET";
        var url = "http://localhost:1880/getPlugsBySmartStripID";
        var params={"id": strip.id};
        $http({
            method : method,
            url : url,
            params : params,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( function _successGetPlugsBySmartStripID(response) {
            smartStripStorage.setPlugs(strip,response.data);
        },function _errorGetPlugsBySmartStripID(response){
            console.log(response);
        });
    }
});

