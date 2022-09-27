import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { subscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import MOVIEMC from '@salesforce/messageChannel/MovieMessageChannel__c';

import NAME_FIELD from "@salesforce/schema/Movie__c.Name";
import CATEGORY_FIELD from "@salesforce/schema/Movie__c.Category__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Movie__c.Description__c";
import RELEASE_DATE_FIELD from "@salesforce/schema/Movie__c.Release_date__c";
import MOVIE_OBJECT from "@salesforce/schema/Movie__c";

const MOVIE_FIELDS = [
    NAME_FIELD,
    CATEGORY_FIELD,
    DESCRIPTION_FIELD,
    RELEASE_DATE_FIELD
  ];

export default class MovieDetailsTab extends LightningElement {

    movieId;
    formFields = [
        NAME_FIELD,
        CATEGORY_FIELD,
        DESCRIPTION_FIELD,
        RELEASE_DATE_FIELD
      ];
      nameField = NAME_FIELD;
      categoryField = CATEGORY_FIELD;
      descriptionField = DESCRIPTION_FIELD;
      releaseDate = RELEASE_DATE_FIELD;
    
      objectApiName = MOVIE_OBJECT;

    @wire(getRecord, {recordId: '$movieId', fields: MOVIE_FIELDS})
    wiredRecord;

    @wire(MessageContext)
    messageContext;

    // Decide when to show or hide the icon
    // returns 'utility:anchor' or null
    get detailsTabIconName() {
        return this.wiredRecord.data ? 'utility:video' : null;
    }

    // Utilize getFieldValue to extract the movie name from the record wire
    get movieName() {
        return getFieldValue(this.wiredRecord.data, NAME_FIELD);
    }

    // Private
    subscription = null;

    // Subscribe to the message channel
    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(
            this.messageContext,
            MOVIEMC,
            (message) => { this.movieId = message.recordId },
            { scope: APPLICATION_SCOPE }
        );
        console.log(this.subscription);
    }

    // Calls subscribeMC()
    connectedCallback() { 
        this.subscribeMC();
    }

    // Navigates to record page
    navigateToRecordViewPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.movieId,
                objectApiName: "Movie__c",
                actionName: "view"
            },
        });
    }

    // Navigates back to the review list, and refreshes reviews component
    handleReviewCreated() { 
        this.template.querySelector('lightning-tabset').activeTabValue = 'reviews';
        this.template.querySelector('c-movie-reviews').refresh();
    }
}