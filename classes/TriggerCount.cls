public with sharing class TriggerCount {
   
    static Integer runTimes = 0;

    public static Integer getDupTimes(){
        return runTimes;
    }           
        
        public static void setDupTimes(){
            runTimes++;
        }    
    
}