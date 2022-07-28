import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FileRecord } from "./fileModel";

@Component({
  selector: "app-input-file",
  templateUrl: "./input-file.component.html",
  styleUrls: ["./input-file.component.scss"],
})
export class InputFileComponent implements OnInit {
  @Input() inputDesign: any;
  @Output() uploadFile = new EventEmitter<any>();
  icon: string = "cloud-upload";
  titleFile: string;
  fileUploaded: boolean;
  files = [];
  file = null;
  fileRecord = null;
  text: string = '';
  urlFile = null;
  constructor() {
  }

  ngOnInit() {
    this.icon = this.inputDesign.icon;
    this.text = this.inputDesign.text;
  }
  public onFileInputChange(filesSelected: any, tipoDocumento: string) {
    this.titleFile = "";
    this.fileUploaded = false;
    this.files = [];
    this.file = null;
    this.fileRecord = null;
    this.urlFile = null;
    console.log(filesSelected);
    const fileRecovered = filesSelected.target.files as File;
    this.file = fileRecovered[0];

    if (this.file != null) {
      const fileName = fileRecovered[0].name;
      this.titleFile = fileName;
      const fileRecord: FileRecord = {
        name: fileName,
        size: fileRecovered[0].size,
        type: fileRecovered[0].type,
        isUploading: true,
        isDeleting: false,
      };
      this.fileRecord = fileRecord;
      this.files.push(fileRecord);
      let mb = (fileRecord.size / 1048576)
      console.log(fileRecord);
      
      console.log(mb);
      
      console.log( fileRecord.type );
      
      if (
        fileRecord.type == "image/jpg" ||
        fileRecord.type == "image/jpeg" ||
        fileRecord.type == "application/pdf" &&
        mb <= 20
      ) {
        this.onUploadFile(tipoDocumento, filesSelected);
      } else {
        alert(
          "El tipo de archivo ingresado es incorrecto, por favor selecciona un archivo en formato PDF, JPG, JPEG y menor a 20MB"
        );
      }
    }
  }
  public onUploadFile(tipoDocumento: string, filesSelected) {
    const params = {
      data: {
        fileName: this.fileRecord.name,
        fileType: this.fileRecord.type,
        fileSize: this.fileRecord.size,
        filesSelected
      },
      tipoDocumentoIdentificador: tipoDocumento,
    };
    this.uploadFile.emit(params)
  }
}
