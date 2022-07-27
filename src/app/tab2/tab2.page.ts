import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [Geolocation, AndroidPermissions]
})
export class Tab2Page implements OnInit{
  latitude: number;
  longitude: number;
  
  constructor(private geolocation: Geolocation,private androidPermissions: AndroidPermissions) {}

  ngOnInit(): void {
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude; 
    }).catch((error)=>{
      console.log('Error getting location', error);
    });
  }

}
