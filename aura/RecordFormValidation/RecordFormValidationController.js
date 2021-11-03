({
        handleSubmit : function(component, event, helper) {
            event.preventDefault();
            const fields = event.getParam('fields');
            //console.log(fields);
            let isValidData = true;
            var validate = component.find('formValidation');
            var contact = component.find('newContactField')
            fields.Is_Active__c	= true;
            var landLineVal = fields.HomePhone;
            var phoneVal = fields.MobilePhone;
            var lastNameVal = fields.LastName;
            var emailVal = fields.Email;

            if(($A.util.isUndefinedOrNull(lastNameVal) || $A.util.isUndefined(lastNameVal) || $A.util.isEmpty(lastNameVal))){
                isValidData = false;
                // alert("Please Enter the missing values");
                setTimeout(function(){ 
                    component.find('ErrorMessage').setError('Please Enter Last Name'); 
                }, 1000);
                return;
            }


            if(($A.util.isUndefinedOrNull(emailVal) || $A.util.isUndefined(emailVal) || $A.util.isEmpty(emailVal))){
                isValidData = false;
                // alert("Please Enter the missing values");
                setTimeout(function(){ 
                    component.find('ErrorMessage').setError('Please Enter Email'); 
                }, 1000);
                return;

            }
            var phoneRegexFormat = /^\d{10}$/;
            if( !$A.util.isEmpty(phoneVal) && !phoneVal.match(phoneRegexFormat)){
                // alert("Phone number is incorrect");
                isValidData = false;
                setTimeout(function(){ 
                    component.find('ErrorMessage').setError('Please Enter 10 digit Phone number'); 
                }, 1000);
                return;
            }    
    
            var landLineRegexFormat = /^\d{3}\-\d{8}$/;
            if( !$A.util.isEmpty(landLineVal) && !landLineVal.match(landLineRegexFormat)){
                // alert("LandLine Number is Incorrect");
                isValidData = false;
                setTimeout(function(){ 
                    component.find('ErrorMessage').setError('Please enter Correct Landline xxx-xxxxxxxx'); 
                }, 1000);
                $A.util.addClass(contact, 'please enter Correct Landline');
                return; 
            }
            if(isValidData){
                validate.submit(fields);
                component.find('notifLib').showToast({
                    "variant": "success",
                    "title": "Contact Created",
                    "message": "Record has been inserted successfully"
                });
            }
        },


        handlereset: function(cmp, event, helper) {
            cmp.find('newContactField').forEach(function(f) {
                f.reset();
            });
        },
        // var allValid = cmp.find('stdValidation').reduce(function (valid, inputCmp) {
        //     inputCmp.reportValidity();
        //     return valid && inputCmp.checkValidity();
        // }, true);
        // console.log(allValid);
        // if(allValid){
        //     alert(" Values are correct ");
        //     validate.submit(fields);
        // } else {
        //     alert("Please check the values");
        // }
        
     
        // var allValid = component.find('stdValidation').reduce(function (valid, component) {
         //     component.reportValidity();
         //     return valid && component.checkValidity();
         // }, true);
         // if(allValid){
         //     alert(" Values are correct ");
         //     validate.submit(fields);
         // } else {
         //     alert("Please check the values");
         // }
       
    //  }
})