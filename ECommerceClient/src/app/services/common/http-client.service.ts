import { Inject, Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient : HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private url(requestParametrs : Partial<RequestParametrs>) : string{
   return `${requestParametrs.baseUrl ? requestParametrs.baseUrl : this.baseUrl}/${requestParametrs.controller}${requestParametrs.action ? `/${requestParametrs.action}` : ""}`;
  }
   
  get<T>(requestParametrs : Partial<RequestParametrs>, id? : string) : Observable<T>{
    let url : string = "";
    if(requestParametrs.fullEndPoint)
      url = requestParametrs.fullEndPoint;
    else
    url = `${this.url(requestParametrs)}${id ? `/${id}` : ""}`;
  return this.httpClient.get<T>(url, {headers: requestParametrs.headers});
}
post<T>(requestParametrs: Partial<RequestParametrs>, body : Partial<T>) : Observable<T>{
  let url : string = "";
  if(requestParametrs.fullEndPoint)
    url = requestParametrs.fullEndPoint;
  else
  url = `${this.url(requestParametrs)}`

 return this.httpClient.post<T>(url, body, {headers: requestParametrs.headers})
}
put<T>(requestParametrs : Partial<RequestParametrs>, body : Partial<T>) : Observable<T>{
  let url : string = "";
  if(requestParametrs.fullEndPoint)
    url = requestParametrs.fullEndPoint;
  else
  url = `${this.url(requestParametrs)}`;

 return this.httpClient.put<T>(url, body, {headers : requestParametrs.headers})
}

delete<T>(requestParametrs:RequestParametrs, id: string) : Observable<T> {
  let url : string = "";
  if(requestParametrs.fullEndPoint)
    url = requestParametrs.fullEndPoint;
  else
  url = `${this.url(requestParametrs)}/${id}`;

 return this.httpClient.delete<T>(url, {headers : requestParametrs.headers})
}


}


export class RequestParametrs{
  controller?:string;
  action? : string;


  headers?: HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string;
}
