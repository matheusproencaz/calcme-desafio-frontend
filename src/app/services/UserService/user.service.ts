import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { User } from '../../model/user.model';
import { ExceptionHandlerService } from '../ExceptionHandler/exception-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private errorHandler: ExceptionHandlerService
    ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`)
    .pipe(catchError(this.errorHandler.handle));
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/users`, user)
      .pipe(catchError(this.errorHandler.handle));
  }
}
