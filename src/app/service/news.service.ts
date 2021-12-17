import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  GetAllValue(): Observable<any> {
    return this.http.get<any>('https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/brief/News');
  }
  GetNewsByid(id: number): Observable<any> {
    return this.http.get<any>(`https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/brief/News?Newsid=${id}`);
  }
}
