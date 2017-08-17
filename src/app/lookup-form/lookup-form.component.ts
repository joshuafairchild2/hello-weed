import { Component, OnInit } from '@angular/core';
import { CannabisReportService } from './../cannabis-report.service';

@Component({
  selector: 'app-lookup-form',
  templateUrl: './lookup-form.component.html',
  styleUrls: ['./lookup-form.component.sass']
})
export class LookupFormComponent implements OnInit {
  searches: any[] = [];

  constructor(public cannabisService: CannabisReportService) { }

  ngOnInit() {
  }

  searchStrains(query: string): void {
    this.cannabisService.searchStrains(query)
      .subscribe(res => this.searches = res.json().data)
  }

}
