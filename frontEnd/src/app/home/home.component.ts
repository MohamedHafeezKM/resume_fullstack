import { Component } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms'
import { StorageService } from '../service/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  downloadResume:any
  isResumeUploaded=false
  selectedFile:any=null
  constructor(private service:StorageService,private router:Router){
    this.service.isResumealreadyUploaded().subscribe((data:any)=>{
      console.log(data);
      this.downloadResume=data.resume
      this.isResumeUploaded=true
    })
  
  }
  onFileSelected(event:any){
    console.log(event);
    this.selectedFile=event.target.files[0]
    
  }

 
  Upload(){
    const fd= new FormData();
    fd.append('resume',this.selectedFile,this.selectedFile.name)
   
    this.service.uploadResume(fd).subscribe((result:any)=>{
      alert('You resume succefully uploaded')
      this.isResumeUploaded=true
      
      ,
      (error:any)=>{console.log(error);
      }

    })

    
  }

  signOut(){
    localStorage.removeItem('token')
    this.router.navigateByUrl('login')
  }

  // downloadFile():void{
  //   this.service.isResumealreadyUploaded().subscribe(res=>{
  //     let fileName=res.headers.get('content-disposition')
  //     ?.split(';')[1].split('=')[1];
  //     let blob:Blob=res.body as Blob;
  //     let a:any=document.createElement('a');
  //     a.download=fileName;
  //     a.href=window.URL.createObjectURL(blob);
  //     a.click()

  //   })

  // }
 

}
