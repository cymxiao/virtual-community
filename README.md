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


