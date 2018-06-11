import { Component } from '@angular/core';
import { PostListPage } from "../../pages/post-list/post-list";
import { LoadingController, NavController } from "ionic-angular";
import { ProfilePage } from "../../pages/profile/profile";
import { AuthProvider } from "../../providers/auth/auth";
import { Storage } from "@ionic/storage";
import { UserClass } from "../post-page/UserClass";

/**
 * Generated class for the CustomTabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-tabs',
  templateUrl: 'custom-tabs.html'
})
export class CustomTabsComponent {

  user:UserClass;
  loading:any;

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController,public storage:Storage) {
    this.storage.get('user').then(result =>{
      this.user = result;
    });
  }

  goToPostList(){
    this.navCtrl.setRoot(PostListPage);
  }

  goToProfile(){
    this.navCtrl.setRoot(ProfilePage);
  }


  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

}
