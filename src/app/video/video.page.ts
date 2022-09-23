import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  id = {}
  constructor(
    private router: Router,
    private readonly route: ActivatedRoute
    ) {
    this.route.params.subscribe(async params => {
      console.log(params);
      this.id = params
      
    })
   }

  ngOnInit() {
  }
  onClick(){
    this.router.navigate(['/']);
  }


}
