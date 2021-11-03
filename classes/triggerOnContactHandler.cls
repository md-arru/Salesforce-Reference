public with sharing class triggerOnContactHandler {
    public static void lookUpRollUp(List<Contact> newLstOfContact, List<Contact> oldListOfContact) {
        Set<Id> setOfAccIds = new Set<Id>();
               if(newLstOfContact != null){
                   for(Contact obj:newLstOfContact){
                       if(obj.AccountId != null){
                           setOfAccIds.add(obj.AccountId);
                       }
                   }
               }else if(oldListOfContact != null){
                    for(Contact obj:oldListOfContact){
                        if(obj.AccountId != null){
                            setOfAccIds.add(obj.AccountId);
                        }
                    }
               }
               List<Account> lstOfAccount = new List<Account>();
               if(!setOfAccIds.isEmpty()){
                   for(Account objacc : [SELECT id, Count__c,(SELECT Id FROM Contacts) FROM Account WHERE ID IN :setOfAccIds]){
                       if(objacc.Contacts.size()> 0){
                           objacc.Count__c = objacc.Contacts.size();
                           lstOfAccount.add(objacc);
                       }
                       else{
                           objacc.Count__c = 0;
                           lstOfAccount.add(objacc);
                       }
                   }
                   if(!lstOfAccount.isEmpty()){
                    update lstOfAccount;
                }
    }
              
}

}