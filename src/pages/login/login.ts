import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { SignupPage } from "../signup/signup";
import { UserClass } from "../../components/post-page/UserClass";
import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  username: string;
  password: string;
  loading: any;

  user:UserClass;

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {

    this.user = new UserClass();

  }


  ionViewDidLoad() {

    this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.viewProfile(this.user);
      //this.navCtrl.setRoot(HomePage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });

  }

  login(){

    this.showLoader();

    let credentials = {
      username: this.username.toLocaleLowerCase(),
      password: this.password,
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();

      this.user.username = credentials.username;
      this.viewProfile(this.user);

     // this.navCtrl.setRoot(HomePage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });

  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  viewProfile(user:UserClass){
    this.navCtrl.setRoot(ProfilePage,{user:user});
  }


}
