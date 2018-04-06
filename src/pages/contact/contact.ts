import { Component, ViewChild, ElementRef  } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { RestServiceProvider } from '../../providers/rest-service/rest-service';
//import { GeographicalMapServiceProvider } from '../../providers/geographical-map-service/geographical-map-service';
import { Geolocation } from '@ionic-native/geolocation';


declare var BMap;

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  @ViewChild('map') map_container: ElementRef;
  map: any;//地图对象
  marker: any;//标记
  
  myIcon: any;
  users: any;
  mymap: any;
  index = 0;
  myGeo = new BMap.Geocoder();
  adds = [
      "松江区沪亭北路1080弄",
      "松江区涞坊路333号", 
      "松江区涞坊路599号"
    ];
    
  //mapAddresss: any;
  constructor(public navCtrl: NavController
    , public restServiceProvider: RestServiceProvider
    , private geolocation: Geolocation
    //, private mapService: GeographicalMapServiceProvider
  ) {
    
    this.myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(30, 30));
    //this.mapAddresss  = new BMap.Map(this.map_container.nativeElement);
    // this.mapAddresss.centerAndZoom(new BMap.Point(117.269945,31.86713), 13);
    // this.mapAddresss.enableScrollWheelZoom(true);
    // this.getUsers();
    // this.getMap();
    
  }


  ionViewDidEnter() {
    let map =
      this.map =
      new BMap.Map(
        this.map_container.nativeElement,
        {
          enableMapClick: true,//点击拖拽
          enableScrollWheelZoom: true,//启动滚轮放大缩小，默认禁用
          enableContinuousZoom: true //连续缩放效果，默认禁用
        }
      );//创建地图实例

    // map.centerAndZoom("广州",17); //设置城市设置中心和地图显示级别
    // map.addControl(new BMap.MapTypeControl());//地图类型切换
    // map.setCurrentCity("广州"); //设置当前城市

    let point = new BMap.Point(116.331398,39.897445);//坐标可以通过百度地图坐标拾取器获取
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    map.centerAndZoom(point, 18);//设置中心和地图显示级别

    // let sizeMap = new BMap.Size(10, 80);//显示位置
    // map.addControl(new BMap.NavigationControl());

    // let myIcon = new BMap.Icon("assets/icon/favicon.ico", new BMap.Size(300, 157));
    // let marker = this.marker = new BMap.Marker(point, { icon: myIcon });
    // map.addOverlay(marker);

    this.getLocation();
    this.bdGEO();
  }


  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let locationPoint = new BMap.Point(resp.coords.longitude, resp.coords.latitude);
      let convertor = new BMap.Convertor();
      let pointArr = [];
      pointArr.push(locationPoint);
      convertor.translate(pointArr, 1, 5, (data) => {
        if (data.status === 0) {
          let marker = this.marker = new BMap.Marker(data.points[0], { icon: this.myIcon });
          this.map.panTo(data.points[0]);
          marker.setPosition(data.points[0]);
          this.map.addOverlay(marker);
        }
      })
      console.log('GPS定位：您的位置是 ' + resp.coords.longitude + ',' + resp.coords.latitude);
    })
  }

 bdGEO(){
    let add = this.adds[this.index];
    //console.log(add);
		this.geocodeSearch(add);
		this.index++;
	}
 geocodeSearch(add){
		if(this.index < this.adds.length){
      //setTimeout(this.bdGEO,400);
      setTimeout(this,400);
		} 
		this.myGeo.getPoint(add, function(point){
      
			if (point) {
         console.log('add : ' + add  + ', lat:' + point.lat);
				//document.getElementById("result").innerHTML +=  this.index + "、" + add + ":" + point.lng + "," + point.lat + "</br>";
        //var address = new BMap.Point(point.lng, point.lat); 
        this.addMarker(point, new BMap.Label(this.index + ":" + add, { offset: new BMap.Size(20, -10) }));

			}
		}, "上海市");
	}
	// 编写自定义函数,创建标注
  addMarker(point, label) {
    var marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
    marker.setLabel(label);
  }

}
