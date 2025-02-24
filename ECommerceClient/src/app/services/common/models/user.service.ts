import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { MessageType } from '../../admin/alertify.service';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/token-response';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService : HttpClientService) { }

  async create(user: User) : Promise<CreateUser>{
   const observabele : Observable<CreateUser | User> = this.httpClientService.post<CreateUser | User>({
      controller:"users"
    }, user)

    return await firstValueFrom(observabele) as CreateUser
  }


}
