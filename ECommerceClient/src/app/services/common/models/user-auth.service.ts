import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/token-response';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

 constructor(private httpClientService : HttpClientService, private tosatrService : CustomToastrService) { }
  async login(usernameOrEmail : string, password : string, callBack? : ()=>void)  :Promise<any>{
    const observabele : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
       controller : "auth",
       action : "login"
     }, {usernameOrEmail, password})
    const tokenResponse : TokenResponse =  await firstValueFrom(observabele) as TokenResponse
    
    if(tokenResponse){
      
     localStorage.setItem("accessToken", tokenResponse.token.accessToken);
 
      this.tosatrService.message("Login Succesfully", "Info",{
    messageType : ToastrMessageType.Success,
    position : ToastrPosition.TopLeft
    })
    }
     callBack();
   }
 
   async googleLogin (user: SocialUser, callBack?: ()=>void) : Promise<any>{
    const  observable : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
       action : "google-login",
       controller : "auth"
     }, user)
    const tokenResponse : TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse){
 
      localStorage.setItem("accessToken", tokenResponse.token.accessToken)
      this.tosatrService.message("Google Login Succesfully", "Info",{
       messageType : ToastrMessageType.Success,
       position : ToastrPosition.TopLeft,
       })
    }
      callBack();
   }
 
   async facebookLogin(user:SocialUser, callBack?:()=>void) : Promise<any>{
    const observabele : Observable<SocialUser | TokenResponse> = this.httpClientService.post<SocialUser | TokenResponse>({
       action : "facebook-login",
       controller : "auth"
     }, user);
 
    const tokenResponse : TokenResponse =  await firstValueFrom(observabele) as TokenResponse;
 
    if(tokenResponse){
     localStorage.setItem("accessToken", tokenResponse.token.accessToken);
     this.tosatrService.message("Facebook Login Succesfully", "Info",{
       messageType : ToastrMessageType.Success,
       position : ToastrPosition.TopLeft,
       })
    }
    callBack();
   }
}
