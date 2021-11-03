trigger CabAllocation on Cab_Allocation__c (before insert) {
    if(trigger.isInsert || trigger.isupdate){
       if(trigger.isBefore){
           for(Cab_Allocation__c cabrec : Trigger.new){
               if(cabrec.Schedule_Time__c.hour() > 18){
                    cabrec.addError('Entered Time Must Be within 6pm');
               }
           }
              
       }
   }

}