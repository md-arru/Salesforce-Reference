({
    handleSuccess : function(component, event, helper) {
        component.find('notifLib').showToast({
            "variant": "success",
            "title": "Account Created",
            "message": "Record has be inserted successfully"
        });
    },
    showToast : function(component, event, helper) {
        component.find('notifLib').showToast({
            "variant": "success",
            "title": "Contact Updated",
            "message": "Record has be inserted successfully"
        });
    },
    handlesubmit : function(component, event, helper) {
        component.find('notifLib').showToast({
            "variant": "success",
            "title": "Vehicle Details",
            "message": "Record has be inserted successfully"
        });
    },
    handlereset: function(cmp, event, helper) {
        cmp.find('field').forEach(function(f) {
            f.reset();
        });
    }
})