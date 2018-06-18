import { Component, OnInit, Inject } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ItemSliding, ToastController,
  LoadingController, AlertController
} from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteservice: FavoriteProvider,
    @Inject('BaseURL') private BaseURL,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('удаление', id);

    let alert = this.alertCtrl.create({
      title: 'Подтвердите удаление',
      message: 'Вы уверены, что хотите удалить блюдо ' + id + ' из избранных?',
      buttons: [
        {
          text: 'Отменить',
          role: 'cancel',
          handler: () => {
            console.log('Удаление отменено');
          }
        },
        {
          text: 'Удалить',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Удаление . . .'
            });
            let toast = this.toastCtrl.create({
              message: 'Блюдо ' + id + ' успешно удалено',
              duration: 3000
            });
            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => { this.favorites = favorites; loading.dismiss(); toast.present(); },
                errmess => { this.errMess = errmess; loading.dismiss(); });
          }
        }
      ]
    });

    alert.present();

    item.close();

  }

}
