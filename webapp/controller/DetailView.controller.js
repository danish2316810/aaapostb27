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
        },
        onPressEdit:function(oEvent){
            let sPath=oEvent.getSource().getBindingContext("CustomerModel").sPath
            let aItems=sPath.split("/")
            let sPath2=aItems[aItems.length-1]
            let oRouter=this.getOwnerComponent().getRouter()
                oRouter.navTo("RouteUpdateView",{
                    index:sPath2
                })
        }
        


    });
});
