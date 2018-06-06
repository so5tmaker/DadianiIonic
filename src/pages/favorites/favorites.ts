import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController } from 'ionic-angular';
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
    public toastCtrl: ToastController) {
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
    console.log('delete', id);
    this.favoriteservice.deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = errmess);
    item.close();

    this.toastCtrl.create({
      message: 'Dish ' + id + ' deleted successfully', 
      duration: 3000}).present();
    item.close();
  }

}
