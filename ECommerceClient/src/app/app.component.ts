import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from './services/common/http-client.service';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    public authService : AuthService,
     private toastrService : CustomToastrService, 
     private router : Router,
      private socialAuthService: SocialAuthService,
    private httpClientService : HttpClientService) {

      //Test baskets

//       httpClientService.get({
//         controller:"baskets"
//       }).subscribe(data =>{
// debugger
//       })


//       httpClientService.put({
//         controller:"baskets"
//       }, {
//         basketItemId: "4ddc75e5-2141-456c-b3a4-a44341394bf0",
//         quantity : 10
//       }).subscribe(data =>{
// debugger
//       })

// httpClientService.delete({
//   controller : "baskets"
// }, "4ddc75e5-2141-456c-b3a4-a44341394bf0").subscribe(data=>{debugger})

    authService.identitycheck();
  }
 
  signOut(){
    localStorage.removeItem("accessToken");
    this.socialAuthService.signOut();
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

