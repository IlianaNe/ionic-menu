import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  productId: string = 'PALN';
  constructor(private router:Router) {}
  
  openhome(){
    this.router.navigate(['tabs/home/productId='+ this.productId]);
  }
  openTab1(){
    this.router.navigate(['tabs/tab1/productId='+ this.productId]);
  }
  openTab2(){
    this.router.navigate(['tabs/tab2/productId='+ this.productId]);
  }
  openTab3(){
    this.router.navigate(['tabs/tab3/productId='+ this.productId]);
  }
}
