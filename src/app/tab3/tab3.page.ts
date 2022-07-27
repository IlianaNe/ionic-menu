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
const { Filesystem, Storage } = Plugins;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  providers: [FileOpener]
})
export class Tab3Page {
  mimeType: string = '';
  fileUri: string = '';
  openerBtn: boolean = false;
  url: string = '';
  /*downloadUrl = '';
  myFiles = [];
  downloadProgress = 0;

  pdfUrl = 'https://www.redalyc.org/pdf/1794/179421475003.pdf';*/

  constructor(private http: HttpClient, private fileOpener: FileOpener, private loader: LoadingController, private toast: ToastController) {
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
  
  /*private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private getMimetype(name) {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf';
    }
  }

  downloadFile(url?) {
    this.downloadUrl = url ? url : this.downloadUrl;

    this.http.get(this.downloadUrl, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).subscribe(async event => {
      if (event.type === HttpEventType.DownloadProgress) {
        this.downloadProgress = Math.round((100 * event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response) {
        this.downloadProgress = 0;

        const name = this.downloadUrl.substr(this.downloadUrl.lastIndexOf('/') + 1);
        const base64 = await this.convertBlobToBase64(event.body) as string;

        const savedFile = await Filesystem.writeFile({
          path: name,
          data: base64,
          directory: Directory.Documents,
        });


        const path = savedFile.uri;
        const mimeType = this.getMimetype(name);

        this.fileOpener.open(path, mimeType).then(() => console.log('Documento abierto')).catch(error => console.log('ERROR al abrir', error));

        this.myFiles.unshift(path);
      }
    });
  }

  async openFile(f) {

    const name = f.substr(f.lastIndexOf('/') + 1);
    const mimeType = this.getMimetype(name);

    this.fileOpener.showOpenWithDialog(f, mimeType).then(() => console.log('Documento abierto')).catch(error => console.log('ERROR al abrir', error));

  }*/
}
