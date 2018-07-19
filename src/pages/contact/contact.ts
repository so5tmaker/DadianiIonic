import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private emailComposer: EmailComposer,
    private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail() {

    let email = {
      to: 'dadiani.almaty@gmail.com',
      subject: '[Дадиани]: Query',
      body: 'Уважаемый посетитель!',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

  callRestaurant() {
    this.callNumber.callNumber("+77714871313", true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

}
