angular.module("smartStripApp").service("smartStripStorage", function(){
    this.smartStrips = [];
    this.consumption = 0;

    this.getSmartStrips = function() {
        //console.log(this.smartStrips);
        return this.smartStrips;
    }
    this.setSmartStrips = function(newSmartStrips) {
        this.smartStrips = newSmartStrips;
        return;
    }

    this.getPlugs = function(smartStrip){
        return smartStrip.plugs;
    }

    this.setPlugs = function(smartStrip,plugs){
        //console.log(smartStrip);
        smartStrip.plugs = JSON.parse(JSON.stringify(plugs));
        return;
    }

    this.setConsumption = function (smartStrip,consumption){
        smartStrip.consumption = consumption;
        return;
    }

    this.changeStripMasterState = function(smartStrip){
        this.smartStrips.forEach(element => {
            if(element.id==smartStrip.id){
                element.masterState = smartStrip.masterState;
            }
        });
    }

    this.changePlugState = function(plug){
        for(var i=0;i<this.smartStrips.length;i++){
            for(var j=0;j<this.smartStrips[i].plugs.length;j++){
                if(this.smartStrips[i].plugs[j].id==plug.id){
                    this.smartStrips[i].plugs[j]=plug;
                }
            }
        }
    }

    this.smartstripConsumption = function(){
        for(var i=0;i<this.smartStrips.length;i++){
            this.smartStrips[i].consumption=0;
            if(this.smartStrips[i].masterState==1){
                for(var j=0;j<this.smartStrips[i].plugs.length;j++){
                    if(this.smartStrips[i].plugs[j].state==1){
                        this.smartStrips[i].consumption+=this.smartStrips[i].plugs[j].powerDraw;
                    }
                }   
            }
        }
    }

    
});
