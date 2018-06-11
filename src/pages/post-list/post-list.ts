import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostsProvider } from "../../providers/posts/posts";
import { ProfilePage } from "../profile/profile";
import { LoginPage } from "../login/login";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the PostListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html',
})
export class PostListPage {


  userPosts:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public postsService:PostsProvider, public authService:AuthProvider) {

  }

  ionViewDidLoad() {
    this.postsService.getPosts().then((data) => {
      console.log(data);
      this.userPosts = data;
      console.log(data);
    }, (err) => {
      console.log("not allowed");
    });
  }


  viewProfile(user){
    this.navCtrl.push(ProfilePage,{user:user});
  }

    logout(){
        this.authService.logout();
        this.navCtrl.setRoot(LoginPage);
    }
}
