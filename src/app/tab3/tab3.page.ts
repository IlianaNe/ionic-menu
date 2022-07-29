import { Component } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@awesome-cordova-plugins/document-viewer/ngx';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { Directory, Encoding } from '@capacitor/filesystem';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
const { Filesystem, Storage } = Plugins;
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [FileOpener]
})
export class Tab3Page {
  filePDF: string = '';
  mimeType: string = '';
  fileUri: string = '';
  openerBtn: boolean = false;
  url: string = '';
  mimeTypeFile:string= '';
  fileUpload: boolean = false;
  file: any;
  nameFile: string;
  /*downloadUrl = '';
  myFiles = [];
  downloadProgress = 0;

  pdfUrl = 'https://www.redalyc.org/pdf/1794/179421475003.pdf';*/

  formDesignInput = {
    icon: "document-attach",
    text: "Cargar Comprobante Dom.",
  };
  urlPath:string = '';

  constructor(
    private http: HttpClient, 
    private fileOpener: FileOpener, 
    private router: Router,
    private loader: LoadingController, 
    private toast: ToastController) {
      this.urlPath = this.router.url
  }

  downloadFile() {
    this.loader.create({
      message: "downloading..."
    }).then((ele) => {
      ele.present();
      var url = this.url;
      this.http.get(url, { responseType: 'blob' }).subscribe((data) => {
        this.mimeType = data.type;
        let arr = url.split('/');
        var filename = arr[arr.length - 1];
        this.convertBlobToBase64(data, filename, ele);
      })
    });
  }

  
  onClick(){
    this.router.navigate(['appHome']);
  }

  convertBlobToBase64(blob, filename, ele) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    var ref = this;
    reader.onloadend = function () {
      var base64data = reader.result;
      ref.saveBase64(filename,base64data, ele);
    }
  }
 
    saveBase64(filename, base64, ele){
      Filesystem.writeFile({
        path: filename,
        data: base64,
        directory: Directory.Documents
      }).then((val)=>{
        Filesystem.getUri({
          path: filename,
          directory: Directory.Documents
        }).then((uri)=>{
          this.fileUri = uri.uri;
          ele.dismiss();
          this.toast.create({
            message:"file downloaded and saved!",
            duration: 3000
          }).then((ele1)=>{
            ele1.present();
            this.openerBtn = true;
          })
        })
      })
    }

    openFile(){
      this.fileOpener.open(this.fileUri, this.mimeType);
    }
    

  downloadPdf() {
    const pdfUrl = './assets/create.pdf';
    const pdfName = 'violencia-intrafamiliar-y-de-genero';
    FileSaver.saveAs(pdfUrl, pdfName);
  }

  onUploadFile(file) {
    if (file.data.fileType == 'image/jpeg') {
      this.mimeTypeFile = file.data.fileType.slice(6)
    }else{
      this.mimeTypeFile = file.data.fileType.slice(12)
    }
    this.fileUpload = false;
    const fileD = file.data.filesSelected.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(fileD);
    reader.onload = () => {
      this.file = reader.result;
      const extensionArchivo = fileD.name.split(".");
      const extension = extensionArchivo.pop();
      this.nameFile = "comprobante." + extension;
      console.log(this.nameFile);
      
      this.fileUpload = true;
    };
  }
}
