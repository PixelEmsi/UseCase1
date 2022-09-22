import { LightningElement, api} from 'lwc';


const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';

export default class MovieTile extends LightningElement {
    
    @api
    movie;
    @api
    selectedMovieId;

    // Getter for dynamically setting the tile class based on whether the
    // current movie is selected
    get tileClass() {
        if(this.selectedMovieId === this.movie.Id){
          return TILE_WRAPPER_SELECTED_CLASS;
        }else {
          return TILE_WRAPPER_UNSELECTED_CLASS;
        }
    }

    // Getter for dynamically setting the background image for the picture
    get backgroundStyle() { 
        return `background-image: url(${this.movie.Picture__c})`;
      }


    selectMovie() { 
        this.selectedMovieId = this.movie.Id;
  
        const movieselect = new CustomEvent('movieselect', {
          detail: {
            movieId: this.selectedMovieId
          }
        });
        this.dispatchEvent(movieSelect);
      }
}