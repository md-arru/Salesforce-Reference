({
    createContact: function (component, event, helper) {
        var data = component.get("v.conObj");

            try{
                helper.singleServerCall(component, 'c.createCont', data);
            }
            catch(error){
                var msg = error.getMessage();
                helper.apexToastMessage(msg);
            }
        
    },

    init: function(cmp,event,helper){
        helper.getPickListValues(cmp, event);
    },

    signUpForm: function(component,event,helper){
        console.log('safjgsd');
        component.set("v.signUpModal", true);
    },

    cancelBtn : function(component, event, helper) {
		component.set("v.signUpModal", true);
	},

    closeBtn : function(component, event, helper) {
        component.set("v.signUpModal", false);
    },

    noBtn : function(component, event, helper) {
        component.set("v.signUpModal", false);
    },
    closeCaseDataTable: function(component, event, helper) {
        component.set("v.displayCase", false);
        component.set("v.loginModal", true);
    },

    loginForm : function(component, event, helper) {
      var data = component.get("v.conLoginData");
      try{
          helper.singleServerCall(component, 'c.getcontact', data);
      }
      catch(error){
          var mg = error.getMessage();
          console.log(mg);
      }
    },

    handleRowAction:function(component,event,helper){
        var action = event.getParam('action');
        var row = event.getParam('row');
        var rowId = row.Id;
        // component.set("v.selectCount", row);
    switch(action.name){
        case 'delete':
            component.set("v.selectCount", row);
            component.set("v.displayModal", true);
            break;

            default:
                break;
    }
},
selectedrows: function (component, event) {
    var selectedRows = event.getParam('selectedRows');
         component.set('v.selectCount', selectedRows);
    
},

updateSelectedText: function (cmp, event) {
    var selectedRows = event.getParam('selectedRows');
    cmp.set('v.selectedRowsCount', selectedRows.length);
},

yesBtn:function(component,event,helper){
    var data = component.get('v.selectCount');
    console.log(JSON.stringify(data));

    try{
        helper.singleServerCall(component,"c.delCase",data);
    }
    catch(error){
        var msg = error.getMessage();
        console.log(msg);
    }
    component.set("v.rowSelection",false);
},

noDelBtn : function(component, event, helper) {
    component.set("v.displayModal", false);
},
});