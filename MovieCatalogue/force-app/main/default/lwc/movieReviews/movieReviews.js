import { LightningElement, api } from "lwc";
import getAllReviews from '@salesforce/apex/MovieDataService.getAllReviews';
import { NavigationMixin } from 'lightning/navigation';

export default class MovieReviews extends NavigationMixin(LightningElement) {

    // Private
    movieId;
    error;
    movieReviews;
    isLoading;
    
    // Getter and Setter to allow for logic to run on recordId change
    @api get recordId() {
        return this.movieId;
     }

    set recordId(value) {
      this.setAttribute('movieId', value);
      this.movieId = value;
      this.getReviews();
    }
    
    // Getter to determine if there are reviews to display
    get reviewsToShow() {
        return this.movieReviews !== undefined && this.movieReviews !== null && this.movieReviews.length > 0;
     }
    
    // Public method to force a refresh of the reviews invoking getReviews
    @api refresh() { 
        this.getReviews();
    }
    
    // Imperative Apex call to get reviews for given movie
    // returns immediately if movieId is empty or null
    // sets isLoading to true during the process and false when it’s completed
    // Gets all the movieReviews from the result, checking for errors.
    getReviews() { 
        if(!this.movieId) {
            return;
        }
        this.isLoading = true;
        getAllReviews({movieId: this.movieId}).then(movieReviews =>{
            this.movieReviews= movieReviews;
        }).catch(error => {
            this.error = error;
        }).finally(()=>{
            this.isLoading = false;
        })
    }
    
    // Helper method to use NavigationMixin to navigate to a given record on click
    navigateToRecord(event) {  
        event.preventDefault();
        event.stopPropagation();
        const recordId = event.target.dataset.recordId;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: "User",
                actionName: "view"
            },
        });

    }
}