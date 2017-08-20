import { Component, OnInit } from '@angular/core';
import { CannabisReportService } from './../services/cannabis-report.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-strain-details',
  templateUrl: './strain-details.component.html',
  styleUrls: ['./strain-details.component.sass']
})
export class StrainDetailsComponent implements OnInit {
  selectedStrainUcpc: string = null;
  selectedStrain: object = null;

  constructor(
    public cannabisService: CannabisReportService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.selectedStrainUcpc = params['id'];

      this.cannabisService.getStrainDetails(this.selectedStrainUcpc)
        .subscribe(data => this.selectedStrain = data.data);
    });
  }

}
