import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
declare var alertfy : any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  constructor(private alertify : AlertifyService) {
    
  }
  ngOnInit(): void {
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
