import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { StrainEffects } from './../models/strain-effects.model';
import { Strain } from './../models/strain.model';
import { StrainReview } from './../models/strain-review.model';
import { StrainResult } from './../models/strain-result.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

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

  getStrainEffects(ucpc: string): Observable<any> {
    const url = `${this.strainDetailsEndpoint}${ucpc}/effectsFlavors`;
    return this.http.get(url)
      .map(res => res.json().data as StrainEffects);
  }

  getRawStrainInfo(ucpc: string): Observable<any> {
    const url = `${this.strainDetailsEndpoint}${ucpc}`;
    return this.http.get(url)
      .map(res => res.json().data)
  }

  getStrainDetails(ucpc: string): Observable<Strain> {
    const strainResponse: Observable<any> = this.getRawStrainInfo(ucpc);

    // const reviewsResponse: Observable<any> =
    //   strainResponse
    //     .mergeMap(res => this.http.get(res.reviews.link))
    //     .map(res => {
    //       return res.json().data
    //         .map(review => this.http.get(review.link));
    //     });


    // const reviewEffects =
      // reviewsResponse
        // .map(reviewData => reviewData.json().data)
        // .map(r => {
          // return new StrainEffects(
          //   r.euphoria, r.creativity, r.calming,
          //   r.numbness, r.appetite_gain, r.dry_mouth,
          //   r.fruity, r.spicy, r.earthy, r.sour,
          //   r.sweet, r.pine, r.anxiety
          // );
        // });

    // const strainReviews =
    //   reviewsResponse
    //     .map(reviews => reviews.map(review => review.json().data))
    //     .map(r => {
    //       console.log(r)
    //       // return new StrainReview()
    //     });


    // reviewsResponse.subscribe(x => console.log(x))



    return strainResponse
      .mergeMap((res: any): Observable<StrainEffects> => this.getStrainEffects(res.ucpc))
      .mergeMap((effects: StrainEffects): Observable<Strain> =>  this.generateStrainDetailModel(strainResponse, effects));
  }

  generateStrainDetailModel(details: Observable<any>, effects: StrainEffects): Observable<Strain> {
    return details.map((res: any): Strain => new Strain(res.image, res.name, res.seedCompany.name, res.ucpc, effects, res.lineage));
  }

  generateStrainResultModels(apiResponse: any): StrainResult[] {
    return apiResponse.data.map(s => {
      return new StrainResult(
        s.image,
        s.name,
        s.seedCompany.name,
        s.ucpc,
        s.genetics.names,
        s.reviews.count
      );
    });
  }
}
