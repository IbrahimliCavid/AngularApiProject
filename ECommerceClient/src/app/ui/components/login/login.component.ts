import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/token-response';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(
    private userService : UserService,
     spinner : NgxSpinnerService, 
     private authService : AuthService,
    private activatedRoute : ActivatedRoute,
  private router : Router,
  private socialAuthService: SocialAuthService) {
    super(spinner)
    socialAuthService.authState.subscribe(async(user : SocialUser) =>{
   
      this.showSpinner(SpinnerType.BallNewtonCradle);
    await  userService.googleLogin(user, ()=> {
       this.authService.identitycheck();
       this.activatedRoute.queryParams.subscribe(params =>{
        const returnUrl : string = params["returnUrl"]
        if(returnUrl)
          this.router.navigate([returnUrl])
       });
      this.hideSpinner(SpinnerType.BallNewtonCradle)
    })
      
    })
  }


 async login(usernameOrEmail : string, password : string){
  this.showSpinner(SpinnerType.BallNewtonCradle)
   await this.userService.login(usernameOrEmail, password, ()=>{
    this.authService.identitycheck();
   this.activatedRoute.queryParams.subscribe(params => {
    const returnUrl : string = params["returnUrl"]
    if(returnUrl)
      this.router.navigate([returnUrl])
   });
    this.hideSpinner(SpinnerType.BallNewtonCradle)
  })
  }
}
