import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog : MatDialog) { }

     openDialog(dialogPrametrs : Partial<DiaolgParametrs>): void {
        const dialogRef = this.dialog.open(dialogPrametrs.coponentType, {
          width: dialogPrametrs.options?.width,
          height : dialogPrametrs.options?.height,
          position : dialogPrametrs.options?.position,
          data: dialogPrametrs.data,
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          if(result == dialogPrametrs.data){
            dialogPrametrs.afterClosed();
          }
        });
       
      }
}

export class DiaolgParametrs{
  coponentType : ComponentType<any>;
  data : any;
  afterClosed : ()=>void;
  options?: Partial<DialogOptions> = new DialogOptions()
}

export class DialogOptions{
  width? : string = '250px';
  height?: string;
  position?: DialogPosition
}