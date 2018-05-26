import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LookupLeisureParkPage } from '../../pages/lookup-leisure-park/lookup-leisure-park';
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
 
  @Input() searchQuery: string = '';
  @Input() source: string = '';
  hideList: boolean;
  coms: any;
  selectedComunityID: string;
  pmc:string;

  scrollClass: string;


  constructor(public navCtrl: NavController,public autoService: AutoCompleteServiceProvider) {
    this.scrollClass = "scroll-min";
  }

  searchTextChange(ev: any) {
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
    this.pmc = item.PMC;

    //if this component is called by Test Page(it's a map page)
    if (this.source === 'map') {
      this.navCtrl.push(LookupLeisureParkPage, {
        comId: this.selectedComunityID,
        comName: this.searchQuery
      });
    }
  }


}
