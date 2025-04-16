sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("app.postb27.controller.DetailView", {
        onInit: function () {
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this)

        },
        onRouteMatched:function(oEvent){
                let sIndex=oEvent.getParameter("arguments").id;
                let sPath="CustomerModel>/"+ sIndex
                let oView=this.getView()
                oView.bindElement(sPath)
        }
        


    });
});
