import { LightningElement, api, wire, track } from 'lwc';
import getMovies from '@salesforce/apex/MovieDataService.getMovies';
import {
    MessageContext,
    publish
} from 'lightning/messageService';
import MOVIEMC from '@salesforce/messageChannel/MovieMessageChannel__c';

export default class MovieSearchResult extends LightningElement {


    selectedMovieId;
    @api movieId;
    @track movies;
    @track isLoading = false;


    // wired message context
    @wire(MessageContext)
    messageContext;

    
    @wire(getMovies, { movieId: '$movieId' })
    wiredMovies(result) {
        if (result.data) {
            this.movies = result.data;
        }
    }
    

    // public function that updates the existing movieId property
    // uses notifyLoading
    @api
    searchMovies(movieId) {
        this.movieId = movieId;
        this.isLoading = true;
        this.notifyLoading(this.isLoading);
    }


    // this function must update selectedMovieId and call sendMessageService
    updateSelectedTile(event) {
        this.selectedMovieId = event.detail.movieId;
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