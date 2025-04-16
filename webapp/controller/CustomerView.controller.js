sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
],
function (Controller,Filter,FilterOperator,MessageBox) {
    "use strict";

    return Controller.extend("app.postb27.controller.CustomerView", {
        onInit: function () {
            this._getData()

        },
        _getData:function(){
            let oModel=this.getOwnerComponent().getModel();
            let entity="/customerEntitySet"
            let that=this;
            oModel.read(entity,{
                success:function(odata, response){
                            // let oCutModel=new sap.ui.model.json.JSONModel(odata.results)
                            // that.getView().setModel(oCutModel,"CustomerModel")
                            let oCutModel=that.getOwnerComponent().getModel("CustomerModel")
                            oCutModel.setData(odata.results)
                },
                error:function(oError){
                      MessageBox.error("couldn't fetch data")
                }
            })
        },
        onDeletePress:function(oEvent){
            var that=this
            var oContext=oEvent.getSource().getBindingContext("CustomerModel").getObject()
            MessageBox.confirm("are you sure you want to delete",{
              onClose:function(option){
                   if(option==="OK"){
                      that._deleteRecord(oContext)
                      that._getData()
                   }
              }
            })
       },
       _deleteRecord:function(parmContext){
            let iKey=parmContext.Customerid
            
            let oModel=this.getOwnerComponent().getModel();
                       // customerEntitySet(3)
            let entity="/customerEntitySet(" + iKey +")"
            oModel.refreshSecurityToken(function(success){
                let Token=oModel.getHeaders()['x-csrf-token']
                    oModel.setHeaders({
                        "x-csrf-token":Token
                    });
                    oModel.remove(entity,{
                        success:function(){
                            MessageBox.success("record deleted")
                        },
                        error:function(){
                            MessageBox.error("record deletion failed")
                        }
                    })


            },function(error){
                MessageBox.error("can't fetch csrf token")
            })

       },
        onCreate:function(){
            let oRouter=this.getOwnerComponent().getRouter()
            oRouter.navTo("RouteCreateView")
            
        },
        onRowSelect:function(oEvent){
           let oContextItem=oEvent.getParameter("listItem")
           let sPath=oContextItem.getBindingContext("CustomerModel").sPath
           let aItems=sPath.split("/")
            let sPath2=aItems[aItems.length-1]
             
        
           
           let oRouter=this.getOwnerComponent().getRouter()
             oRouter.navTo("RouteDetailView",{
                id:sPath2
             })
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
