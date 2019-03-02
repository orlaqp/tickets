import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFormComponent } from './ticket-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { NgxsModule, Store, Actions } from '@ngxs/store';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

class FakeStore {
    dispatch = jest.fn();
}

const FakeActions = new Subject();

describe('TicketFormComponent', () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            ReactiveFormsModule,
            MatFormFieldModule,
            MatSelectModule,
            MatCheckboxModule,
            MatInputModule,
            RouterTestingModule,
            BrowserAnimationsModule
        ],
      declarations: [ TicketFormComponent ],
      providers: [
          { provide: Store, useClass: FakeStore },
          { provide: Actions, useValue: FakeActions },
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form field for description', () => {
      expect(component.fg.controls['description']).toBeTruthy();
  });

  it('should not try to save ticket if description is missing', () => {
    component.save();
    const store = TestBed.get(Store);
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should try to save the ticket if description is present', () => {
      component.fg.controls['description'].setValue('Ticket description');
      component.save();
      const store = TestBed.get(Store);
      expect(store.dispatch).toHaveBeenCalled();
  });
});
