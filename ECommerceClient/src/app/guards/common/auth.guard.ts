import { ActivatedRouteSnapshot, CanActivate, CanActivateFn,  Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root' 
})


export class AuthGuard implements CanActivate{
  constructor(private jwtHelper : JwtHelperService,
     private router : Router,
    private toastrService : CustomToastrService,
  private spinner : NgxSpinnerService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.spinner.show(SpinnerType.BallFussion);
    const token : string = localStorage.getItem("accessToken");

   let expired : Boolean;

   try{
       expired = this.jwtHelper.isTokenExpired(token);
   }catch{
     expired = true;
   }

   if(!token || expired){
   this.router.navigate(["login"], {queryParams : {returnUrl : state.url}});
   this.toastrService.message("Login is required", "Unauthorized access", {
    position : ToastrPosition.TopLeft,
    messageType : ToastrMessageType.Warning
   })
   }
   this.spinner.hide(SpinnerType.BallFussion);

    return true;
  }
  };
