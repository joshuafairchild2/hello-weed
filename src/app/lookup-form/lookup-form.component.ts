import { Component, OnInit } from '@angular/core';
import { CannabisReportService } from './../services/cannabis-report.service';
import { StrainResult } from './../models/strain-result.model';
import { Http } from '@angular/http';

@Component({
  selector: 'app-lookup-form',
  templateUrl: './lookup-form.component.html',
  styleUrls: ['./lookup-form.component.sass']
})
export class LookupFormComponent implements OnInit {
  searchResults: any[] = null;
  currentPageNumber: number = null;
  searchedStrainEndpoint: string = null;
  savedSearchResults: object = {};
  pageArray: number[] = Array.from(new Array(10), (val,index) => index + 1); // used in the frontend to allow an ngFor to loop only 10 times

  constructor(
    public cannabisService: CannabisReportService,
    public http: Http
  ) { }

  ngOnInit() {
  }

  searchStrains(query: string): void {
    this.currentPageNumber = 1;
    this.searchedStrainEndpoint = `${this.cannabisService.searchEndpoint}${query}`;
    this.cannabisService.searchStrains(query)
      .subscribe(data => {
        this.searchResults = this.generateStrainModels(data);
        this.savedSearchResults[1] = this.searchResults;
      });
  }

  changePages(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
    const url = `${this.searchedStrainEndpoint}/?page=${pageNumber}`;
    if (this.savedSearchResults[pageNumber]) {
      this.searchResults = this.savedSearchResults[pageNumber];
    } else {
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
           this.searchResults = this.generateStrainModels(data);
           this.savedSearchResults[pageNumber] = this.searchResults;
        });
    }
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
