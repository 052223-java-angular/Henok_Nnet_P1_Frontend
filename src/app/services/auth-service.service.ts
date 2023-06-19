import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterPayload } from '../models/register-payload';
import { Observable } from 'rxjs';
import { Auth } from '../models/Auth';
import { LoginPayload } from '../models/Login-Payload';

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
}
