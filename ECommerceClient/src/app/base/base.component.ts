import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  
  constructor(private spinner : NgxSpinnerService) {}

  showSpinner(typeName : SpinnerType){
      this.spinner.show(typeName);
      setTimeout(() => this.hideSpinner(typeName), 1000);
  }

  hideSpinner(typeName : SpinnerType){
    this.spinner.hide(typeName);
    setTimeout(() => {
      document.querySelectorAll('[aria-hidden="true"]').forEach(el => el.removeAttribute('aria-hidden'));
    }, 500);
  }
}

export enum SpinnerType{
  BallFussion = "ball-fussion",
  BallNewtonCradle = "ball-newton-cradle"
}
