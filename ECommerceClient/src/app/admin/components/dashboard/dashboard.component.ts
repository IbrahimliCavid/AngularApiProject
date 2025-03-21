import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';
declare var alertfy : any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
 
  constructor(private alertify : AlertifyService, spinner:NgxSpinnerService, private signalRService : SignalRService) {
    super(spinner);
  }
  
    ngOnInit(): void {
      this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction, message =>{
        this.alertify.message(message, {
          position:Position.TopLeft,
          dismissOther: true,
          messageType : MessageType.Notify
        })
      });

      this.signalRService.on(HubUrls.OrderHub,ReceiveFunctions.OrderAddedMessageReceiveFunction, message =>{
        this.alertify.message(message, {  
          position:Position.TopLeft,
          dismissOther: true,
          messageType : MessageType.Notify
        })
      });
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
