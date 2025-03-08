import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { BaseStorageUrl } from 'src/app/contracts/base-storage-url';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClientService : HttpClientService) { }

 async getBaseStorageUrl() : Promise<BaseStorageUrl>{
  const observable : Observable<BaseStorageUrl> =  this.httpClientService.get<BaseStorageUrl>({
      controller : "files",
      action : "GetBaseStorageUrl"
    })

    return await firstValueFrom(observable)
  }
}
