import { Component } from '@angular/core';
// 1
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// 

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // 2
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 //
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // 3

}
