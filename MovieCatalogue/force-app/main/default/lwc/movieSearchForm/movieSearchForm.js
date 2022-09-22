import { LightningElement } from 'lwc';

export default class MovieSearchForm extends LightningElement {
    selectedMovieId ='';
    
    // needs improvement search dynamicaly
    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            const searchEvent = new CustomEvent('search',{
                detail : {
                    movieId: this.selectedMovieId
                }
            });
        this.dispatchEvent(searchEvent);
        }
    }

}