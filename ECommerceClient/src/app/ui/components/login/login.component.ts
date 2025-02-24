import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/token-response';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  constructor(
    private userAuthService : UserAuthService,
     spinner : NgxSpinnerService, 
     private authService : AuthService,
    private activatedRoute : ActivatedRoute,
  private router : Router,
  private socialAuthService: SocialAuthService) {
    super(spinner)
    socialAuthService.authState.subscribe(async(user : SocialUser) =>{
     console.log(user);
     
      this.showSpinner(SpinnerType.BallNewtonCradle);
      switch(user.provider){
        case "GOOGLE" : 
        await  userAuthService.googleLogin(user, ()=> {
          this.authService.identitycheck();
          this.activatedRoute.queryParams.subscribe(params =>{
           const returnUrl : string = params["returnUrl"]
           if(returnUrl)
             this.router.navigate([returnUrl])
          });
         this.hideSpinner(SpinnerType.BallNewtonCradle)
       })
       break;

       case "FACEBOOK":
          
          await userAuthService.facebookLogin(user, ()=>{
            this.authService.identitycheck();
            this.activatedRoute.queryParams.subscribe(params =>{
             const returnUrl : string = params["returnUrl"]
             if(returnUrl)
               this.router.navigate([returnUrl])
            });
           this.hideSpinner(SpinnerType.BallNewtonCradle)
          })
        break;
      }
    });
   
  }


 async login(usernameOrEmail : string, password : string){
  this.showSpinner(SpinnerType.BallNewtonCradle)
   await this.userAuthService.login(usernameOrEmail, password, ()=>{
    this.authService.identitycheck();
   this.activatedRoute.queryParams.subscribe(params => {
    const returnUrl : string = params["returnUrl"]
    if(returnUrl)
      this.router.navigate([returnUrl])
   });
    this.hideSpinner(SpinnerType.BallNewtonCradle)
  })
  }
  facebookLogin(){
    this.socialAuthService.signOut(); // Əgər daxil olmuşsınızsa, çıxış edin
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, { scope: 'email' })
  }
}
