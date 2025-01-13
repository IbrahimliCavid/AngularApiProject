import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
declare var alertfy : any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
 
  constructor(private alertify : AlertifyService, spinner:NgxSpinnerService) {
    super(spinner);
    
  }
  
    c
    ngOnInit(): void {
      this.showSpinner(SpinnerType.BallFussion)
    }

  m(){
    this.alertify.message("Hello World", {
      messageType : MessageType.Error,
      position: Position.TopRight,
      dismissOther: true
    });
  }

  d(){
    this.alertify.dismiss();
  }

}
