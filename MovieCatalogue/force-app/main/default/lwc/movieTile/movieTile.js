import { LightningElement, api} from 'lwc';


const TILE_WRAPPER_SELECTED_CLASS = 'tile-wrapper selected';
const TILE_WRAPPER_UNSELECTED_CLASS = 'tile-wrapper';

export default class MovieTile extends LightningElement {
    
    @api
    movie;
    @api
    selectedMovieId;

    connectedCallback() { 
      console.log('tile is here',this.movie.Name);
      console.log('picture url ',this.movie.Picture__c);
    }

    // Getter for dynamically setting the tile class based on whether the
    // current movie is selected
    get tileClass() {
        if(this.selectedMovieId === this.movie.Id){
          return TILE_WRAPPER_SELECTED_CLASS;
        }else {
          return TILE_WRAPPER_UNSELECTED_CLASS;
        }
    }
    
    get backgroundStyle() { 
    //  return this.movie.Picture__c ? `background-image: url(${this.movie.Picture__c})`: `background: url('/resource/movieLogo2')`;
      return  `background: url(${this.movie.Picture__c})`;
    }
    
    selectMovie() { 
      console.log('select movie');
        this.selectedMovieId = this.movie.Id;
  
        const movieselect = new CustomEvent('movieselect', {
          detail: {
            movieId: this.selectedMovieId
          }
        });
        this.dispatchEvent(movieselect);
      }
}