import { async, TestBed } from '@angular/core/testing';
import { DataAccessTicketsModule } from './data-access-tickets.module';

describe('DataAccessTicketsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataAccessTicketsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataAccessTicketsModule).toBeDefined();
  });
});
