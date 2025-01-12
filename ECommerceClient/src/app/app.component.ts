import { Component, OnInit } from '@angular/core';
import { CustomToastrService, Position, MessageType } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ECommerceClient';
  
  constructor(private toastr : CustomToastrService) {
  }
  ngOnInit(): void {
    this.toastr.message("Cavid", "Ibrahimli", {
      messageType : MessageType.Info,
      position: Position.BottomLeft
    })  
    this.toastr.message("Cavid", "Ibrahimli",{}) 

  }
}

