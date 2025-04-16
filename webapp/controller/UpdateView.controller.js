sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller,MessageBox) {
    "use strict";

    return Controller.extend("app.postb27.controller.UpdateView", {
        onInit: function () {
            let oRouter=this.getOwnerComponent().getRouter();
            oRouter.attachRoutePatternMatched(this.onRouteMatched, this)
        },
        
        onRouteMatched:function(oEvent){
            let sIndex=oEvent.getParameter("arguments").index;
            let sPath="CustomerModel>/"+ sIndex
            let oView=this.getView()
            oView.bindElement(sPath)
    },
            onUpdate:function(oEvent){
                    let oModel=this.getOwnerComponent().getModel()
                    
                    
                    let sId=this.getView().byId("idIdUp").getValue()
                        sId=parseInt(sId)
                    let sName=this.getView().byId("idNameUp").getValue()
                    let sDate=this.getView().byId("idDateUp").getValue()
                        sDate=new Date(sDate)
                        // "\/Date(1741824000000)\/"
                        sDate="\/Date("+sDate.getTime()+")\/"
                    let sCurr=this.getView().byId("idCurrUp").getValue()
                        sCurr=sCurr.toUpperCase()
                    // let entity="/customerEntitySet(id)"
                    let entity="/customerEntitySet("+sId +")"

                   let payLoad={
                    Customerid : sId,
                    Currency : sCurr,
                    Dateofjoin : sDate,
                    Custname : sName
                   }
                var that=this
                   oModel.refreshSecurityToken(
                    function(success){
                            let sToken=oModel.getHeaders()['x-csrf-token']
                            oModel.setHeaders({
                                "X-CSRF-Token":sToken
                            })
                    //  part of success function
                        oModel.update(entity,payLoad,{
                            success:function(odata, oResp){
                                     MessageBox.success("Record updated",{
                                        onClose:function(){
                                            that.getOwnerComponent().getRouter().navTo("RouteCustomerView");

                                        }
                                     })
                            },
                            error:function(oError){
                                MessageBox.error("failed")
                            }
                        })



                    },
                    function (error){
                        MessageBox.show("failed to get csrf token")
                    }
                )






            }

    });
});
