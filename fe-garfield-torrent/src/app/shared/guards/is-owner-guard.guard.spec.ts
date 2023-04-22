import { TestBed } from '@angular/core/testing';

import { IsOwnerGuardGuard } from './is-owner-guard.guard';

describe('IsOwnerGuardGuard', () => {
  let guard: IsOwnerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsOwnerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
