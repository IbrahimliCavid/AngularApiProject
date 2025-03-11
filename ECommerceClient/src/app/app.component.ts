import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import {ComponentType} from "./services/common/dynamic-load-component.service"
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  @ViewChild(DynamicLoadComponentDirective, {static:true})
  dynamicLoadComponentDirective : DynamicLoadComponentDirective;

  constructor(
    public authService : AuthService,
     private toastrService : CustomToastrService, 
     private router : Router,
      private socialAuthService: SocialAuthService,
    private dynamicLoadComponentService : DynamicLoadComponentService) {


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

  loadComponent(){
  
   this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent, this.dynamicLoadComponentDirective.viewContainerRef)
  }
}

