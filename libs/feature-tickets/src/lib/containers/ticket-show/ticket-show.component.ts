import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Actions, Store } from '@ngxs/store';
import {
  FetchUsersAction,
  SelectTicketAction,
  Ticket,
  TicketsState,
  User,
  AssignTicketAction,
  CompleteTicketAction,
  DeselectTicketAction
} from '@tickets/data-access-tickets';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'tickets-ticket-show',
  templateUrl: './ticket-show.component.html',
  styleUrls: ['./ticket-show.component.scss']
})
export class TicketShowComponent implements OnInit, OnDestroy {
  ready$: Observable<boolean>;

  users: User[];
  ticket: Ticket;

  assigneeCtrl = new FormControl();
  completedCtrl = new FormControl();

  private subs: Subscription[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    actions$: Actions
  ) {
    store.dispatch(new FetchUsersAction());

    this.subs.push(this.assigneeCtrl.valueChanges.subscribe(a => {
      store.dispatch(new AssignTicketAction(this.ticket.id, +a));
    }));

    this.subs.push(this.completedCtrl.valueChanges.subscribe(c => {
      store.dispatch(new CompleteTicketAction(this.ticket.id, c));
    }));
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params =>
          this.store.dispatch(new SelectTicketAction(+params.get('id')))
        )
      )
      .subscribe();

    this.ready$ = combineLatest(
      this.store.select(TicketsState.selectedTicket),
      this.store.select(TicketsState.users)
    ).pipe(
      filter(([ticket, users]) => !!ticket && !!users),
      tap(([ticket, users]) => {
        this.users = users;
        this.ticket = ticket;
        this.assigneeCtrl.setValue(ticket.assigneeId ? ticket.assigneeId.toString() : null, {emitEvent: false});
        this.completedCtrl.setValue(ticket.completed, {emitEvent: false});
      }),
      map(() => true)
    );
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
    this.store.dispatch(new DeselectTicketAction());
  }
}
