import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  errorMessage:any
  constructor(private service:StorageService,private router:Router){}

  RegisterForm=new FormGroup({
    username:new FormControl("",Validators.required),
    password:new FormControl("",[Validators.required,Validators.minLength(6)])
  })

  register(){
    let data=this.RegisterForm.value
    this.service.signUp(data).subscribe(res=>{
      alert('You have registered successfully')
      this.router.navigateByUrl('login')
    },error=>{
      console.log(error);
      this.errorMessage=Object.values(error.error).flat(1)
      
    })
    

  }

}
