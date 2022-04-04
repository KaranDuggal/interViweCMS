import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable, Observer,catchError,throwError } from "rxjs";
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = environment.baseURL 
  constructor(
    private http:HttpClient,
    private router: Router,
    private alertService:AlertService
  ) { }
  callAPI(method: "get" | "post" | "put" | "delete",data: any ,route: string ): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http[method](this.baseURL + route, data,)
        .subscribe((data: any) => {
          observer.next(data);
          observer.complete();
        }, error => {
          observer.error(this.handleError(error));
        });
    });
  }
  handleError(error: HttpErrorResponse){
    switch (error.status) {
      case 401:
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
        break;
      case 500:
        this.alertService.apiResponseAlert(error.error.message,"error")
        break;
      default:
        console.log(error);
        break;
    }
    return throwError(error);
  }
}
