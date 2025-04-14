sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
function (Controller,Filter,FilterOperator) {
    "use strict";

    return Controller.extend("app.postb27.controller.CustomerView", {
        onInit: function () {
            let oModel=this.getOwnerComponent().getModel();
            let entity="/customerEntitySet"
            let that=this;
            oModel.read(entity,{
                success:function(odata, response){
                            let oCutModel=new sap.ui.model.json.JSONModel(odata.results)
                            that.getView().setModel(oCutModel,"CustomerModel")
                },
                error:function(oError){
                      MessageBox.error("couldn't fetch data")
                }
            })

        },
        onCreate:function(){
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteCreateView")
            
        },
        onRowSelect:function(oEvent){
           let oContextItem=oEvent.getParameter("listItem")
           let key=oContextItem.getBindingContext().getObject().Customerid;
           let oRouter=this.getOwnerComponent().getRouter()
             oRouter.navTo("RouteDetailView")
        },
        onFilter:function(){
            let aFilter=[]
            let sName=this.getView().byId("idFilterName").getValue()
            let sCity=this.getView().byId("idFilterCurr").getValue()
            if(sName){
              let filterName=new Filter("Custname", FilterOperator.Contains,sName)                    
              aFilter.push(filterName)
            }
            if(sCity){
             let filterName=new Filter("Currency", FilterOperator.Contains,sCity)                    
             aFilter.push(filterName)
            }
          
            let oTable=this.getView().byId("idMTable")
            let bindingInfo=oTable.getBinding("items")
            if (bindingInfo) {
                bindingInfo.filter(aFilter);
            }
     
             
           }



    });
});
