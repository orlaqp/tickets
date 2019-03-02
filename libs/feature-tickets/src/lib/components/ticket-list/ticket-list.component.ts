import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FetchTicketsAction, Ticket, TicketsState } from '@tickets/data-access-tickets';
import { Observable } from 'rxjs';

@Component({
  selector: 'tickets-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

    @Select(TicketsState.tickets)
    tickets$: Observable<Ticket>;
    
    constructor(private store: Store) {}
  
    ngOnInit() {
      this.store.dispatch(new FetchTicketsAction());
    }
  
}
