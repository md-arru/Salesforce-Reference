public with sharing class FetchContact {
    @AuraEnabled
    public static List<Contact> getContactList( String searchKeyWord){
        List<Contact> contactlist =  new List<Contact>();


        // If Search  value is null  then return all  contacts . Else  search accordingly
        String searchKey = String.isBlank(searchKeyWord) ? '%%' : searchKeyWord + '%';
        
        contactlist = [SELECT FirstName,LastName, MobilePhone, Email,MailingCity, MailingStreet, MailingCountry FROM Contact WHERE  (FirstName  LIKE :searchKey) or (LastName LIKE:searchKey) or (MobilePhone LIKE: searchKey) or (Email LIKE : searchKey)];

        return contactlist;

    }
}