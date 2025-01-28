import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

constructor(
  private httpClientService : HttpClientService,
  private alertifyService : AlertifyService,
  private customToastrService : CustomToastrService
) {
}
 @Input() options : Partial<FileUploadOptions>;
  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
  const fileData : FormData = new FormData();
  for(const file of files){
    (file.fileEntry as FileSystemFileEntry).file((_file : File) =>{
      fileData.append(_file.name, _file, file.relativePath)
    })
  }

  this.httpClientService.post({
    controller : this.options.controller,
    action : this.options.action,
    queryString: this.options.queryString,
    headers : new HttpHeaders({"responseType": "blob"})
  }, fileData).subscribe(data=>{
    const message : string = "File successed upload";
    if(this.options.isAdminPage){
      this.alertifyService.message(message,{
       position : Position.TopLeft,
       dismissOther : true,
       messageType : MessageType.Success
      })
     }else{
       this.customToastrService.message(message, "Succesed", {
         messageType : ToastrMessageType.Success,
          position  : ToastrPosition.TopLeft
         
       })
     }
    

  }, (errorResponse : HttpErrorResponse)=>{
    const message : string = "An error occurred while uploading the files"
    if(this.options.isAdminPage){
      this.alertifyService.message(message,{
       position : Position.TopLeft,
       dismissOther : true,
       messageType : MessageType.Error
      })
     }else{
       this.customToastrService.message(message, "Warning", {
         messageType : ToastrMessageType.Error,
          position  : ToastrPosition.TopLeft
         
       })
     }
  })
  }
}

export class FileUploadOptions{
  controller? : string;
  action? : string;
  queryString? : string;
  
  explanation? : string;
  accept? :string;

  isAdminPage? : boolean = false;
}
