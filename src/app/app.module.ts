import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from  '../pages/profile/profile';
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
import { LeisureParkPageModule } from '../pages/leisure-park/leisure-park.module';
import { SelectCommunityModalPageModule } from '../pages/select-community-modal/select-community-modal.module';
import { LookupLeisureParkPageModule } from '../pages/lookup-leisure-park/lookup-leisure-park.module';
import { MyordersPageModule } from '../pages/myorders/myorders.module';
import { UserPortalPageModule } from '../pages/user-portal/user-portal.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage, 
    HomePage, 
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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage, 
    HomePage, 
    //SelectCommunityModalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestServiceProvider,
    AutoCompleteServiceProvider,
    Geolocation
    //GeographicalMapServiceProvider
  ]
})
export class AppModule {}
