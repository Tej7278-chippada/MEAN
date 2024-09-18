import { TestBed } from '@angular/core/testing';

import { SendCourierService } from './send-courier.service';

describe('SendCourierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendCourierService = TestBed.inject(SendCourierService);
    expect(service).toBeTruthy();
  });
});
