import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerService {

  constructor() { }

  public handle(error: any){
    if(error?.status === 403){
      return throwError(() => {});
    }

    if(error?.status === 422) {
      for(let err of error.error.errors){
        alert(err.message);
      }
      return throwError(() => {});
    }

    if(error?.status === 401){
      alert(error.error.message)
      return throwError(() => {});
    }

    if(error?.status === 400){
      alert(error.error.message);
      return throwError(() => {});
    }

    let errMsg: string = error?.error?.message;
    return throwError(() => new Error(errMsg));
   }

}
