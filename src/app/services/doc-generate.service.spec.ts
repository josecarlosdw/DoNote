import { TestBed } from '@angular/core/testing';

import { DocGenerateService } from './doc-generate.service';

describe('DocGenerateService', () => {
  let service: DocGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
