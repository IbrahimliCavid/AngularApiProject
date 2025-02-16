import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/entities/user';
import { CreateUser } from 'src/app/contracts/users/create-user';
import { firstValueFrom, Observable } from 'rxjs';

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

 async login(usernameOrEmail : string, password : string, callBack? : ()=>void)  :Promise<void>{
   const observabele : Observable<any> = this.httpClientService.post({
      controller : "users",
      action : "login"
    }, {usernameOrEmail, password})
    await firstValueFrom(observabele)
    callBack();
  }
}
