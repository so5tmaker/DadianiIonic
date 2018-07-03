import { Component, Inject } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ToastController,
  ActionSheetController, ModalController
} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';

import { FavoriteProvider } from '../../providers/favorite/favorite';
import { DishProvider } from '../../providers/dish/dish';

import { CommentPage } from '../comment/comment';

import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  dishcopy = null;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;
  comment: Comment;
  date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private favoriteservice: FavoriteProvider,
    private dishservice: DishProvider,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController,
    @Inject('BaseURL') private BaseURL,
    private socialSharing: SocialSharing
  ) {
    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);

    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment ? comment.rating : 0);
    this.avgstars = (total / this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Блюдо ' + this.dish.id + ' успешно добавлено в список избранных ',
      position: 'middle',
      duration: 3000
    }).present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Выберите действие',
      buttons: [
        {
          text: 'Добавить в избранное',
          handler: () => {
            this.addToFavorites();
            console.log('Add To Favorites clicked');
          }
        },
        {
          text: 'Добавить комментарий',
          handler: () => {
            this.openComment();
            console.log('Add Comment clicked');
          }
        }, {
          text: 'Отменить',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Поделиться через Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Поделиться через Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
      ]
    });
    actionSheet.present();
  }


  openComment() {
    let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss(data => {
      this.comment = data;
      console.log(this.comment);
      if (this.comment)
        this.dish.comments.push(this.comment);
      this.dishservice.submitDish(this.dish, this.dish.id)
        .subscribe(
          (data: Dish) => { this.dish = data; },
          errMess => console.log(errMess)
        );
    });
    modal.present();
  }

  onDidDismiss() {

  }

}