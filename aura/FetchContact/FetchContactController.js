// ({
//     init: function(component, event, helper){
//         component.set('v.columnsToDisplay', [
//             {label: 'First Name', fieldName: 'FirstName', type: 'text' },
//             {label: 'Last Name', fieldName: 'LastName', type: 'text' },
//             {label: 'Mobile', fieldName: 'MobilePhone', type:'phone'},
//             {label: 'Email', fieldName: 'Email', type:'email'},
           
//         ]);
//         var contactList = component.get("c.getContactList");
//         contactList.setCallback(this, $A.getCallback(function(response){
//             component.set('v.myContactData',response.getReturnValue() );
//         }));
//         $A.enqueueAction(contactList);
//     }
// })

({
    init : function(component, event, helper){
        helper.fetchContactHelper(null, component);
    },

    // Method to perform a search on contact
    searchContact: function(component, event, helper){
        var searchVal = component.find("searchField").get("v.value");
        helper.fetchContactHelper(searchVal,component);
    }
})