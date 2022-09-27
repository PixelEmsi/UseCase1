import { LightningElement, api, wire, track } from 'lwc';
import getMovies from '@salesforce/apex/MovieDataService.getMovies';
import {
    MessageContext,
    publish
} from 'lightning/messageService';
import MOVIEMC from '@salesforce/messageChannel/MovieMessageChannel__c';

export default class MovieSearchResult extends LightningElement {

    selectedMovieId;
    @api movieName;
    @track movies;
    @track isLoading = false;


    // wired message context
    @wire(MessageContext)
    messageContext;

    
    @wire(getMovies, { movieName: '$movieName' })
    wiredMovies(result) {
        const { data, error } = result;
        if (data) {
            console.log("data", data);
            this.movies = data;
        } else if (error) {
            console.log("error", error);
        }
        this.isLoading = false;
        this.notifyLoading(this.isLoading);
    }
    

    // public function that updates the existing movieId property
    // uses notifyLoading
    @api
    searchMovies(movieName) {
        this.movieName = movieName.toLowerCase();
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
        console.log(movieName);
    }


    // this function must update selectedMovieId and call sendMessageService
    updateSelectedTile(event) {   
        this.selectedMovieId = event.detail.movieId;
        console.log('movie selected',this.selectedMovieId);
        this.sendMessageService(this.selectedMovieId);
    }

    // Publishes the selected movieId on the MOVIEMC.
    sendMessageService(movieId) {
        const payload = { recordId: movieId };
        publish(this.messageContext, MOVIEMC, payload);
    }

    notifyLoading(isLoading) {
        if (isLoading) {
            this.dispatchEvent(new CustomEvent('loading'));
        } else {
            this.dispatchEvent(new CustomEvent('doneloading'));
        }
    }

}