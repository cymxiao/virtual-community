import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HttpClientModule } from '@angular/common/http';
import { RestServiceProvider } from '../providers/rest-service/rest-service';
import { AutoCompleteServiceProvider } from '../providers/autocomplete-service/autocomplete-service';
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { TestPageModule } from '../pages/test/test.module';
import { CarportPageModule } from '../pages/carport/carport.module';
import { LeisureParkPageModule } from '../pages/leisure-park/leisure-park.module';
import { SelectCommunityModalPageModule } from '../pages/select-community-modal/select-community-modal.module';
import { LookupLeisureParkPageModule } from '../pages/lookup-leisure-park/lookup-leisure-park.module';
import { MyordersPageModule } from '../pages/myorders/myorders.module';
import { PmcCarportDashboardPageModule } from '../pages/pmc-carport-dashboard/pmc-carport-dashboard.module';
import { UserPortalPageModule } from '../pages/user-portal/user-portal.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { BasePageModule } from '../pages/base/base.module';
import { ErrorHandlerPageModule } from '../pages/error-handler/error-handler.module';

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
    ContactPageModule,
    TestPageModule,
    LeisureParkPageModule,
    SelectCommunityModalPageModule,
    LookupLeisureParkPageModule,
    MyordersPageModule,
    UserPortalPageModule,
    ProfilePageModule,
    CarportPageModule,
    PmcCarportDashboardPageModule,
    ErrorHandlerPageModule,
    BasePageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
 
    //HomePage, 
    //SelectCommunityModalPage,
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
    Geolocation 
     
    //GeographicalMapServiceProvider
  ]
})
export class AppModule {}
