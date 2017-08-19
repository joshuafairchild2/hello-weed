import { TestBed, inject } from '@angular/core/testing';

import { CannabisReportService } from './cannabis-report.service';

describe('CannabisReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CannabisReportService]
    });
  });

  it('should ...', inject([CannabisReportService], (service: CannabisReportService) => {
    expect(service).toBeTruthy();
  }));
});
