import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { UserClass } from "../../components/post-page/UserClass";
import { PostsProvider } from "../../providers/posts/posts";
import { Storage } from '@ionic/storage';
import { ModalAddPostPage } from "../modal-add-post/modal-add-post";
import { Events } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage{

    user:UserClass;
    public userPosts:any;
    public notifications:any;
    loading: any;

    constructor(public postsService: PostsProvider, public loadingCtrl: LoadingController, public storage:Storage,
                public modal:ModalController, public events: Events, private localNotifications: LocalNotifications) {
        this.user = new UserClass();
        events.subscribe('created', (newPost) => {
            // user and time are the same arguments passed in `events.publish(user, time)`
            this.postsService.getPostsByUsername(this.user.username).then((value)=>{
                this.userPosts= value;
                let maxDate = this.findMin(this.userPosts.map((obj)=>{return new Date(obj.date).valueOf();}));
                this.localNotifications.cancelAll();
                this.notifications = this.localNotifications.schedule({
                    text: 'Один или несколько продуктов скоро просрочатся',
                    trigger: {at: new Date(maxDate - 86400000 - Date.now())},
                    led: 'FF0000',
                    sound: null
                });
            });
        });
    }
    findMin(vals:number[]){
        let tmp:number = vals[0];
        for(let i of vals){
            if(i<tmp){
                tmp = i;
            }
        }
        return tmp;
    }

    ionViewWillLoad() {
        this.showLoader();
        this.storage.get('user').then(result => {
            console.log(result);
            this.user = result;
            console.log(result);
            this.postsService.getPostsByUsername(this.user.username).then((data) => {
                this.userPosts = data;
                this.loading.dismiss();
            }, (err) => {
                this.loading.dismiss();
            });
        })
    }

    showLoader(){

        this.loading = this.loadingCtrl.create({
            content: 'Init posts...'
        });

        this.loading.present();
    }

    countOfDaysLeft(product){
        return Math.round((Date.parse(product.date) - Date.now())/86400000);
    }
    countOfHoursLeft(product){
        return Math.abs(Math.round((Date.parse(product.date) - Date.now())/3600000));
    }
    addPost(){
        let newModal = this.modal.create(ModalAddPostPage);
        newModal.present();
    }
    delete(post){
        this.postsService.deletePost(post).then((value)=>{
            this.postsService.getPostsByUsername(this.user.username).then((value)=>{this.userPosts= value;})
        });

    }

    doRefresh(refresher) {
        this.postsService.getPostsByUsername(this.user.username).then((value)=>{this.userPosts= value;})
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
}
