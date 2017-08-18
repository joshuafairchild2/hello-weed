import { Component, OnInit } from '@angular/core';
import { CannabisReportService } from './../cannabis-report.service';
import { StrainResult } from './../models/strain-result.model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-lookup-form',
  templateUrl: './lookup-form.component.html',
  styleUrls: ['./lookup-form.component.sass']
})
export class LookupFormComponent implements OnInit {
  searchResults: any[] = null;
  currentPage: number = null;
  searchedStrainEndpoint: string = null;

  constructor(
    public cannabisService: CannabisReportService,
    public http: Http
  ) { }

  ngOnInit() {
  }

  searchStrains(query: string): void {
    this.searchedStrainEndpoint = `${this.cannabisService.searchEndpoint}${query}`;
    this.currentPage = 1;
    this.cannabisService.searchStrains(query)
      .subscribe(data => {
        this.searchResults = this.generateStrainModels(data);
      });
  }

  changePages(pageNumber: number): void {
    const url = `${this.searchedStrainEndpoint}/?page=${pageNumber}`;
    this.currentPage = pageNumber;
    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
         this.searchResults = this.generateStrainModels(data);
      });
  }

  generateStrainModels(apiResponse: any): StrainResult[] {
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
