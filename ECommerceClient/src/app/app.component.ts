import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(public authService : AuthService, private toastrService : CustomToastrService, private router : Router) {
    authService.identitycheck();
  }
 
  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identitycheck();
    this.router.navigate([""])
    this.toastrService.message("Successfuly log out", "Info",{
      messageType : ToastrMessageType.Info,
      position : ToastrPosition.TopLeft
    }) 
  }
  
  ngOnInit(): void {

  }
}

