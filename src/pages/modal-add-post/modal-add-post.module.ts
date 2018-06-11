import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalAddPostPage } from './modal-add-post';

@NgModule({
  declarations: [
    ModalAddPostPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAddPostPage),
  ],
})
export class ModalAddPostPageModule {}
