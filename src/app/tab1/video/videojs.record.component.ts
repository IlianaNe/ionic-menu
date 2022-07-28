import {
    Component,
    OnInit,
    OnDestroy,
    ElementRef,
    Input,
    Output,
    EventEmitter
  } from '@angular/core';

  declare var videojs: any;
  declare var RecordRTC: any;

  @Component({
    selector: 'videojs-record',
    templateUrl: './videojs.record.component.html',


    styleUrls: ['./videojs.record.component.css']
  })

  export class VideoJSRecordComponent implements OnInit, OnDestroy {

    // reference to the element itself: used to access events and methods
    private _elementRef: ElementRef

    // index to create unique ID for component
    @Input() idx: any;
    @Output() formData = new EventEmitter<any>();

    camapaOpen:boolean = false;
    camaraClose:boolean = true;
    buttonVideo:boolean = false;
    returnVideo:boolean = false;
    finishVideo:boolean = false;
    camOpen:boolean = true;



    private config: any;
    private player: any;
    private plugin: any;

    // constructor initializes our declared vars
    constructor(elementRef: ElementRef) {
      this.player = false;

      // video.js configuration
      this.config = {
        controls: true,
        autoplay: false,
        fluid: false,
        loop: false,
        width:  window.screen.width * 82/100,
        height:  window.screen.height * 45/100,
        controlBar: {
          volumePanel: false
        },
        plugins: {
          // configure videojs-record plugin
          record: {
            audio: false,
            video: true,
            debug: true,
            videoMimeType: "video/webm;codecs=vp8",
            videoRecorderType:'auto',
            frameHeight: 	340
            
          }
        }
      };
    }

    ngOnInit() {
    
      
    }

    // use ngAfterViewInit to make sure we initialize the videojs element
    // after the component template itself has been rendered
    ngAfterViewInit() {
      // ID with which to access the template's video element
      let el = 'video_' + this.idx;
      console.log(el);
      

      // setup the player via the unique element ID
      this.player = videojs(document.getElementById(el), this.config, () => {
        console.log('player ready! id:', el);

        // print version information at startup
        var msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-record ' + videojs.getPluginVersion('record') +
        ' and recordrtc ' + RecordRTC.version;
        videojs.log(msg);
      });

      // device is ready
      this.player.on('deviceReady', () => {
        console.log('device is ready!');
        this.camapaOpen = true
        this.camaraClose = false
      });


      // user clicked the record button and started recording
      this.player.on('startRecord', () => {
        console.log('started recording!');
      });

      // user completed recording and stream is available
      this.player.on('finishRecord', () => {
        // recordedData is a blob object containing the recorded data that
        // can be downloaded by the user, stored on server etc.
        console.log('finished recording: ', this.player.recordedData);

        // Video to base64
        this.blobToBase64(this.player.recordedData).then(
          (res) => {
            // base64format
            console.log(res);
          }
        );
    
        this.camapaOpen = false
        this.buttonVideo = true
        this.returnVideo = true 
        this.finishVideo = true 
        this.formData.emit(this.buttonVideo);

      });

      // error handling
      this.player.on('error', (element, error) => {
        console.warn(error);
      });
    }
    
    onClick(){
      this.player.record().start();
      this.camOpen = false;
      setTimeout(() => {
        this.camOpen = true;
      }, 10000);
    }
    openCam(){
      this.player.record().getDevice();
      this.camapaOpen = true
      this.camaraClose = false
    }

    recor(){
      this.player.record().startVideoPreview();
      this.camapaOpen = true
      this.returnVideo = false
      this.finishVideo = false
      this.buttonVideo = false
      this.formData.emit(this.buttonVideo);
    }

    guardar(){
      this.formData.emit(this.buttonVideo);
    }

    pb(){
      console.log( this.player.record().saveAs());
      this.player.record().saveAs({'video': 'my-video-file-name.webm'});
    }

    blobToBase64(blob): Promise<string | ArrayBuffer> {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise(resolve => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    };

    ngOnDestroy() {
      if (this.player) {
        this.player.dispose();
        this.player = false;
      }
    }

  }
