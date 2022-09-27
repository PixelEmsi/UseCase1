trigger MovieTrigger on Movie__c (before insert) {
    for(Movie__c m : Trigger.New) {
        m.Name = m.Name.toLowerCase();
    }
}