trigger triggerOnContact on Contact (after insert, after update, after delete, after undelete) {
    if(Trigger.isAfter && (Trigger.isInsert || Trigger.isUpdate || Trigger.isDelete || Trigger.isUndelete)){
        triggerOnContactHandler.lookUpRollUp(Trigger.New, Trigger.old);
    }

}