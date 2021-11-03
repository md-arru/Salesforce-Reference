trigger ContactTrigger on Contact (before insert, before update, after insert, after update, before delete) {
   if(Trigger.isBefore){
    if(Trigger.isInsert || Trigger.isUpdate){
        for(Contact con : Trigger.New){
            
            if(con.FirstName == null || con.Email == null){
                con.addError('Please Enter Name and Email');
             }
             else{
             // String emailDomain = con.Email.substring(con.Email.length() - 6);
             // String emailDomain2 = con.Email.endsWith('.co.in');
             // if(emailDomain == '.co.in'){
             //     System.debug(emailDomain);
             // }
             if(con.Email.endsWith('.co.in')){
                 System.debug('Email Success');

             }
             else{
                 con.addError('Email Must Be End With .co.in');
             }
             if(con.MobilePhone != null && con.MobilePhone.length() == 10){
                  Boolean phoneFormat0 = con.MobilePhone.startsWith('0');
                  Boolean phoneFormat1 = con.MobilePhone.startsWith('1');
                  Boolean phoneFormat2 = con.MobilePhone.startsWith('2');
                  Boolean phoneFormat3 = con.MobilePhone.startsWith('3');
                  Boolean phoneFormat4 = con.MobilePhone.startsWith('4');
                  Boolean phoneFormat5 = con.MobilePhone.startsWith('5');
                 if(phoneFormat0 || phoneFormat1 || phoneFormat2 || phoneFormat3 || phoneFormat4 ||    phoneFormat5){
                  con.addError('Phone Number Should Not Start With 0,1,2,3,4,5');
                 }
             }
             else if(con.MobilePhone != null && con.MobilePhone.length() != 10){
                 con.addError('Please Enter 10 Digit Number');
             }  
             else{
                 con.addError('Please Enter Phone number');
             }
            }
            // con.AccountId = '0015g00000QX68vAAD';
            ApexAuraCode.bI(Trigger.new);
         }


        
     }
    //  RESTORE DELETED RECORD INTO OTHER OBJECT CONTACT TRACK
     else if(Trigger.isDelete){
         List<Contact_Track__c> ctrackList = new List<Contact_Track__c>();
         for(Contact ct:Trigger.old){
             Contact_Track__c ctrack = new Contact_Track__c();
             
             if(ct.AccountId != null){
                 ct.addError('Account Is Associated Cannot Delete This Record');
                }
                else{
                 ctrack.First_Name__c = ct.FirstName;
                 ctrack.Last_Name__c = ct.LastName;
                 ctrack.Email__c = ct.Email;
                 ctrack.Mobile_Phone__c = ct.MobilePhone;
                 ctrack.Mailing_City__c = ct.MailingCity;
                 ctrack.Mailing_Country__c = ct.MailingCountry;
                 ctrack.Mailing_State__c = ct.MailingState;
                 ctrack.Mailing_Street__c = ct.MailingStreet;
                 ctrack.Mailing_Postal_Code__c = ct.MailingPostalCode;
                 ctrack.Account__c = ct.AccountId;
                 ctrack.Other_City__c = ct.OtherCity;
                 ctrack.Other_Country__c = ct.OtherCountry;
                 ctrack.Other_State__c = ct.OtherState;
                 ctrack.Other_Street__c = ct.OtherStreet;
                 ctrack.Other_Postal_Code__c = ct.OtherPostalCode;
                 ctrackList.add(ctrack);
                 System.debug(ctrack);
             }

         }
         insert ctrackList;
     }
    

   }
    //UPDATE MAILINGADDRESS TO OTHERADDRESS
   else if(Trigger.isAfter){
       if(Trigger.isInsert)
       {
           List<Account> acc = [SELECT ID FROM Account order by LastModifiedDate DESC];
            Contact ct = new Contact();
            for(Contact con: Trigger.New){
                ct.OtherCity = con.MailingCity;
                ct.OtherStreet = con.MailingStreet;
                ct.OtherState = con.MailingState;
                ct.OtherCountry = con.MailingCountry;
                ct.OtherPostalCode = con.MailingPostalCode;
                ct.AccountId = acc[0].id;
                ct.Id = con.Id;
            }
            update ct;
            ApexAuraCode.insertCont(Trigger.New);
       }
    //    AFTER UPDATE
       else if(Trigger.isUpdate)
       {
            Contact ct = new Contact();
            for(Contact con: Trigger.new){
                ct.OtherCity = con.MailingCity;
                ct.OtherStreet = con.MailingStreet;
                ct.OtherState = con.MailingState;
                ct.OtherCountry = con.MailingCountry;
                ct.OtherPostalCode = con.MailingPostalCode;
                ct.Id = con.Id;
                if(TriggerCount.getDupTimes() < 1){
                    TriggerCount.setDupTimes();
                    update ct;
                }
            }
       }
    }     
}