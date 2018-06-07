# virtual-community

ionic cordova plugin add cordova-plugin-geolocation
ionic cordova plugin add cordova-sms-plugin
ionic cordova plugin add cordova-plugin-local-notification
ionic cordova plugin add cordova-alipay-base --variable ALI_PID=your_app_id

npm i @ionic-native/geolocation
npm install --save @ionic-native/sms
npm install --save @ionic-native/local-notifications
npm install --save @ionic-native/alipay

cordova plugin remove cordova-plugin-statusbar



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


# white screen debug
ionic cordova run ios -l -c


ionic cordova build ios --prod --release 

ionic cordova build ios --prod --release --livereload --consolelogs

ionic cordova run ios --prod --release

https://ionicframework.com/docs/intro/deploying/






#Issue
since I use cellphone to do regeister and login on one page, how to avoid if a user A  input another one's (B) cellphone, and update this guy's (B) pwd.  And B is always' can login to system since we have a perment localstorage to save the authentication.


2. Dynamic Menu. PMC user menu item is always wrong when first login , only if page freshed or use ion-refresher, the menu would be fine.
--Use another solutin resolved. create two menus on app.html, use [menuToggle] on pages.

3. Community auto complete control has a pending issue: 输入 '金丰'， 金丰蓝庭小区未显示。

4. How to use async and await in this project.

5. Avoid 非上海的用户使用


# Pending on improve
1. On PMC register, it's better to prompt 'pmc has been regeisted error'  when user select a community.


# Todo
1. license prompt. The benefit rule .
2. advertise
3. add my account menu item
4. add An admin page to check pending PMC
5. add a clear credit function by PMC company and normal user. ( Todo: I need to avoid no credit clean once it has been used to pay.) Now the account_ID in user table is wrong.
6. add carPlate field for leisurepark record. 
7. default price and priceTage value as the value in community when add a new leisurepark 
8. white screen issue when app load.
