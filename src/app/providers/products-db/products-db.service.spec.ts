import { TestBed } from '@angular/core/testing';

import { ProductsDbService } from './products-db.service';

describe('ProductsDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsDbService = TestBed.get(ProductsDbService);
    expect(service).toBeTruthy();
  });
});
