import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { RestServiceProvider } from '../../providers/rest-service/rest-service';
import { IStatisticCarport } from '../../model/visual-statistic-carport';

import { HomePage } from '../../pages/home/home';

declare var BMap;
declare var BMapLib;
/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  map: any;
  myGeo: any;
  index = 0;
  myIcon: any;

  avaiableComs: IStatisticCarport[];
  adds :string [] = [];
  //myGeo = new BMap.Geocoder();
  // adds = [
  //   "松江区沪亭北路1080弄",
  //   "松江区涞坊路333号",
  //   "松江区涞坊路599号"
  // ];
 
  @ViewChild('map') map_container: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public APIService: RestServiceProvider,private geolocation: Geolocation) {

    this.myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30));

  }

  ionViewDidLoad() {
    //Amin: !Important:map_container shoud be called here, it can't be inited in constructor, if called in constructor
    // this error display: nativeElement can be find of undefined
    // let map =
    // this.map =
    // new BMap.Map(
    //   this.map_container.nativeElement,
    //   {
    //     enableMapClick: true,//点击拖拽
    //     enableScrollWheelZoom: true,//启动滚轮放大缩小，默认禁用
    //     enableContinuousZoom: true //连续缩放效果，默认禁用
    //   }
    // );

    this.map = new BMap.Map("map_container");
    this.map.centerAndZoom('上海', 13);
    this.map.enableScrollWheelZoom(true);
    this.myGeo = new BMap.Geocoder();
    var geolocationControl = new BMap.GeolocationControl(); 
    this.map.addControl(geolocationControl);
    this.getStatisticOfCarport();

    //this.bdGEO();
    this.getLocation();
    //this.addMark();
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
  geocodeSearch(add, comName , sharedCarportNumber) { 
    this.myGeo.getPoint(add, x => {this.callBackEvent(x, add, comName, sharedCarportNumber);} , "上海市");
  }
  // 编写自定义函数,创建标注
  addMarker(point, label) { 
    var marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    marker.setLabel(label);
  }

  callBackEvent(point ,add, comName , sharedCarportNumber){ 
      if (point) { 
        //this.addMarker(point, new BMap.Label( add , { offset: new BMap.Size(20, -10) }));
        this.addInfoWindow(point, add,comName, sharedCarportNumber);
      }
  }


  addInfoWindow(point, address, community_name , sharedCarportNumber){
    const content = '<div >'   + address + '</div>' +
                    '<div > 空闲车位数量：'   + sharedCarportNumber + '</div>' +
                    '<div> <a href="checkDetail()">查看详情</a> </div>';

                  //创建检索信息窗口对象
    let searchInfoWindow = null;
    searchInfoWindow = new BMapLib.SearchInfoWindow(this.map, content, {
        title  : community_name,      //标题
        width  : 290,             //宽度
        height : 105,              //高度
        panel  : "panel",         //检索结果面板
        enableAutoPan : true,     //自动平移
        searchTypes   :[
          // BMAPLIB_TAB_SEARCH,   //周边检索
          // BMAPLIB_TAB_TO_HERE,  //到这里去
          // BMAPLIB_TAB_FROM_HERE //从这里出发
        ]
      });
      let marker = new BMap.Marker(point); //创建marker对象
      //marker.enableDragging(); //marker可拖拽
      marker.addEventListener("click", function(e){
        searchInfoWindow.open(marker);
      })
      this.map.addOverlay(marker); //在地图中添加marker
  }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
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
    })
  }

  getStatisticOfCarport() {
    //let addtmp;
    this.APIService.getStatisticOfCarport().then((x: any) => {
      this.avaiableComs = x;  
      x.forEach(  c => {
        if(c.community_info && c.community_info.length > 0){
          //addtmp = c.community_info[0].address;
        this.adds.push(c.community_info[0].address);
        this.geocodeSearch(c.community_info[0].address, c.community_info[0].name, c.count);
        }
      });
      //console.dir(this.adds);
    });
  }

  addLocaltion()
  {
    var geolocationControl = new BMap.GeolocationControl();
    
    this.map.addControl(geolocationControl);
  }

  checkDetail()
  {
    this.navCtrl.push(HomePage);
  }

}
