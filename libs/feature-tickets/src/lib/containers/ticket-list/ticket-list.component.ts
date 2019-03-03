import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FetchTicketsAction, Ticket, TicketsState } from '@tickets/data-access-tickets';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'tickets-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

    @Select(TicketsState.tickets)
    tickets$: Observable<Ticket>;

    query = new FormControl();

    private querySub: Subscription;
    
    constructor(private store: Store) {}
  
    ngOnInit() {
      this.store.dispatch(new FetchTicketsAction(this.query.value));

      this.querySub = this.query.valueChanges
        .pipe(
            debounceTime(500),
            tap(q => this.store.dispatch(new FetchTicketsAction(q)))
        )
        .subscribe();
    }

    ngOnDestroy() {
        this.querySub.unsubscribe();
    }
  
}
