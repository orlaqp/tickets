import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { TicketsState, Ticket, FetchTicketsAction } from '@tickets/data-access-tickets';
import { Observable } from 'rxjs';

@Component({
  selector: 'tickets-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  @Select(TicketsState.tickets)
  tickets$: Observable<Ticket>;
  
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new FetchTicketsAction());
  }

}
