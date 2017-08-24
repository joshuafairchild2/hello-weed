import { Component, OnInit } from '@angular/core';
import { CannabisReportService } from './../services/cannabis-report.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StrainData } from './../models/strain-data.model';
import { StrainEffectData } from './../models/strain-effect-data.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-strain-details',
  templateUrl: './strain-details.component.html',
  styleUrls: ['./strain-details.component.sass']
})
export class StrainDetailsComponent implements OnInit {
  public selectedStrain: StrainData = null;

  constructor(
    private cannabisService: CannabisReportService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const strainObservable =
      this.route.params
        .map(params => params['ucpc'])
        .map(id => this.cannabisService.getStrainDetails(id))
        .mergeMap(response => this.reformatDetailResponse(response));


    strainObservable.subscribe((strainModel: StrainData): void => {
      this.selectedStrain = strainModel;
      console.log(strainModel);
    });
  }

  reformatDetailResponse(strainDetailResponse: Observable<any>): Observable<StrainData> {
    return strainDetailResponse
              .mergeMap((res: any): Observable<StrainEffectData> => this.cannabisService.getStrainEffects(res.ucpc))
              .mergeMap((effects: StrainEffectData): Observable<StrainData> => this.generateStrainDetailModel(strainDetailResponse, effects));
  }

  generateStrainDetailModel(details: Observable<any>, effects: StrainEffectData): Observable<StrainData> {
    return details.map((res: any): StrainData => new StrainData(res.image, res.name, res.seedCompany.name, res.ucpc, effects));
  }
}
