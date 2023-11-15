import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from '../shared/services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            // Handle unauthorized access
            this.messageService.showError(error.error.error)
            console.error('Unauthorized access:', error);
          } else if (error.status === 404) {
            // Handle not found error
            this.messageService.showError('Resource not found')
            console.error('Resource not found:', error);
          }else if (error.status === 400) {
            // Handle user error
            this.messageService.showError(error.error.error)
            console.error('User error', error);
          } else {
            // Handle other HTTP errors
            console.error('HTTP error occurred:', error);
          }
        } else {
          // Handle other errors
          console.error('An error occurred:', error);
        }

        // Pass the error to the calling code
        return throwError(error);
      })
    );
  }
}
