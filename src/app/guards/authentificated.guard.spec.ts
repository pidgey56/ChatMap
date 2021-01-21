import { TestBed } from '@angular/core/testing';

import { AuthentificatedGuard } from './authentificated.guard';

describe('AuthentificatedGuard', () => {
  let guard: AuthentificatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthentificatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
