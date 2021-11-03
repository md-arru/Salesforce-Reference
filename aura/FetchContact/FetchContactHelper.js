({
    fetchContactHelper: function(searchVal, component){
        component.set("v.columnsToDisplay", [
            {label: 'First Name', fieldName: 'FirstName', type: 'text' },
            {label: 'Last Name', fieldName: 'LastName', type: 'text' },
            {label: 'Mobile', fieldName: 'MobilePhone', type:'phone'},
            {label: 'Email', fieldName: 'Email', type:'email'},
            {label: 'City', fieldName: 'MailingCity', type:'text'},
            {label: 'Street', fieldName: 'MailingStreet', type:'text'},
            {label: 'Country', fieldName: 'MailingCountry', type:'text'},
        ]);

        // Creating the action
        var action = component.get("c.getContactList");
        action.setParams({
            "searchKeyWord" : searchVal
        });

        // Calling the Server Side Apex
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.myContactData", response.getReturnValue());
            }else{
                alert("An error occured while Fetching the data");
            }
        });
        $A.enqueueAction(action);
    }
})