import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  baseUrl='http://localhost:8000/api/'
  constructor(private http:HttpClient) { }

  get headers(){
    let authToken=localStorage.getItem('token')
    let headers=authToken?new HttpHeaders().set('Authorization',authToken):undefined
    return headers
  }
  
  signUp(data:any){
    return this.http.post(`${this.baseUrl}register/`,data)
  }

  signIn(data:any){
    return this.http.post(`${this.baseUrl}generate-token/`,data)
  }

  uploadResume(data:any){
    return this.http.post(`${this.baseUrl}resume/`,data,{'headers':this.headers})
  }

  public isResumealreadyUploaded(){
    return this.http.get(`${this.baseUrl}resume/`,{'headers':this.headers,observe:'response',responseType:'blob'},
      
    )
  }

}
