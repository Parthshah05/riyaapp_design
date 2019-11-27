import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User_Class, UserEdit } from 'src/app/shared/User_class';

@Injectable({
  providedIn: 'root'
})
export class UserDbService {

  private urllogin: string = "http://api.riyafoodslimited.co.uk/index.php/login";
  private urlsignup: string = "http://api.riyafoodslimited.co.uk/index.php/signup";
  private urlUser: string = "http://api.riyafoodslimited.co.uk/index.php/user";
  private verifyUrl: string = "http://api.riyafoodslimited.co.uk/index.php/verify";
  private contact: string = "http://api.riyafoodslimited.co.uk/index.php/contactus";

  constructor(private http: HttpClient) { }

  loginUser(user_email, user_password) {
    var user = {
      user_email: user_email,
      user_password: user_password
    }

    const body = JSON.stringify(user);
    return this.http.post(this.urllogin, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }

  signupUser(user: User_Class) {
    const body = JSON.stringify(user);
    return this.http.post(this.urlsignup, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }

  editUser(user: UserEdit) {
    const body = JSON.stringify(user);
    return this.http.put(this.urlUser, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }

  getUserById(user_id) {
    return this.http.get(this.urlUser + "/" + user_id);
  }

  changeUserPassword(user_id, old_password, new_password) {
    var password = {
      user_password: old_password,
      user_password_new: new_password
    };
    const body = JSON.stringify(password);
    return this.http.put(this.urlUser + "/" + user_id, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  verifyUser(otp) {
    var otpObj = {
      otp: otp
    };
    const body = JSON.stringify(otpObj);
    console.log(body);
    return this.http.put(this.verifyUrl, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  contactUS(user_name, user_email, user_subject, user_message) {
    var contact = {
      user_name: user_name,
      user_email: user_email,
      user_subject: user_subject,
      user_message: user_message
    }
    const body = JSON.stringify(contact);
    return this.http.post(this.contact, body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
