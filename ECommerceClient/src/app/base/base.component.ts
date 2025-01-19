import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  
  constructor(private spinner : NgxSpinnerService) {}

  showSpinner(typeName : SpinnerType){
      this.spinner.show(typeName);
      setTimeout(() => this.hideSpinner(typeName), 10000);
  }

  hideSpinner(typeName : SpinnerType){
    this.spinner.hide(typeName);
  }
}

export enum SpinnerType{
  BallFussion = "ball-fussion",
  BallNewtonCradle = "ball-newton-cradle"
}
