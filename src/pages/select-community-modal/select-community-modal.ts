import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { ICarport } from 'model/carport';
import { CarportPage } from '../carport/carport';
import { ProfilePage } from '../profile/profile';
import { CommunitySelectComponent } from '../../components/community-select/community-select'

import { RestServiceProvider } from '../../providers/rest-service/rest-service';

//import { BasePage } from '../base/base';
import { BasePage } from '../base/base';
import { AppSettings } from '../../settings/app-settings';




/**
 * Generated class for the SelectCommunityModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-community-modal',
  templateUrl: 'select-community-modal.html',
})
export class SelectCommunityModalPage extends BasePage {
  coms: any;
  searchQuery: string = '';
  selectedComunityID: string;
  hideList: boolean;
  user: any;
  parkingNumber: string;
  currentCarportId: string;
  pathdescription: string;
  carportArray: ICarport[];
  newCarport: string;
  currentCarport: ICarport;

  addMode: boolean;
  showCarportList: boolean;
  @ViewChild(CommunitySelectComponent) csCom: CommunitySelectComponent;
  comReadOnly: boolean;
  source: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public service: RestServiceProvider) {
    super(navCtrl, navParams);
    //super();
    this.comReadOnly =  this.navParams.get("comReadOnly");
    this.source = this.navParams.get("source");
    console.log('param comReadOnly : ' + this.navParams.get("comReadOnly") );
  }

  ionViewDidLoad() {

    this.initComponents();
    this.getCarportList();
  }

  // ionViewWillEnter()
  // {
  //   console.log('ionViewWillEnter' + this.navParams.get("refresh"));
  // }

  initComponents() {
    this.user = AppSettings.getCurrentUser();

    if (this.user.community_ID && this.user.community_ID._id) {
      this.searchQuery = this.user.community_ID.name;
    }

    this.currentCarport = AppSettings.getCurrentCarport();
    if (this.currentCarport && this.currentCarport._id) {
      this.currentCarportId = this.currentCarport._id;
    }
  }


  save() {
    if (this.user._id) {
      if (!this.selectedComunityID) {
        if (this.user.community_ID) {
          this.selectedComunityID = this.user.community_ID._id;
        } else if (this.csCom.selectedComunityID) {
          this.selectedComunityID = this.csCom.selectedComunityID;
        }
      }
      const udpateContent = {
        community_ID: this.selectedComunityID
      }
      this.service.updateUser(this.user._id, udpateContent).then((usr: any) => {
        if (usr && this.currentCarportId) {

          const updateToFalseForALLCarportsforOwner = {
            isCurrent: false
            // ,owner_user_ID: this.user._id,
            // community_ID: this.selectedComunityID
          }
          //Amin: Imp! param sequence is very important
          this.service.updateManyCarports(this.selectedComunityID, this.user._id, updateToFalseForALLCarportsforOwner).then(
            x => {
              //add a carport
              const carport = {
                isCurrent: true
              }
              this.service.updateCarport(this.currentCarportId, carport).then((cp: any) => {
                if (cp) {

                  localStorage.setItem('user', JSON.stringify(usr));
                  localStorage.setItem('carport', JSON.stringify(cp));
                  //this.navCtrl.pop();

                  if(this.source === 'profile'){
                    this.navCtrl.setRoot(ProfilePage);
                  }
                }
              });
            }
          );

        }
      })
    }

  }

  getCarportList() {
    this.service.getCarportListByOwnerId(this.user._id).then((carp: any) => {

      if (carp) {
        this.carportArray = carp;
        if (carp.length > 0) {
          this.showCarportList = true;
        }
      }
    });
  }

  btnAdd() {
    //this.addMode = true;
    this.presentCarportModal();
  }

  btnCancelAdd() {
    this.addMode = false;
  }

  presentCarportModal() {
    let cpModal = this.modalCtrl.create(CarportPage);
    cpModal.onDidDismiss(data => {
      //console.dir(  data);
      //this.refresh();
      //refresh carport list
      this.getCarportList();
    });
    cpModal.present();
  }






  dismiss(data) { 
    this.viewCtrl.dismiss(data);
  }

  refresh() { 
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }


}
