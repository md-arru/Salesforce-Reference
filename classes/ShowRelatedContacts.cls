public class ShowRelatedContacts {
    
    @AuraEnabled
    public static List<Contact> contactListOFRelatedAccount(String accountid){
        List<Contact> contactList = [SELECT Id,FirstName , LastName,AccountId,Account.Name,Email,
                                     Phone FROM Contact WHERE AccountId =:accountid];
        return contactList;
        
    }

}