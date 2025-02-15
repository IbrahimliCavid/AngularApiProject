import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  
  constructor(private formBuilder  : FormBuilder) {
  }

  frm : FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      fullname : ["",[
        Validators.required, 
        Validators.maxLength(100),
         Validators.minLength(3)
      ]],
      username : ["",[
        Validators.required, 
        Validators.maxLength(100),
         Validators.minLength(3)
      ]],
      email : ["",[
        Validators.required, 
        Validators.maxLength(150),
        Validators.email
      ]],
      password:["",[
        Validators.required
      ]],
      repassword:["",[
        Validators.required
      ]]
    }, {
      validators : (group: AbstractControl) : ValidationErrors | null =>{
        let password = group.get("password").value;
        let repassword = group.get("repassword").value;
        return password === repassword? null : {notSame : true};
      }
    }

    )
  }
  
  get component(){
    return this.frm.controls
  }
  submitted : boolean = false;
  onSubmit(data : User){
    this.submitted = true;
   
    if(this.frm.invalid)
      return
  }


}
