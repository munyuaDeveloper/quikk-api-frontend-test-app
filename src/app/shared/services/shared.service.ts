import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  baseUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  getRequest(url: string) {
    return this.http.get(`${this.baseUrl}${url}`)
  }

  postRequest(url: string, payload: any) {
    return this.http.post(`${this.baseUrl}${url}`, payload)
  }
  putRequest(url: string, id: string, payload: any) {
    return this.http.put(`${this.baseUrl}${url}/${id}`, payload)
  }
  deleteRequest(url: string, id: string) {
    return this.http.delete(`${this.baseUrl}${url}/${id}`)
  }
}
