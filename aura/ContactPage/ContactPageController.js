({
    saveContact : function(component, event, helper) {

        var contactObj = component.get("v.contact");
        var addressObj = component.get("v.address");

        // Standard Validation
        var landline = component.find('landlineId');
        var landValue = landline.get('v.value');
        var landlineRegexFormat = /^\d{3}\-\d{8}$/;
        if( !$A.util.isEmpty(landValue) && !landValue.match(landlineRegexFormat)){
        
            landline.setCustomValidity("Please enter in xxx-xxxxxxxx format");
            landline.showHelpMessageIfInvalid();
        } else {
            landline.setCustomValidity("");
        }
        

        //Custom validation
      var allIds = ["fNameId","lNameId", "emailId", "mobileId" ,"landlineId"];
        let isAllValid = allIds.reduce(function(valid, control){
           var inputCmp = component.find(control);
           inputCmp.reportValidity();
           return valid && inputCmp.checkValidity();
        }, true);
       if(isAllValid){
          alert("Ready to Submit");
       } else {
          alert("Please check the values");
       }
 
        alert(
            `FirstName: ${contactObj.firstName} 
            LastName : ${contactObj.lastName} 
            Email: ${contactObj.email}
            Mobile : ${contactObj.mobileNo} 
            Land Line : ${contactObj.landlineNo}
            street : ${addressObj.street}
            City : ${addressObj.city}
            Country: ${addressObj.country}
            Province:${addressObj.province}
            PostalCode :${addressObj.postalCode}
            `)
       
        // var allValid = component.find('contact').reduce(function (valid, component) {
        //     // if($A.util.isEmpty(contactObj.email)){
        //     //     return false;
        //     //    }
        //       component.reportValidity();
        //       return valid && component.checkValidity();
            
        //    }, true);
        //    if (allValid) {
        //        alert('All form entries look valid. Ready to submit!');
        //    } else { 
        //       alert('Please fill all form entries and try again.');
        //   }   
    },
        handleChange: function (cmp, event) {
            var selectedOptionValue = event.getParam("value");
            alert("Option selected with value: '" + selectedOptionValue);
        }


})