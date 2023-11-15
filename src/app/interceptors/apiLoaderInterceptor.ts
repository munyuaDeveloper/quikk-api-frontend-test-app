import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ApiLLoadrInterceptor implements HttpInterceptor {

     constructor(private spinner: NgxSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinner.show();

        return next.handle(req)
             .pipe(tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        this.spinner.hide();
                    }
                }, (error) => {
                    this.spinner.hide();
                }));
    }
}