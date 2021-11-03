({
    init: function (component,event,helper) {

        var actions = [
            { label: 'Edit', name: 'edit' },
            { label: 'Delete', name: 'delete' }
        ]
        component.set("v.columnsToDisplay", [
            { label: 'First Name', fieldName: 'FirstName', type: 'text' },
            { label: 'Last Name', fieldName: 'LastName', type: 'text' },
            { label: 'Mobile', fieldName: 'MobilePhone', type: 'phone' },
            { label: 'Email', fieldName: 'Email', type: 'email' },
            { label: 'City', fieldName: 'MailingCity', type: 'text' },
            { label: 'Street', fieldName: 'MailingStreet', type: 'text' },
            { label: 'State', fieldName: 'MailingState', type: 'text' },
            { label: 'Country', fieldName: 'MailingCountry', type: 'text' },
            { label: 'Postal Code', fieldName: 'MailingPostalCode', type: 'number' },
            { type: 'action', typeAttributes: { rowActions: actions } }
        ]);

        helper.singleServerCall(component, 'c.getDefaultContact', null,null);

    },

    "echo": function (component, event, helper) {

        //  SEARCH GET CONTACT
        var getContact = component.get("c.getContactList");
        getContact.setParams({
            firstName: component.get("v.conObj.FirstName"),
            lastName: component.get("v.conObj.LastName"),
            email: component.get("v.conObj.Email"),
            mobileno: component.get("v.conObj.MobilePhone")
        });
        getContact.setCallback(this, $A.getCallback(function (response) {
            component.set("v.contactDataList", response.getReturnValue());
        }));
        $A.enqueueAction(getContact);
    },

    // CREATE CONTACT
    createContact: function (component, event, helper) {
        var data = component.get("v.conObj");
        var btn = event.getSource().get("v.label");
        
        var phoneCmp = component.find('phoneId');
        var phoneCmpValue = phoneCmp.get("v.value");
        var phoneRegexFormat = /^\d{10}$/;
        if(!phoneCmpValue.match(phoneRegexFormat)) {
            phoneCmp.setCustomValidity("Please Enter 10 Digit Number");
            phoneCmp.reportValidity();
        } 
        
        else{
            try{
                helper.singleServerCall(component, 'c.createCont', data, btn);
            }
            catch(error){
                var msg = error.getMessage();
                helper.apexToastMessage(msg);
            }
        }
       
    },

    //  UPDATE CONTACT
    updateContact: function (component, event, helper) {

        var data = component.get("v.conObj");
        var phoneCmp = component.find('phoneId');
        var phoneCmpValue = phoneCmp.get("v.value");
        var phoneRegexFormat = /^\d{10}$/;
        if(!phoneCmpValue.match(phoneRegexFormat)) {
            phoneCmp.setCustomValidity("Please Enter 10 Digit Number");
            phoneCmp.reportValidity();
        } 
        else{
            try{
                helper.singleServerCall(component, "c.createCont",data,null);
            }catch(error){
               var msg = error.getMessage();
               helper.apexToastMessage(msg);
            }
        }
        
    },

    // DELETE CONTACT
    deleteContact:function(component,event){
        var multiConLen = component.get("v.listContacts").length;

        if(multiConLen == 0){
            var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Warning',
                            message:'Please Choose a Record to Delete!',
                            duration:' 4000',
                            type: 'info',
                        });
                        toastEvent.fire();
        }
        else {
            component.set("v.displayModal", true);
       
        }
        
},

    selectedrows: function (component, event) {
        var selectedRows = event.getParam('selectedRows');
             component.set('v.listContacts', selectedRows);
        
    },
    clearForm: function(component,event,helper){
        component.set('v.conObj',{});
        helper.singleServerCall(component, 'c.getDefaultContact', null, null);

    },

    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        var rowId = row.Id;
        component.set("v.listContacts", row);
        var multiConLen = component.get("v.listContacts").length;

        switch (action.name) {
            case 'edit':
                    component.set("v.conObj.FirstName", row.FirstName);
                    component.set("v.conObj.LastName", row.LastName);
                    component.set("v.conObj.Email", row.Email);
                    component.set("v.conObj.MobilePhone", row.MobilePhone);
                    component.set("v.conObj.MailingStreet",row.MailingStreet);
                    component.set("v.conObj.MailingState", row.MailingState);
                    component.set("v.conObj.MailingCity", row.MailingCity);
                    component.set("v.conObj.MailingCountry", row.MailingCountry);
                    component.set("v.conObj.MailingPostalCode", row.MailingPostalCode);
                    component.set("v.conObj.Id", rowId);
                break;

            case 'delete':
            component.set("v.displayModal", true);
                break;
                default: break;
            }
    },
    closeBtn : function(component, event, helper) {
        component.set("v.displayModal", false);
},
    cancelBtn : function(component, event, helper) {
		component.set("v.displayModal", true);
	},
    
    noBtn : function(component, event, helper) {
        component.set("v.displayModal", false);
    },

yesBtn : function(component, event, helper) {
   var data = component.get("v.listContacts");
   try{
       helper.singleServerCall(component, "c.delContact", data, null)
   }
   catch(error){
    var msg = error.getMessage();
    helper.apexToastMessage(msg);
   }    
   component.set("v.rowSelection",false);
 },

 newCase: function(component,event, helper){
     var data = component.get("v.conObj");
     var btn = event.getSource().get("v.label");
     console.log(btn);
     try{
         helper.singleServerCall(component,"c.createCont", data, btn);
     }
     catch(err){
         var msg = err.getMessage();
         helper.apexToastMessage(msg);
     }
     console.log("Create A case");
 }

})