import { Component, OnInit } from '@angular/core';
import { CannabisReportService } from './../services/cannabis-report.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Strain } from './../models/strain.model';
import { StrainEffects } from './../models/strain-effects.model';
import { StrainReview } from './../models/strain-review.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-strain-details',
  templateUrl: './strain-details.component.html',
  styleUrls: ['./strain-details.component.sass']
})
export class StrainDetailsComponent implements OnInit {
  public selectedStrain: Strain = null;

  constructor(
    private cannabisService: CannabisReportService,
    private route: ActivatedRoute,
    private http: Http
  ) { }

  ngOnInit(): void {
    const strainObservable =
      this.route.params
        .map(params => params['ucpc'])
        .mergeMap(id => this.cannabisService.getStrainDetails(id))


    strainObservable.subscribe((strainModel: Strain) => {
      this.selectedStrain = strainModel;
      console.log(this.selectedStrain);
    });
  }
}
