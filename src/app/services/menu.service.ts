import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(public http:HttpClient) { }
  getMenu():any{
    return this.http.get('assets/sample.json');
  }
  login(logdata:any):any{
    return this.http.post('http://localhost:8080/api/login',logdata)
  }
  signUp(userdata:any){
    return this.http.post('http://localhost:8080/api/signup',userdata)
  }
}