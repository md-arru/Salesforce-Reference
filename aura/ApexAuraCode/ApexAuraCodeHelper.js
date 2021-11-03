({

    // NOTIFICATION TOAST MESSAGE
    getNotify: function(component, functionName){
        if(functionName == "c.createCont"){
            component.find('notifLib').showNotice({
                "variant":"success",
                "header":"Success",
                "message":"Contact Record Created / Updated Successfully!!"
            });
        } if(functionName === "c.delContact"){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
               title : 'Delete',
               message: 'Record Deleted Successfully!!!',
           });
           toastEvent.fire();
        }
    },

    // Server Call For Insert and Update
    singleServerCall : function(component,functionName, data, btnName){
        var methodName = component.get(functionName);
        methodName.setParams({
            objData:data,
            btn: btnName
        });
        methodName.setCallback(this, $A.getCallback(function(response){
            var state = response.getState();
            console.log(state);
            if(state == "SUCCESS"){
                // CREATE/UPDATE
                if(functionName == "c.createCont"){
                    component.set("v.contactDataList", response.getReturnValue().contList);
                    var createFlag = response.getReturnValue().flag;
                    var errorMessage = response.getReturnValue().errorMessage;

                    // Checking Duplication
                    if(createFlag == false){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error Found',
                            message:'Duplication of Records',
                            duration:' 4000',
                            type: 'error',
                           
                        });
                        toastEvent.fire();
                        component.set("v.conObj", {});
                    }
                    else{
                        this.getNotify(component, functionName);
                        component.set("v.conObj", {});
                    }
                    // DELETE
                }else if(functionName == "c.delContact"){
                    component.set("v.contactDataList", response.getReturnValue().contList);
                    this.getNotify(component, functionName);
                    component.set("v.displayModal", false);
                    component.set("v.listContacts", [])
                }
                // SEARCH
                 else{
                    component.set("v.contactDataList", response.getReturnValue());
                    component.set("v.listContacts", [])
                }
            }else if(state == "ERROR"){
                var error = response.getError();
                console.log(error[0]);
                console.log(error[0].message);
                var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error Occured',
                            message: error[0].message,
                            duration:' 4000',
                            type: 'error',
                           
                        });
                        toastEvent.fire();
            }
        }));
        $A.enqueueAction(methodName);
    },
    apexToastMessage:function(message){
        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error',
                            message: 'An Error Occured' + message[0],
                            duration:' 4000',
                            type: 'error',
                           
                        });
                        toastEvent.fire();
    }
})