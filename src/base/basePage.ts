export abstract class BasePage {
    constructor() {

    }

    goBackHome(navCtrl, pageName) {
        navCtrl.setRoot(pageName);
    }
}