import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, MenuController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


import { IStatisticCarport } from '../../model/visual-statistic-carport';
import { IUser } from '../../model/user';
import { ICommunity } from '../../model/community';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { LookupLeisureParkPage } from '../lookup-leisure-park/lookup-leisure-park';
import { BasePage } from '../base/base';
import { AlertInputOptions } from 'ionic-angular/umd/components/alert/alert-options';




declare var BMap;
declare var BMapLib;

//declare var BMAPLIB_TAB_TO_HERE;
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage extends BasePage {

  map: any;
  myGeo: any;
  index = 0;
  myIcon: any;
  makerIcon: any;

  avaiableComs: IStatisticCarport[];
  adds: string[] = [];

  user: IUser;
  selectedComId: string;
  //selectedComName: string;
  searchQuery: string = '';
  coms: any;
  hideList: boolean;
  source: string;
  localCityName: string;
  //pageRefreshed: boolean;
  radioOpen = false;
  radioResult: any;

  @ViewChild('map') map_container: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public APIService: RestServiceProvider,
    private geolocation: Geolocation) {
    super(navCtrl, navParams);
    this.myIcon = new BMap.Icon("assets/icon/position.png", new BMap.Size(32, 32));
    this.makerIcon = new BMap.Icon("assets/icon/park.png", new BMap.Size(32, 32));
    this.source = "map";

  }



  ionViewDidLoad() {
    //Amin: !Important:map_container shoud be called here, it can't be inited in constructor, if called in constructor

    super.menuActive(this.menuCtrl);
    this.map = new BMap.Map("map_container");
    this.myGeo = new BMap.Geocoder();

    var myCity = new BMap.LocalCity();
    myCity.get(function (result) {
      var cityName = result.name;
      //cityName = '北京市';
      localStorage.setItem('currentCity', cityName);
      return cityName;
    });

    var geolocationControl = new BMap.GeolocationControl();
    this.map.addControl(geolocationControl);

    setTimeout(() => {
      this.localCityName = localStorage.getItem('currentCity');
      if (this.localCityName && this.localCityName !== '上海市') {
        this.presentCustomAlert(this.alertCtrl, '当前城市尚未开通', '很抱歉的通知您，目前仅开通上海市,天津市，贵城市尚未开通，给您带来不便，我们深表歉意！');
      } else {
        this.getStatisticOfCarport();
        this.getLocation();
      }
    }, 1000);

    this.map.centerAndZoom(this.localCityName, 13);
    this.map.enableScrollWheelZoom(true);

  }


  // ionViewWillEnter() {
  //   setTimeout(() => { 
  //     if (this.localCityName && this.localCityName !== '上海市') {
  //       this.presentCustomAlert(this.alertCtrl, '当前城市尚未开通', '很抱歉的通知您，目前仅开通上海市，贵城市尚未开通，给您带来不便，我们深表歉意！');
  //     }  
  //   }, 1000);
  // }


  geocodeSearch(community: ICommunity, sharedCarportNumber) {
    this.myGeo.getPoint(community.address, x => { this.callBackEvent(x, community, sharedCarportNumber); }, "上海市");
  }
  // 编写自定义函数,创建标注
  addMarker(point, label) {
    var marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    marker.setLabel(label);
  }

  callBackEvent(point, community: ICommunity, sharedCarportNumber) {
    if (point) {
      //this.addMarker(point, new BMap.Label( add , { offset: new BMap.Size(20, -10) }));
      this.addInfoWindow(point, community, sharedCarportNumber);
    }
  }


  addInfoWindow(point, community, sharedCarportNumber) {
    const content = '<div >' + community.address + '</div>' +
      //'<div  click ="this.checkDetail(community._id,community.name)" >  <a>查看详情</a> </div>' +

      '<div > 空闲车位数量：' + sharedCarportNumber + '</div> </br>' +
      '<div class="text-secondary">在上方搜索区域输入该小区名称,可查看或申请停车 </div>';



    //创建检索信息窗口对象
    let searchInfoWindow = null;
    searchInfoWindow = new BMapLib.SearchInfoWindow(this.map, content, {
      title: community.name,      //标题
      width: 250,             //宽度
      height: 105,              //高度
      panel: "panel",         //检索结果面板
      enableAutoPan: true,     //自动平移
      searchTypes: [
        // BMAPLIB_TAB_SEARCH,   //周边检索
        // BMAPLIB_TAB_TO_HERE,  //到这里去
        // BMAPLIB_TAB_FROM_HERE //从这里出发
      ]
    });

    let marker = new BMap.Marker(point, { icon: this.makerIcon }); //创建marker对象
    //marker.enableDragging(); //marker可拖拽
    marker.addEventListener("click", function (e) {
      searchInfoWindow.open(marker);
    })
    this.map.addOverlay(marker); //在地图中添加marker
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      if (resp && resp.coords) {
        let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
        let convertor = new BMap.Convertor();
        let pointArr = [];
        pointArr.push(locationPoint);
        convertor.translate(pointArr, 1, 5, (data) => {
          if (data.status === 0) {
            let marker = new BMap.Marker(data.points[0], { icon: this.myIcon });
            this.map.panTo(data.points[0]);
            marker.setPosition(data.points[0]);
            this.map.addOverlay(marker);
          }
        })
        this.map.centerAndZoom(locationPoint, 13);
        console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
      }
    }).catch(e => {
      console.log('Error happened when get current position.');
    });
  }

  getStatisticOfCarport() {
    //let addtmp;
    this.APIService.getStatisticOfCarport().then((x: any) => {
      if (x && x.length > 0) {
        this.avaiableComs = x;
        //console.dir(x);
        x.forEach(c => {
          if (c.community_info && c.community_info.length > 0) {
            //addtmp = c.community_info[0].address;
            this.APIService.getActivePMCUser(c.community_info[0]._id).then((ap: any) => {
              //console.dir(ap);
              if (ap && ap._id) {
                this.adds.push(c.community_info[0].address);
                this.geocodeSearch(c.community_info[0], c.count);
              }
            });
          }
        });
      } else {
        super.presentCustomAlert(this.alertCtrl, '无共享车位', '当前无共享车位，请耐心等待');
      }
    });
  }


  checkDetail(commmunityId, community_name) {
    //console.log('haha this');
    this.navCtrl.push(LookupLeisureParkPage, {
      comId: commmunityId,
      comName: community_name
    });
  }




  searchClicked() {
    // push another page onto the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(LookupLeisureParkPage, {
      comId: this.selectedComId,
      comName: this.searchQuery
    });
  }

  selectOpenedCity() {
    let alert = this.alertCtrl.create();
    alert.setTitle('已开通城市列表');

    const iptSH: AlertInputOptions = {
      type: 'radio',
      label: '上海市',
      value: '上海市'
      //checked: true 
    }
    iptSH.checked = (iptSH.value === this.localCityName);
    alert.addInput(iptSH);

    const iptTJ: AlertInputOptions = {
      type: 'radio',
      label: '天津市',
      value: '天津市'
    }
    iptTJ.checked = (iptTJ.value === this.localCityName);
    alert.addInput(iptTJ);
 
    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: (data: any) => {
        //console.log('Radio data:', data);
        this.radioOpen = false;
        this.radioResult = data;
        this.localCityName = data;
        this.map.centerAndZoom(this.localCityName, 13);
      }
    });

    alert.present();
  }
}
