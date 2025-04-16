sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
function (Controller,MessageBox) {
    "use strict";

    return Controller.extend("app.postb27.controller.CreateView", {
        onInit: function () {
                  let oRouter=this.getOwnerComponent().getRouter()
                //   oRouter.attachRoutePatternMatched(this.onRouteMatached, this)
        },
        
       
            onSubmit:function(oEvent){
                    let oModel=this.getOwnerComponent().getModel()
                    let entity="/customerEntitySet"
                    let sId=this.getView().byId("idId").getValue()
                        sId=parseInt(sId)
                    let sName=this.getView().byId("idName").getValue()
                    let sDate=this.getView().byId("idDate").getValue()
                        sDate=new Date(sDate)
                        // "\/Date(1741824000000)\/"
                        sDate="\/Date("+sDate.getTime()+")\/"
                    let sCurr=this.getView().byId("idCurr").getValue()
                        sCurr=sCurr.toUpperCase()


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
                        oModel.create(entity,payLoad,{
                            success:function(odata, oResp){
                                     MessageBox.success("Record inserted",{
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
