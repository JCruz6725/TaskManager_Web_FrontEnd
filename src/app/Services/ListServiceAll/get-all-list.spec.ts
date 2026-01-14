import { TestBed } from '@angular/core/testing';

import { ListService } from './get-all-list';

describe('GetAllList', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
