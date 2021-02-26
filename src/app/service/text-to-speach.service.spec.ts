import { TestBed } from '@angular/core/testing';

import { TextToSpeachService } from './text-to-speach.service';

describe('TextToSpeachService', () => {
  let service: TextToSpeachService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextToSpeachService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
