angular.module("smartStripApp").service("usernameStorage", function(){
    this.username = "default";
    this.ID = "default";

    this.getUsername = function() {
        //console.log("Username called: " + this.username);
        return this.username;
    }
    this.setUsername = function(newName) {
        this.username = newName;
        //console.log("username saved: " + this.username);
        return;
    }

    //TODO: secure password storage, hashed?
    this.getID = function(){
        return this.ID;
    }
    this.setID = function(newID){
        this.ID = newID;
        return;
    }
});
