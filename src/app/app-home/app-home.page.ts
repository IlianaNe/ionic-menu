import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.page.html',
  styleUrls: ['./app-home.page.scss'],
})
export class AppHomePage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  onClick(){
    this.router.navigate(['/']);
  }

}
