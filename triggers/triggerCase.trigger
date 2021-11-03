trigger triggerCase on Case (before insert) {

    // METHOD - 1
    for(Case cs:Trigger.New){
        List<Case> cse = [SELECT AccountId, ContactId , Status, CaseNumber FROM Case WHERE ContactId =: cs.ContactId];
        for(Integer i=0; i<cse.size(); i++){
            if(cse[i].Status != 'Closed'){
                cs.addError('Case Cannot Be Created Becase This Contact Case Is Already Open ' + cse[i].CaseNumber);
            }
        }
    }

// METHOD - 2
    // List<AggregateResult> countcase = [SELECT Count(Id), ContactId FROM Case GROUP BY ContactId];
    // Map<Id, Integer> countMap = new Map<Id, Integer>();
    // for(AggregateResult ag: countcase){
    //     countMap.put((Id)ag.get('ContactId'), (Integer)ag.get('expr0'));
    // }

    // for(Case newCase: Trigger.new){
    //     Integer i = countMap.get(newCase.ContactId);
    //     System.debug(i);
    //     if(i>1){
    //         newCase.addError('Case Cannot Be Created Because this contact already Has a Case');

    //     }
    // }
}