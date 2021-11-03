({
      // Server Call For Insert and Update
      singleServerCall : function(component,functionName, data){
        console.log(JSON.stringify(data));
        console.log(functionName);

        var methodName = component.get(functionName);
        console.log(methodName);
        methodName.setParams({
            objData:data
        });
        methodName.setCallback(this, $A.getCallback(function(response){
            var state = response.getState();
            console.log(state);
            if(state == "SUCCESS"){
                // CREATE/UPDATE
                if(functionName == "c.createCont"){
                    var createFlag = response.getReturnValue().flag;
                    var errorMessage = response.getReturnValue().errorMessage;

                    // Checking Duplication
                    if(createFlag == false){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error Found',
                            message:'User Already Exist',
                            duration:' 4000',
                            type: 'error',
                           
                        });
                        toastEvent.fire();
                        component.set("v.conObj", {});
                    }
                    else{
                        component.find('notifLib').showNotice({
                            "variant":"success",
                            "header":"Success",
                            "message":"Contact Record Created  Successfully!!"
                        });
                        component.set("v.conObj", {});
                    }
                }
                 else if(functionName == "c.getcontact"){
                    var checkFlag = response.getReturnValue().flag;
                    var errorMessage = response.getReturnValue().errorMessage;

                    if(checkFlag == false){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error Found',
                            message: errorMessage,
                            duration:' 4000',
                            type: 'error',
                           
                        });
                        toastEvent.fire();
                        component.set("v.conData", {});

                        // SUCCESS
                    } else {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Successful Found',
                            message:errorMessage,
                            duration:' 4000',
                            type: 'success',
                           
                        });
                        toastEvent.fire();
                        component.set("v.displayCase", true);
                        component.set("v.loginModal", false);
                        console.log(response.getReturnValue().caseList);
                        this.caseDataTable(component, response.getReturnValue().caseList);
                    }
                }
                else if(functionName == "c.delCase"){
                    var delFlag = response.getReturnValue().flag;
                    var msg = response.getReturnValue().errorMessage;
                    if(delFlag == false){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error inserting/updating',
                            message: msg,
                            duration:' 4000',
                            type: 'error',
                           
                        });
                        toastEvent.fire();
                    }
                    else{
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Successfully Deleted',
                            message: msg,
                            duration:' 4000',
                            type: 'success',
                           
                        });
                        toastEvent.fire();
                        component.set("v.displayModal", false);
                        component.set("v.selectCount", {});

                    }
                    // component.set("v.caseData", response.getReturnValue().caseList);
                    // component.set("v.displayModal", false);
                    // component.set("v.selectCount", []);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : 'Successfully Deleted',
                        message:'Case Deleted Successfully',
                        duration:' 4000',
                        type: 'success',
                       
                    });
                    toastEvent.fire();

                }
            }else if(state == "ERROR"){
                var error = response.getError();
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


    caseDataTable:function(component, data){
        var actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ]
        component.set("v.columnsToDisplay", [
            { label: 'Case Number', fieldName: 'CaseNumber', type: 'text' },
            { label: 'Account Name', fieldName: 'AccountName', type: 'text' },
            { label: 'Contact Name', fieldName: 'ContactName', type: 'text' },
            { label: 'Status', fieldName: 'Status', type: 'text' },
            {label:'Case Origin', fieldName:'Origin', type:'text'},
            { type: 'action', typeAttributes: { rowActions: actions }}
        ]);

        var rowData = data;
        console.log(data);
        for(var i=0; i <rowData.length; i++){
            var row = rowData[i];
            console.log(row);
            row.AccountName = row.Account.Name;
            row.ContactName = row.Contact.Name;
        }
        console.log(rowData);
        component.set("v.caseData", rowData);
    },

    

    getPickListValues : function(component,event){
        var action = component.get("c.fetchAccountNameValue");
        action.setCallback(this, $A.getCallback(function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var result = response.getReturnValue();

                // USING MAP - COMBO BOX ITERATION
                var fieldMap = [];
                for(var key in result){
                    fieldMap.push({
                            label: result[key].Name,
                            value: result[key].Id    
                    });
                }
                console.log(fieldMap);
                component.set("v.fieldMap", fieldMap);

                // USING AURA ITERATION
                // var items = [];
                // for(var key in result){
                //         items.push({
                //                 key: result[key].Id,
                //                 value: result[key].Name    
                //         });
                //         console.log(key);
                //     }
                //     component.set("v.options", items);
                }
        }));
        $A.enqueueAction(action);
    },
   
})