public class MovieDataService {
    
    @AuraEnabled(cacheable = true)
    public static List<Movie__c> getAllMovies() {

        return [
            SELECT Name, Category__c, Description__c, Release_date__c, Picture__c
            FROM Movie__c
            WITH SECURITY_ENFORCED
        ];
    }
    
    @AuraEnabled(cacheable = true)
    public static List<Movie__c> getMovies(String movieName) {
        movieName = movieName.trim();

        if(movieName == '' || movieName == null ) {
            return getAllMovies();
        }

        movieName = '%' + movieName + '%';
        return [
            SELECT Name, Category__c, Description__c, Release_date__c, Picture__c
            FROM Movie__c
            WHERE Name LIKE :movieName
            WITH SECURITY_ENFORCED
        ];
    }


    @AuraEnabled
    public static List<MovieReview__c> getAllReviews(Id movieId) {
        return [
            SELECT
                Id,
                Name,
                Comment__c,
                Rating__c,
                LastModifiedDate,
                CreatedDate,
                CreatedBy.Name,
                CreatedBy.SmallPhotoUrl,
                CreatedBy.CompanyName
            FROM
                MovieReview__c
            WHERE
                Movie__c =:movieId
            WITH SECURITY_ENFORCED
            ORDER BY
                CreatedDate DESC
        ];
    }
}