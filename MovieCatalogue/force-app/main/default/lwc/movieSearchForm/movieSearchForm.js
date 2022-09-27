import { LightningElement } from 'lwc';

export default class MovieSearchForm extends LightningElement {
    movieName ='';
    
    // needs improvement search dynamicaly using onchange
    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.movieName = evt.target.value;
            const searchEvent = new CustomEvent('search',{
                detail : {
                    movieName: this.movieName
                }
            });
        this.dispatchEvent(searchEvent);
        }
    }
}