import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

constructor(
  private httpClientService : HttpClientService,
  private alertifyService : AlertifyService,
  private customToastrService : CustomToastrService,
  // private dialog : MatDialog
  private dialogService : DialogService,
  private spinner : NgxSpinnerService
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
    });
  }

  this.dialogService.openDialog({
    coponentType : FileUploadDialogComponent,
    data : FileUploadDialogState.Yes,
    afterClosed : ()=>{
    
      this.spinner.show(SpinnerType.BallFussion)
        this.httpClientService.post({
          controller : this.options.controller,
          action : this.options.action,
          queryString: this.options.queryString,
          headers : new HttpHeaders({"responseType": "blob"})
        }, fileData).subscribe(data=>{
          this.spinner.hide(SpinnerType.BallFussion)
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
          this.spinner.hide(SpinnerType.BallFussion)
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
  })
  }
    //  openDialog(afterClosed : any): void {
    //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
    //     width: '250px',
    //     data: FileUploadDialogState.Yes,
    //   });
  
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if(result == FileUploadDialogState.Yes){
    //       afterClosed();
    //     }
    //   });
     
    // }
}

export class FileUploadOptions{
  controller? : string;
  action? : string;
  queryString? : string;
  
  explanation? : string;
  accept? :string;

  isAdminPage? : boolean = false;
}
