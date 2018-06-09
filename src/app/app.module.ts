import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { HttpClientModule } from '@angular/common/http';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { MapPageModule } from '../pages/map/map.module';
import { CarportPageModule } from '../pages/carport/carport.module';
import { LeisureParkPageModule } from '../pages/leisure-park/leisure-park.module';
import { SelectCommunityModalPageModule } from '../pages/select-community-modal/select-community-modal.module';
import { LookupLeisureParkPageModule } from '../pages/lookup-leisure-park/lookup-leisure-park.module';
import { MyordersPageModule } from '../pages/myorders/myorders.module';
import { PmcCarportDashboardPageModule } from '../pages/pmc-carport-dashboard/pmc-carport-dashboard.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { MyCreditPageModule } from '../pages/my-credit/my-credit.module';
import { AdminDashboardPageModule } from '../pages/admin-dashboard/admin-dashboard.module';
import { BasePageModule } from '../pages/base/base.module'; 


import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { AutoCompleteServiceProvider } from '../providers/autocomplete-service/autocomplete-service';


import { Geolocation } from '@ionic-native/geolocation';
import { SMS } from '@ionic-native/sms';
import { Alipay } from '@ionic-native/alipay';
//It's quite important to delcare in provider
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Logger } from "angular2-logger/core";
import { GlobalErrorHandler } from '../providers/global-error-handler/global-error-handler'; 

@NgModule({
  declarations: [
    MyApp,
 
    // HomePage, 
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginPageModule,
    RegisterPageModule,
    MapPageModule,
    LeisureParkPageModule,
    SelectCommunityModalPageModule,
    LookupLeisureParkPageModule,
    MyordersPageModule,
    ProfilePageModule,
    CarportPageModule,
    PmcCarportDashboardPageModule,
    MyCreditPageModule,
    AdminDashboardPageModule,
    BasePageModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: GlobalErrorHandler}, 
    RestServiceProvider,
    AutoCompleteServiceProvider,
    SMS,
    LocalNotifications,
    Alipay,
    Logger,
    //Amin: IMP. GlobalErrorHandler should be here, otherwise it would not be triggerred.
    GlobalErrorHandler,
    Geolocation 
     
    //GeographicalMapServiceProvider
  ]
})
export class AppModule {}
