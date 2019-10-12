import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDbService {
  url = "http://localhost:3000/user/"
  constructor(public http: HttpClient) { }
  
  getUser(id) {
    return this.http.get(this.url + id);
  }
  updateUser(id,user){
    let body= JSON.stringify(user);
    return this.http.put(this.url+id,body, {headers: new HttpHeaders().set('Content-Type','application/json')});
  }

  changePass(user){
    let body= JSON.stringify(user);
    return this.http.put(this.url,body, {headers: new HttpHeaders().set('Content-Type','application/json')});
  }
}
