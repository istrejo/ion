import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) {}

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'loading-ctrl',
      spinner: 'crescent',
      message: 'Loading...',
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  dismissLoading() {
    this.loadingCtrl.dismiss();
  }
}
