import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  obj = {
    share:'731769979'
  }
  geo = {}

  cards = [
    {
      id: 1,
      title: 'Video',
      img: 'assets/3469461.png',
      url:'video/id'
    },
    {
      id: 2,
      title: 'Url appHome',
      img: 'assets/402204.png',
      url:'appHome'
    },
    {
      id: 3,
      title: 'GPS',
      img: 'assets/854878.png',
      url:'tabs/tab2/productId%3DPALN'
    },
    {
      id: 4,
      title: 'PDF',
      img: 'assets/337946.png',
      url:'tabs/tab3/productId%3DPALN'
    },
    {
      id: 5,
      title: 'Camara',
      img: 'assets/2972113.png',
      url:'tabs/tab1/productId%3DPALN'
    }

  ];


  urlPath:string = ''
  constructor( 
      private router: Router,
      private geolocation: Geolocation,) {
        this.geolocation.getCurrentPosition().then(async (resp)=>{
          
          this.geo = {
            latitude: resp.coords.latitude,
            longitude : resp.coords.longitude
          }
           
        }).catch(async (error)=>{
          console.log('Error getting location', error);
        });
    this.urlPath = this.router.url
   }

   ngOnInit() {
  }


  goSection(data: any){
    if (data.id == 1) {
      this.router.navigate([data.url,this.obj]);
    }else{
      this.router.navigate([data.url]);
    }
  }



  onClick(){
    this.router.navigate(['appHome']);
  }

}
