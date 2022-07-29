import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [Geolocation, AndroidPermissions]
})
export class Tab2Page implements OnInit{
  latitude: number;
  longitude: number;
  loading: HTMLIonLoadingElement;
  urlPath:string = '';
  
  constructor(
      private geolocation: Geolocation,
      private router: Router,
      private androidPermissions: AndroidPermissions,
      public loadingController: LoadingController,) {
        this.urlPath = this.router.url
      }

  ngOnInit(): void {
  }
  onClick(){
    this.router.navigate(['appHome']);
  }

  async getLocation(){
    await this.presentLoading();
    this.geolocation.getCurrentPosition().then(async (resp)=>{
      await this.loading.dismiss();
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude; 
    }).catch(async (error)=>{
      await this.loading.dismiss();
      console.log('Error getting location', error);
    });
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
    });
    await this.loading.present();
  }

}
