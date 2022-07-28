import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [Camera]
})
export class Tab1Page implements OnInit {
  image: string;
  complementary = false;
  nameFile: string;
  buttonVideo:boolean = false



  constructor(private camera: Camera,route: ActivatedRoute) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    const url: Observable<string> = route.url.pipe(map(segments => segments.join('asdsad')));
    // route.data includes both `data` and `resolve`
    const user = route.data.pipe(map(d => d.user));
  }
  

  ngOnInit() {
  }



  openCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, err => {
      console.log(err);
    });

  }

  uploadImage(fileList: FileList): void {
    // Return if canceled
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];

    // Return if the file is not allowed
    if (!allowedTypes.includes(file.type)) {
      return
    }

    this._readAsDataURL(file).then((data) => {
      this.image =  data;
      return this.image;
    });
  }

   /**
   * Read the given file for demonstration purposes
   *
   * @param file
   */
    private _readAsDataURL(file: File): Promise<any> {
      // Return a new promise
      return new Promise((resolve, reject) => {

          // Create a new reader
          const reader = new FileReader();

          // Resolve the promise on success
          reader.onload = (): void => {
              resolve(reader.result);
          };

          // Reject the promise on error
          reader.onerror = (e): void => {
              reject(e);
          };

          // Read the file as the
          reader.readAsDataURL(file);
      });
  }

  onDataResponse(e){
    console.log(e);
    this.buttonVideo = e
  }
    

}
