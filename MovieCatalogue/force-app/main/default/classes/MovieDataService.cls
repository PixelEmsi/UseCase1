public class MovieDataService {
@AuraEnabled(cacheable=true)
    public static List<Movie__c> getMovies(String movieId) {
        
        String query = 'SELECT '
                     + 'Name, Description__c, Release_date__c, IsReleased__c'
                     + 'FROM Movie__c';
        if (String.isNotBlank(movieId)) {
            query += ' WHERE Id = :movieId';
        }
        query += ' WITH SECURITY_ENFORCED ';
        return Database.query(query);
    }
}