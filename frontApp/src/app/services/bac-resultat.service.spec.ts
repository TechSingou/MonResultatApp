import { TestBed } from '@angular/core/testing';

import { BacResultatService } from './bac-resultat.service';

describe('BacResultatService', () => {
  let service: BacResultatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BacResultatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
