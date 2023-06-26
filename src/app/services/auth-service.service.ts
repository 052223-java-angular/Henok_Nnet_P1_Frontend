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
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PostPayload } from '../models/Post';
import { UserName } from '../models/UserName';
import { DeletePayload } from '../models/DeletePayload';
import { UpdateUser } from '../models/Update-User';
import { UpdateUserPayload } from '../models/UserUpdatePayload';
import { FilterFeed } from '../models/Filter-Feed';
import { DeleteComment } from '../models/Delete-Comment';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  baseUrl = environment.apibaseUrl;
  // baseUrl = 'http://localhost:8080/nnet/api';

  constructor(private http: HttpClient, private router: Router) { }

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


  promoteUser(payload: UserPayload): Observable<void> {
    const headers = new HttpHeaders().set('auth-token', this.token || '');
    const url = `${this.baseUrl}/admin/update`;
  
    return this.http.put<void>(url, payload, { headers: headers });
  }

  createPost(payload: PostPayload): Observable<void> {
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/posts/add`;
  
    return this.http.post<void>(url, payload, { headers: headers });
  }

  getuserName():  Observable<UserName>{
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/user/username`;

    return this.http.get<UserName>(url, { headers: headers });
  }

  deletePost(payload: DeletePayload): Observable<void> {
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/posts/deletePost`;
    
    return this.http.delete<void>(url, { headers: headers, body: payload });
  }

  deleteComment(payload: DeleteComment): Observable<void> {
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/posts/deletecomment`;
    
    return this.http.delete<void>(url, { headers: headers, body: payload });
  }


  getUserProfile():  Observable<UpdateUser>{
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/user/profile`;

    return this.http.get<UpdateUser>(url, { headers: headers });
  }


  updateUserProfile(payload: UpdateUserPayload): Observable<void> {
    const headers = new HttpHeaders().set('auth-token', `${this.token}`);
    const url = `${this.baseUrl}/user/update`;
  
    return this.http.put<void>(url, payload, { headers: headers });
  }
  

  // getPostsByCategory(payload: string): Observable<FeedPayload> {
  //   const headers = new HttpHeaders().set('auth-token', `${this.token}`);
  //   const url = `${this.baseUrl}/user/filter`;
  
  //   return this.http.put<FeedPayload>(url, payload, { headers: headers });
  // }
  
  // getPostsByCategory(payload: string): Observable<FeedPayload> {
  //   const headers = new HttpHeaders().set('auth-token', this.token);
  //   const url = `${this.baseUrl}/user/filter`;

  //   return this.http.put<FeedPayload>(url, payload, { headers });
  // }
  
  getPostsByCategory(payload: FilterFeed): Observable<FeedPayload> {
    const headers = new HttpHeaders().set('auth-token', this.token);
    const url = `${this.baseUrl}/user/filter`;

    return this.http.put<FeedPayload>(url, payload, { headers: headers });
  }
  








  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
