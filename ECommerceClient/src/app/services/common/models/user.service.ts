import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MessageType } from '../../admin/alertify.service';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/token-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService, private tosatrService : CustomToastrService) { }

  async create(user: User) : Promise<CreateUser>{
   const observabele : Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller:"users"
    }, user)

    return await firstValueFrom(observabele) as CreateUser
  }

 async login(usernameOrEmail : string, password : string, callBack? : ()=>void)  :Promise<any>{
   const observabele : Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller : "users",
      action : "login"
    }, {usernameOrEmail, password})
   const tokenResponse : TokenResponse =  await firstValueFrom(observabele) as TokenResponse
   
   if(tokenResponse){
     
    localStorage.setItem("accessToken", tokenResponse.token.accessToken);

     this.tosatrService.message("Login Succesfully", "info",{
   messageType : ToastrMessageType.Success,
   position : ToastrPosition.TopLeft
   })
   }
    callBack();
  }
}
