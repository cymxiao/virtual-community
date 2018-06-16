import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


import { IStatisticCarport } from '../../model/visual-statistic-carport';
import { IUser } from '../../model/user';
import { ICommunity } from '../../model/community';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { LookupLeisureParkPage } from '../lookup-leisure-park/lookup-leisure-park';
import { BasePage } from '../base/base';



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

  avaiableComs: IStatisticCarport[];
  adds: string[] = [];

  user: IUser;
  selectedComId: string;
  //selectedComName: string;
  searchQuery: string = '';
  coms: any;
  hideList: boolean;
  source: string;

  @ViewChild('map') map_container: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController,
    public APIService: RestServiceProvider, private geolocation: Geolocation) {
      super(navCtrl,navParams);
    this.myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(60, 60));
    this.source = "map";
  }

  ionViewDidLoad() {
    //Amin: !Important:map_container shoud be called here, it can't be inited in constructor, if called in constructor
 
    super.menuActive(this.menuCtrl);
    this.map = new BMap.Map("map_container");
    this.map.centerAndZoom('上海', 13);
    this.map.enableScrollWheelZoom(true);
    this.myGeo = new BMap.Geocoder();
    var geolocationControl = new BMap.GeolocationControl();
    this.map.addControl(geolocationControl);
    this.getStatisticOfCarport();

    this.getLocation(); 
  }



  addMark() {
    //var map = new BMap.Map('container');
    // 创建地图实例
    var point = new BMap.Point(121.479447, 31.238806);
    // 创建点坐标
    this.map.centerAndZoom(point, 11);
    // 初始化地图， 设置中心点坐标和地图级别
    var marker = new BMap.Marker(point);
    this.map.addOverlay(marker);

  }

  // bdGEO() {
  //   console.dir(this.adds);
  //   if (this.adds) {
  //     this.adds.forEach(add => { this.geocodeSearch(add); });
  //   }
  //   //this.index++;
  // }
  geocodeSearch(community :ICommunity, sharedCarportNumber) {
    this.myGeo.getPoint(community.address, x => { this.callBackEvent(x, community, sharedCarportNumber); }, "上海市");
  }
  // 编写自定义函数,创建标注
  addMarker(point, label) {
    var marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    marker.setLabel(label);
  }

  callBackEvent(point, community:ICommunity, sharedCarportNumber) {
    if (point) {
      //this.addMarker(point, new BMap.Label( add , { offset: new BMap.Size(20, -10) }));
      this.addInfoWindow(point, community, sharedCarportNumber);
    }
  }


  addInfoWindow(point, community, sharedCarportNumber) {
    const content = '<div >' + community.address + '</div>' +
      //'<div  click ="this.checkDetail(community._id,community.name)" >  <a>查看详情</a> </div>' +

      '<div > 空闲车位数量：' + sharedCarportNumber + '</div> </br>' +
      '<div class="text-secondary">在上方搜索区域输入该小区名称,可查看或申请停车 </div>' ;
     
 

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
    
    let marker = new BMap.Marker(point); //创建marker对象
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
      console.log(e); 
    });;
  }

  getStatisticOfCarport() {
    //let addtmp;
    this.APIService.getStatisticOfCarport().then((x: any) => { 
      this.avaiableComs = x;
      x.forEach(c => {
        if (c.community_info && c.community_info.length > 0) {
          //addtmp = c.community_info[0].address;
          this.adds.push(c.community_info[0].address);
          this.geocodeSearch(c.community_info[0], c.count);
        }
      });
      //console.dir(this.adds);
    });
  }

  addLocaltion() {
    var geolocationControl = new BMap.GeolocationControl();

    this.map.addControl(geolocationControl);
  }

  checkDetail(commmunityId,community_name) {
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
}
