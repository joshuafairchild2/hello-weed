import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class CannabisReportService {

  private searchEndpoint = 'https://www.cannabisreports.com/api/v1.0/strains/search/';

  constructor(private http: Http) { }

  searchStrains(query: string): Observable<any> {
    const url = `${this.searchEndpoint}${query}`;
    return this.http.get(url)
      .map(res => res.json().data);
  }

}
