import { TestBed } from '@angular/core/testing';

import { UserDbService } from './user-db.service';

describe('UserDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDbService = TestBed.get(UserDbService);
    expect(service).toBeTruthy();
  });
});
