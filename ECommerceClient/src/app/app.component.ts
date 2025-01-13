import { Component, OnInit } from '@angular/core';
import { CustomToastrService, Position, MessageType } from './services/ui/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ECommerceClient';
  
  constructor() {
  }
  ngOnInit(): void {
  }
}

