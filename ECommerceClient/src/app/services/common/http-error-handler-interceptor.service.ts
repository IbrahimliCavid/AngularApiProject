import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastr : CustomToastrService, private userAuthService : UserAuthService,private router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error =>{
       
      switch(error.status){
        case HttpStatusCode.Unauthorized:
          


        this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken"), (state:boolean)=>{
          if(!state){
            const url = this.router.url;
            if(url == "/products")
              this.toastr.message("Please create an account!",
                "Warning", {
            position : ToastrPosition.TopLeft,
            messageType : ToastrMessageType.Warning
          });
          else
          this.toastr.message("You are not authorized to access this resource. Please log in.",
            "Unauthorized Access", {
        position : ToastrPosition.TopLeft,
        messageType : ToastrMessageType.Warning
      });
         
          }
        }).then(data =>{})

        break;
        case HttpStatusCode.NotFound:
          this.toastr.message( "The requested resource could not be found.",
              "Not Found", {
            position : ToastrPosition.TopLeft,
            messageType : ToastrMessageType.Warning
          });
        break;
        case HttpStatusCode.InternalServerError:
          this.toastr.message("An unexpected error occurred on the server. Please try again later.",
              "Server Error", {
            position : ToastrPosition.TopLeft,
            messageType : ToastrMessageType.Warning
          });
        break;
        case HttpStatusCode.BadRequest:
          this.toastr.message("Invalid request. Please check your input and try again.",
              "Bad Request", {
            position : ToastrPosition.TopLeft,
            messageType : ToastrMessageType.Warning
          });
        break;
        default :
        this.toastr.message("An unexpected error occurred. Please try again.",
              "Error", {
          position : ToastrPosition.TopLeft,
          messageType : ToastrMessageType.Warning
        });
        break;
      }
      return of(error);
    }));
  }
}
