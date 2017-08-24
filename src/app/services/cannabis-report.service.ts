import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { StrainEffectData } from './../models/strain-effect-data.model';

import 'rxjs/add/operator/map';

@Injectable()
export class CannabisReportService {

  public searchEndpoint = 'https://www.cannabisreports.com/api/v1.0/strains/search/'; //  /strain_name
  public strainDetailsEndpoint = `https://www.cannabisreports.com/api/v1.0/strains/`; //  /ucpc

  constructor(private http: Http) { }

  searchStrains(query: string): Observable<any> {
    const url = `${this.searchEndpoint}${query}`;
    return this.http.get(url)
      .map(res => res.json());
  }

  getStrainDetails(ucpc: string): Observable<any> {
    const url = `${this.strainDetailsEndpoint}${ucpc}`;
    return this.http.get(url)
      .map(res => res.json().data);
  }

  getStrainEffects(ucpc: string): Observable<any> {
    const url = `${this.strainDetailsEndpoint}${ucpc}/effectsFlavors`;
    return this.http.get(url)
      .map(res => res.json().data as StrainEffectData);
  }
}
