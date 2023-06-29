/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExportPDFService } from './exportPDF.service';

describe('Service: ExportPDF', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportPDFService]
    });
  });

  it('should ...', inject([ExportPDFService], (service: ExportPDFService) => {
    expect(service).toBeTruthy();
  }));
});
