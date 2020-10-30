angular.module("smartStripApp").controller("guiCtrl", function ($scope, usernameStorage, smartStripStorage, $http) {
    $scope.$watch('stripName',function() {$scope.testAddNewStrip();});
    $scope.$watch('stripNumber',function() {$scope.testAddNewStrip();});

    $scope.smartStrips = [];
    
    /* for(var i=0;i<$scope.smartStrips.length;i++){
        if($scope.smartStrips[i].masterState==true) $scope.smartStrips[i].color="bg-success";
        else $scope.smartStrips[i].color="bg-secondary";
        for(var j=0;j<$scope.smartStrips[i].plugs.length;j++){
            if($scope.smartStrips[i].plugs[j].state==true) $scope.smartStrips[i].plugs[j].color="bg-success";
            else $scope.smartStrips[i].plugs[j].color="bg-secondary";
        }
    } */

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
    //smartStrips.forEach(element=>$scope.colors.push(element.state));

    $scope.toggleSmartStrip = function(x){
        //console.log(x);
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
    }).then( _successaddSmartStrip, _erroraddSmartStrip);
    }

    function _successaddSmartStrip(response) {
    $scope.stripName="";
    $scope.stripNumber="";
    }

    function _erroraddSmartStrip(response) {
        console.log(response.statusText);
    }


/*
//TODO change to proper GET
    function getStripStatus() {
        var method = "GET";
        var url = "http://localhost:1880/getStripStatus";
        var data={"id": stripStorage.getID()};
        $http({
            method : method,
            url : url,
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( _success, _error );
    }

    function getPlugStatus() {
        var method = "GET";
        var url = "http://localhost:1880/getPlugStatus";
        var data={"id": plugStorage.getID()};
        $http({
            method : method,
            url : url,
            data : data,
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then( _success, _error );
    }

    */

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
        }).then( _successSwitchMasterState, _errorSwitchMasterState);
    }

    function _successSwitchMasterState(response) {
        //console.log(response);
        smartStripStorage.changeStripMasterState(response.data[0]);
    }

    function _errorSwitchMasterState(response) {
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
        }).then( _successSwitchState, _errorSwitchMasterState);
    }

    function _successSwitchState(response) {
        smartStripStorage.changePlugState(response.data[0]);
    }

    function _errorSwitchMasterState(response) {
        console.log(response.statusText);
    }
/*
        function switchIsPlugged() {
            var method = "POST";
            var url = "http://localhost:1880/switchIsPlugged";
            var data={"id": plugID};
            $http({
                method : method,
                url : url,
                data : data,
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then( _success, _error );
    }

        function switchIsPluggedActive() {
            var method = "POST";
            var url = "http://localhost:1880/switchIsPluggedActive";
            var data={"id": plugID};
            $http({
                method : method,
                url : url,
                data : data,
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then( _success, _error );
    }

*/


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
});

