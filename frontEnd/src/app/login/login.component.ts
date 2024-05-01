import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage:any
  constructor(private service:StorageService,private router:Router){}

  LoginForm=new FormGroup({
    username:new FormControl("",Validators.required),
    password:new FormControl("",[Validators.required,Validators.minLength(6)])
  })

  login(){
    let data=this.LoginForm.value
    this.service.signIn(data).subscribe((res:any)=>{
      let tkn=res.token
      let token=`Token ${tkn}`
      localStorage.setItem('token',token)

      alert('You have Logged in successfully')
      this.router.navigateByUrl('')
    },error=>{
      console.log(error);
      error.error.non_field_errors.forEach((p:any)=>
      this.errorMessage=p)
      
    })
    

  }

}
