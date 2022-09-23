import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Marker } from '../models/marker.models';
import { CoordInfo } from '../models/coord-info.model';

declare var google;

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
  
  map = null;
  marker: Marker = {
    position : {
      // lat: 19.4326296,
      // lng:-99.1331785,      
      lat: 19.4326296,
      lng:-99.1331785,
    },
    title: "CDMX"
  };
  coordInfo : CoordInfo = null;

  constructor(
      private geolocation: Geolocation,
      private router: Router,
      private androidPermissions: AndroidPermissions,
      public loadingController: LoadingController,) {
        this.urlPath = this.router.url
      }

  ngOnInit(): void {
    this.loadMap();
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

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');

    const myLatLng = {
      lat: this.marker.position.lat,
      lng: this.marker.position.lng

    };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.addMarker(this.marker);
      mapEle.classList.add('show-map');
    });
  }
  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}
