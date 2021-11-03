public with sharing class SignupForm {

    static Contact con;

     public class Wrapper{

        @AuraEnabled
        public List<Case> caseList;

         @AuraEnabled
         public List<Contact> contList;

         @AuraEnabled
         public Boolean flag;

         @AuraEnabled
         public String errorMessage;
 
     }

     @AuraEnabled
     public static List<Contact> getDefaultContact(){
         List <Contact> con = [SELECT FirstName, LastName, Email, MobilePhone, MailingCity, MailingCountry, MailingStreet,MailingPostalCode,MailingState FROM Contact order by CreatedDate DESC];
         return con;
     }

    @AuraEnabled
    public static Wrapper createCont(Contact objData){
        system.debug(objData);
        wrapper wrap = new Wrapper();
        List<Contact> contList = [ SELECT FirstName , LastName, Email, MobilePhone, MailingCity, MailingCountry, MailingStreet, MailingState, MailingPostalCode FROM Contact WHERE (FirstName =:objData.FirstName) and (LastName =: objData.LastName) and (MobilePhone =:objData.MobilePhone) and (Email =: objData.Email) and(MailingCity=:objData.MailingCity) and (MailingCountry=:objData.MailingCountry)and (MailingPostalCode=:objData.MailingPostalCode) and (MailingState=:objData.MailingState) and(MailingStreet =:objData.MailingStreet)];

        try{
            if(contList.size() > 0){
                wrap.flag = false;
            }
            else{
                upsert objData;
                sendMsg(objData);
                wrap.flag = true;
            }
        }catch(DmlException err){
            for(integer i=0; i<err.getNumDml(); i++){
                wrap.errorMessage =+ err.getDmlMessage(i) +'\n';  
            }
             
              throw new AuraHandledException(wrap.errorMessage);   
        }
        wrap.contList = getDefaultContact();
        return wrap;
    }
    @AuraEnabled
    public static Wrapper getcontact(Contact objData){
        System.debug(objData);
        wrapper wrap = new wrapper();
        List<Contact> contList = [SELECT FirstName, LastName, Username__c, Password__c, MailingCity, MailingCountry, MailingPostalCode, MailingState, MailingStreet FROM Contact WHERE (Username__c=:objData.Username__c)];
        System.debug('outside');
        try{
            if(contList.size() == 0){
                wrap.errorMessage = 'UserName does not Exist';
                wrap.flag = false;
                System.debug('no user');
            }
            else if(contList.size() > 0){
                System.debug('yes user');
                
                for(Contact con:contList){
                    if(con.Password__c == objData.Password__c){
                        wrap.errorMessage = 'You Are Login Successfully!';
                        wrap.flag = true;
                        
                        wrapper w = fetchCase(con.Id);
                        wrap.caseList = w.caseList;
                        System.debug(w.caseList);
                    }
                    else{
                        wrap.errorMessage = 'Incorrect Username or Password';
                        wrap.flag = false;
                    }
                    System.debug(objData.Password__c);
                }
            }
            else{
                wrap.flag = true;
            }
        }catch(DmlException err){
            for(integer i=0; i<err.getNumDml(); i++){
                wrap.errorMessage =+ err.getDmlMessage(i) +'\n';  
            }
             
              throw new AuraHandledException(wrap.errorMessage);   
        }
        wrap.contList = getDefaultContact();
        return wrap;
    }

    @AuraEnabled
    public static List<Account> fetchAccountNameValue(){
        List<Account> acc = [SELECT ID, Name FROM Account Order by LastModifiedDate DESC];
        return acc;
    }


    // Fetch Case
    @AuraEnabled
    public static wrapper fetchCase(Id cnId){
        List<Case> cs = [SELECT Account.Name,Contact.Name ,ContactId, AccountId, CaseNumber, Status,Origin FROM Case WHERE ContactId=:cnId];
        System.debug(cs);
        wrapper wrap = new wrapper();
        try{
            if(cs.size()>0){
                wrap.caseList = cs;
                wrap.flag = true;
            }else{
                wrap.errorMessage = 'No Case Available';
                wrap.flag = false;
            }
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        return wrap;
    }

// DELETE Case
    @AuraEnabled
    public static Wrapper delCase(Case objData){
        Wrapper delwrap = new Wrapper();
        try{
            system.debug(objData);
            delete objData;
            
            wrapper wrap = fetchCase(objData.ContactId);
            delwrap.caseList = wrap.caseList;
            delwrap.flag = wrap.flag;
        }
        catch(DmlException e){
            for(Integer i=0; i<e.getNumDml(); i++){
                delwrap.errorMessage =+ e.getDmlMessage(i) +'\n';  
              }
              throw new AuraHandledException(delwrap.errorMessage);
        }
        return delwrap;
    }

    // MAILING CODE
    public static void sendMsg(Contact objData){
                Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
                message.toAddresses = new String[] {objData.Email};
                message.optOutPolicy = 'FILTER';
                message.subject = 'Subject Test Message';
                message.plainTextBody = 'Hey ' + objData.FirstName  + '  ' + objData.LastName + '  '+ 'Have Been Successfully signUp!!';
                Messaging.SingleEmailMessage[] messages =   new List<Messaging.SingleEmailMessage> {message};
                Messaging.SendEmailResult[] results = Messaging.sendEmail(messages);

                if (results[0].success) {
                    System.debug('The email was sent successfully.');
                } else {
                    System.debug('The email failed to send: ' + results[0].errors[0].message);
            }
    }
}