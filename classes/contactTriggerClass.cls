public with sharing class contactTriggerClass {
    public static void afterInsertTrigger(List<Contact> con) {
            Contact ct = new Contact();
            ct.OtherCity = con[0].MailingCity;
            ct.OtherStreet = con[0].MailingStreet;
            ct.OtherState = con[0].MailingState;
            ct.OtherCountry = con[0].MailingCountry;
            ct.OtherPostalCode = con[0].MailingPostalCode;
            ct.Id = con[0].Id;
            update ct;
    }

    public static void afterUpdateTrigger(List<Contact> con) {
        Contact ct = new Contact();
        ct.OtherCity = con[0].MailingCity;
        ct.OtherStreet = con[0].MailingStreet;
        ct.OtherState = con[0].MailingState;
        ct.OtherCountry = con[0].MailingCountry;
        ct.OtherPostalCode = con[0].MailingPostalCode;
        ct.Id = con[0].Id;
        upsert ct;
}

}