import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

import { BackendService } from '../services/backend.service';
import { Ticket } from '../types';
import { FetchTicketsAction } from './tickets.actions';
import { TicketsState } from './tickets.state';
import { MatSnackBarModule } from '@angular/material';

// import { TicketsAction } from './tickets.actions';
const tickets: Ticket[] = [
  { id: 1, description: 'Ticket 1', assigneeId: 101, completed: false },
  { id: 2, description: 'Ticket 2', assigneeId: 102, completed: true }
];

class FakeBackendService {
  tickets = jest.fn().mockReturnValue(of(tickets));
}

describe('Tickets store', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([TicketsState]),
        MatSnackBarModule
      ],
      providers: [{ provide: BackendService, useClass: FakeBackendService }]
    }).compileComponents();

    store = TestBed.get(Store);
  }));

  it('should fetch tickets', () => {
    store.dispatch(new FetchTicketsAction());
    const actual = store.selectSnapshot(TicketsState.tickets);
    expect(actual[0]).toMatchObject(tickets[0]);
    expect(actual[1]).toMatchObject(tickets[1]);
  });

  // Others test such as: NewTicket, SelectTicketAssignTicket, etc, etc ...

});
