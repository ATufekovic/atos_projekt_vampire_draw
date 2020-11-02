angular.module("smartStripApp").service("smartStripStorage", function(){
    this.smartStrips = [];

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

    this.calculatePowerDraw = function(){
        this.smartStrips.forEach(strip => {
            var totalDraw = 0;
            strip.plugs.forEach(plug => {
                totalDraw += plug.powerDraw;
            });
            strip.powerDraw = totalDraw;
        });
    }    
});
