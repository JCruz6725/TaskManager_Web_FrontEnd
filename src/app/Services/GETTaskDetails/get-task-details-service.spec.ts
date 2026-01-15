import { TestBed } from '@angular/core/testing';

import { GetTaskDetailsService } from './get-task-details-service';

describe('GetTaskDetailsService', () => {
  let service: GetTaskDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTaskDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
