import { async, TestBed } from '@angular/core/testing';
import { FeatureTicketsModule } from './feature-tickets.module';

describe('FeatureTicketsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureTicketsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureTicketsModule).toBeDefined();
  });
});
