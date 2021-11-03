({
	myAction : function(component, event, helper) {
		var lstOfContact = component.get("c.contactListOFRelatedAccount");
        var recordId = component.get("v.recordId");
        lstOfContact.setParams({
            accountid:recordId
        });
        
        lstOfContact.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var contactList = response.getReturnValue();
                component.set("v.ContactList", contactList);
            }else{
                alert("Error Has Occured");
            }
        });
        $A.enqueueAction(lstOfContact);
	},
    
    handleClick : function(component,event,helper){
        var idx = event.target.getAttribute('data-index');
        console.log(idx);
        var contact = component.get('v.ContactList')[idx];
        console.log(contact);
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": contact.Id,
            "slideDevName": "detail"
        });
        navEvt.fire();
    }
})