import { Component, OnInit } from '@angular/core';
import { CannabisReportService } from './../cannabis-report.service';
import { StrainResult } from './../models/strain-result.model';

@Component({
  selector: 'app-lookup-form',
  templateUrl: './lookup-form.component.html',
  styleUrls: ['./lookup-form.component.sass']
})
export class LookupFormComponent implements OnInit {
  searchResults: any[] = null;

  constructor(public cannabisService: CannabisReportService) { }

  ngOnInit() {
  }

  searchStrains(query: string): void {
    this.cannabisService.searchStrains(query)
      .subscribe(data => {
        this.searchResults = data.map(strain => {
          const s = strain;
          return new StrainResult(
            s.image,
            s.name,
            s.seedCompany.name,
            s.ucpc,
            s.genetics.names,
            s.reviews.count
          );
        });

        console.log(this.searchResults);
      });
  }

}
