import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Connection', component: AuthPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      let config = {
        apiKey: "AIzaSyC-hNCy8hG66Wocg8NZ2iCXh4v-hm5MkHg",
        authDomain: "fire-qcm.firebaseapp.com",
        databaseURL: "https://fire-qcm.firebaseio.com",
        projectId: "fire-qcm",
        storageBucket: "fire-qcm.appspot.com",
        messagingSenderId: "693819937947"
      };
      firebase.initializeApp(config);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: any, data?: {}) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component, data ? data:null);
  }
}
