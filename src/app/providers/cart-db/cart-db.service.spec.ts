import { TestBed } from '@angular/core/testing';

import { CartDbService } from './cart-db.service';

describe('CartDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartDbService = TestBed.get(CartDbService);
    expect(service).toBeTruthy();
  });
});
