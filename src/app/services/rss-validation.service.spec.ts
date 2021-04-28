import { TestBed } from '@angular/core/testing';

import { RssValidationService } from './rss-validation.service';

describe('RssValidationService', () => {
  let service: RssValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RssValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
