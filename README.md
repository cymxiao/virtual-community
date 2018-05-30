# virtual-community

ionic cordova plugin add cordova-plugin-geolocation
ionic cordova plugin add cordova-sms-plugin
ionic cordova plugin add cordova-plugin-local-notification
ionic cordova plugin add cordova-alipay-base --variable ALI_PID=your_app_id

npm i @ionic-native/geolocation
npm install --save @ionic-native/sms
npm install --save @ionic-native/local-notifications
npm install --save @ionic-native/alipay


Run
ionic serve
ionic serve --environment=dev 
or Run with cordova in brower
ionic cordova platform add browser
ionic cordova run browser




Deploy: 
ionic cordova platform remove android
ionic cordova platform add android@6.4.0
ionic cordova platform remove ios
ionic cordova platform add ios 





Running Your App
To run your app, all you have to do is enable USB debugging and Developer Mode on your Android device, then run ionic cordova run android --device from the command line.

To run or build your app for production, run

ionic cordova run android --prod --release
# or
ionic cordova build android --prod --release

https://ionicframework.com/docs/intro/deploying/






#Issue
since I use cellphone to do regeister and login on one page, how to avoid if a user A  input another one's (B) cellphone, and update this guy's (B) pwd.  And B is always' can login to system since we have a perment localstorage to save the authentication.
