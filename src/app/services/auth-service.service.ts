import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../models/register-payload';
import { Observable } from 'rxjs';
import { Auth } from '../models/Auth';
import { LoginPayload } from '../models/Login-Payload';
import { FeedPayload } from '../models/Feed-Payload';
import { CommentPayload } from '../models/Comment-Payload';
import { AddComment } from '../models/Add-Comment';
import { AllHoods } from '../models/Hoods';
import { AllUsers } from '../models/AllUsers';
import { UserPayload } from '../models/UserPayload';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  baseUrl = 'http://localhost:8080/nnet/api';
  

  constructor(private http: HttpClient) { }

  register(payload: RegisterPayload): Observable<void>{
    return this.http.post<void>(`${this.baseUrl}/auth/register`, payload);
  }

  login(payload: LoginPayload): Observable<Auth>{
    return this.http.post<Auth>(`${this.baseUrl}/auth/login`, payload);
  }

  private token!: string;
  setToken(token: Auth['token']) {
    this.token = token;
  }

  //get feed from the back end and send the session token to the back end
  feed():  Observable<FeedPayload>{
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    return this.http.get<FeedPayload>(`${this.baseUrl}/posts/feed`, { headers });
  }

  comments():  Observable<CommentPayload>{
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/reviews/retrive`;

    return this.http.post<CommentPayload>(url, { headers: headers });
  }

  
  submitComment(payload: AddComment): Observable<void> {
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/reviews/add`;
  
    return this.http.post<void>(url, payload, { headers: headers });
  }
  
  gethoods():  Observable<AllHoods>{
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/admin/hoods`;

    return this.http.get<AllHoods>(url, { headers: headers });
  }

  getusers():  Observable<AllUsers>{
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/admin/users`;

    return this.http.get<AllUsers>(url, { headers: headers });
  }

  deleteUser(payload: UserPayload): Observable<void> {
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/admin/deleteuser`;
    
    return this.http.delete<void>(url, { headers: headers, body: payload });
  }
  
  
  
}
