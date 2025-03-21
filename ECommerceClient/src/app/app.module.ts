import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './ui/components/login/login.component';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpErrorHandlerInterceptorService } from './services/common/http-error-handler-interceptor.service';
import { BasketsModule } from "./ui/components/baskets/baskets.module";
import { UiModule } from './ui/ui.module';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicLoadComponentDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
        config: {
            tokenGetter: () => localStorage.getItem("accessToken"),
            allowedDomains: ["localhost:7156"]
        }
    }),
    SocialLoginModule,
],
  providers: [
    {provide: "baseUrl", useValue: "https://localhost:7156/api", multi: true},
    {provide: "baseSignalRUrl", useValue: "https://localhost:7156/", multi: true},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("484971171608-3tl4n0dptrqd94f68dvue6o5ilr8gd5m.apps.googleusercontent.com")
          },
          {
            id : FacebookLoginProvider.PROVIDER_ID,
            provider : new FacebookLoginProvider("1041065947858144")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    },
    {provide : HTTP_INTERCEPTORS, useClass : HttpErrorHandlerInterceptorService, multi : true}
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
