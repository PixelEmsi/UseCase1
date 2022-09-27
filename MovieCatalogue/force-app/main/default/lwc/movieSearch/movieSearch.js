import { LightningElement, track } from "lwc";
import { NavigationMixin } from 'lightning/navigation';

export default class MovieSearch extends NavigationMixin(LightningElement) {
    @track isLoading = false;
    // Handles loading event
    handleLoading() { 
        this.isLoading = true;
    }
    
    // Handles done loading event
    handleDoneLoading() {
        this.isLoading = false;
     }
    
    // Handles search Movie event
    // This custom event comes from the form
    searchMovies(event) { 
    const movieName =  event.detail.movieName;
    this.template.querySelector('c-movie-search-result').searchMovies(movieName);
    }
    
    createNewMovie() { 
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                "objectApiName": "Movie__c",
                "actionName": "new"
            }
        });
    }
}