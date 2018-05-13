import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AutoCompleteServiceProvider } from '../../providers/autocomplete-service/autocomplete-service';
/**
 * Generated class for the CommunitySelectComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'community-select',
  templateUrl: 'community-select.html'
})
export class CommunitySelectComponent {
 
  searchQuery: string = '';
  hideList: boolean;
  coms: any;
  selectedComunityID: string;

  scrollClass: string;


  constructor(public autoService: AutoCompleteServiceProvider) {
    this.scrollClass = "scroll-min";
  }

  searchTextChagne(ev: any) {
    if (ev.target.value.length > 1) {
      //scroll-y is ionic class ,important: take care the sequence, scroll-max must be on the first place.
      this.scrollClass = "scroll-max scroll-y";
      this.hideList = false;
      this.autoService.getResults(ev.target.value).then(x => {
        this.coms = x;
        this.coms.forEach(element => {
          JSON.stringify(element);
        });
      });
    } else {
      this.scrollClass = "scroll-min";
    }
  }

  addItem(item: any) {
    this.scrollClass = "scroll-min";
    this.hideList = true; 
    this.searchQuery = item.name;
    this.selectedComunityID = item._id;
  }


}
