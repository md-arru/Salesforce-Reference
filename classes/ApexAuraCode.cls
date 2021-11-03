public with sharing class ApexAuraCode {
    
    // Button Variable
    static String btnName;

    public class Wrapper{
        @AuraEnabled
        public List<Contact> contList;
        @AuraEnabled
        public Boolean flag;
        @AuraEnabled
        public String errorMessage;

    }

    // SEARCH CONTACT
    @AuraEnabled
    public static List<Contact> getContactList(String firstName, String lastName, String email, String mobileno){

        List<Contact> contactList;

        String commonQuery = 'SELECT FirstName, LastName, MobilePhone, Email, MailingCity, MailingState, MailingCountry, MailingStreet, MailingPostalCode FROM Contact ';

        if(firstName != null  && lastName != null && email != null && mobileno != null){
            commonQuery += ' WHERE (FirstName =: firstName) and (LastName =:lastName) and (Email =:email) and (MobilePhone =: mobileno)';
        }
        else if(firstName != null  && lastName != null && email != null ){
           commonQuery += ' WHERE (FirstName =:firstName) and (LastName =:lastName) and (Email =:email)';
        }
        else if(firstName != null  && lastName != null && mobileno != null ){
          commonQuery += ' WHERE (FirstName =: firstName) and (LastName =: lastName) and (MobilePhone=: mobileno)';
        } 
         else if(lastName != null && email != null && mobileno != null){
            commonQuery += ' WHERE (LastName =:lastName) and (Email =:email) and (MobilePhone =:mobileno)';
        }
        else if(firstName != null && email != null && mobileno != null){
           commonQuery += ' WHERE (FirstName =:firstName) and (Email =:email) and (MobilePhone =:mobileno)';
        }
        else if(email != null && mobileno != null && firstName != null){
            commonQuery += ' WHERE (Email =:email and (MobilePhone=:mobileno) and (FirstName =:firstName)';
        }else if(firstName != null && lastName != null){
           commonQuery += ' WHERE (FirstName =:firstName) and (LastName =:lastName)';
        }
        else if(lastName != null && email != null){
           commonQuery += ' WHERE (LastName=:lastName) and (Email =:email)';
        }else if(email != null && mobileno != null){
            commonQuery += ' WHERE (Email=:email)  and (MobilePhone=:mobileno )';
          
        }
    else if(firstName != null && email != null){
        commonQuery += ' WHERE  (FirstName=:firstName) and (Email=:email)';
    }else if(mobileno != null && firstName != null){
            commonQuery += ' WHERE (FirstName =:firstName) and (MobilePhone=:mobileno )';
        
        }else{
            commonQuery += ' WHERE (FirstName=:firstName and FirstName!= null ) or (LastName=:lastName and LastName!=null) or (Email=:email and Email != null) or (MobilePhone=: mobileno and MobilePhone!= null)';
        }
        System.debug(commonQuery);
        contactList = Database.query(commonQuery);
         return contactList;
    }
    
    // GET DEFAULT CONTACT IN TABLE
    @AuraEnabled
    public static List<Contact> getDefaultContact(){
        List <Contact> con = [ SELECT FirstName, LastName, Email, MobilePhone, MailingCity, MailingCountry, MailingStreet,MailingPostalCode,MailingState FROM Contact order by CreatedDate DESC];
        return con;
    }

    // CREATE CONTACT
    @AuraEnabled
    public static Wrapper createCont(Contact objData, String btn){
        btnName = btn;
        wrapper wrap = new Wrapper();
        if(btn == 'NewCase'){

            List<Contact> contList = [ SELECT FirstName , LastName, AccountId ,Email, MobilePhone, MailingCity, MailingCountry, MailingStreet, MailingState, MailingPostalCode FROM Contact WHERE (FirstName =:objData.FirstName) and (LastName =: objData.LastName)];

            List<Case> cs = new List<Case>();
            try{
                if(contList.size() > 0)
                {
                    for(Contact con: contList){
                        Case newCase = new Case();
                        newCase.AccountId = con.AccountId;
                        newCase.ContactId = con.Id;
                        cs.add(newCase);
                    }

                    insert cs;
                    wrap.flag = true;
                }
                else{
                    
                    upsert objData;
                    wrap.flag = true;
                }
            }catch(DmlException err){
                for(integer i=0; i<err.getNumDml(); i++){
                    wrap.errorMessage =+ err.getDmlMessage(i) +'\n';  
                  }
                 
                  throw new AuraHandledException(wrap.errorMessage);   
            }
            wrap.contList = getDefaultContact();            
        }
        else if(btn == 'Create') {
            List<Contact> contList = [ SELECT FirstName , LastName, Email, MobilePhone, MailingCity, MailingCountry, MailingStreet, MailingState, MailingPostalCode FROM Contact WHERE (FirstName =:objData.FirstName) and (LastName =: objData.LastName) and (MobilePhone =:objData.MobilePhone) and (Email =: objData.Email) and(MailingCity=:objData.MailingCity) and (MailingCountry=:objData.MailingCountry)and (MailingPostalCode=:objData.MailingPostalCode) and (MailingState=:objData.MailingState) and(MailingStreet =:objData.MailingStreet)];
            
            try{
                if(contList.size() > 0){
                    wrap.flag = false;

                }else{
                    upsert objData;
                    wrap.flag = true;
                }
            }
            catch(DmlException err){
                for(integer i=0; i<err.getNumDml(); i++){
                    wrap.errorMessage =+ err.getDmlMessage(i) +'\n';  
                  }
                 
                  throw new AuraHandledException(wrap.errorMessage);   
            }
            wrap.contList = getDefaultContact(); 
        }
        return wrap;
    }

    // DELETE CONTACT
    @AuraEnabled
    public static Wrapper delContact(List<Contact> objData){
        Wrapper wrap = new Wrapper();
        try{
            delete objData;
        }
        catch(DmlException e){
            for(integer i=0; i<e.getNumDml(); i++){
                wrap.errorMessage =+ e.getDmlMessage(i) +'\n';  
              }
              throw new AuraHandledException(wrap.errorMessage);
        }
        
       wrap.contList = getDefaultContact();
       return wrap;
    }

    public static void insertCont(List<Contact> cnt){
        List <Contact> dupList = new List <Contact>();
        List <Case> cs = new List<Case>();
        
        for(Contact cn:cnt){
            if(btnName == 'NewCase'){
                Case cse = new Case();
                cse.Subject =  cn.FirstName + ' '+ cn.LastName + ' ' + 'Case';
                cse.AccountId = cn.AccountId;
                cse.ContactId = cn.Id;
                cs.add(cse);
                System.debug('Case Created');
            }
            else if(btnName == 'Create'){
                // DUPLICATE RECORD
                Contact duplicate = new Contact();
                duplicate.FirstName = cn.FirstName;
                duplicate.LastName = cn.LastName + ' Test';
                duplicate.Email = cn.Email;
                duplicate.MobilePhone = cn.MobilePhone;
                duplicate.MailingCity =cn.MailingCity;
                duplicate.MailingCountry = cn.MailingCountry;
                duplicate.MailingState = cn.MailingState;
                duplicate.MailingStreet =cn.MailingStreet;
                duplicate.MailingPostalCode = cn.MailingPostalCode;
                duplicate.OtherStreet = cn.OtherStreet;
                duplicate.OtherState = cn.OtherStreet;
                duplicate.OtherCountry = cn.OtherCountry;
                duplicate.OtherPostalCode =cn.OtherPostalCode;
                dupList.add(duplicate);   
            }
               
            }

        if(btnName == 'NewCase'){
            System.debug(TriggerCount.getDupTimes());
            if(TriggerCount.getDupTimes()<2){
                TriggerCount.setDupTimes();
                insert cs;
            }
        }else{
            if(TriggerCount.getDupTimes()<2){
                TriggerCount.setDupTimes();
                insert dupList;
            }
        }
    } 
    
    public static void bI(List<Contact> con){
        List<Account> ac = new List<Account>();
        for(Contact cn: con){
            if(btnName == 'New Case'){
                Account acnt = new Account();
                acnt.Name = cn.FirstName + ' '+ cn.LastName + ' ' + 'Account';
                ac.add(acnt);
            }
        }

        if(TriggerCount.getDupTimes() < 1){
            TriggerCount.setDupTimes();
            insert ac;
        }
    }

}