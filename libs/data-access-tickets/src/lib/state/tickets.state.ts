import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

import { BackendService } from '../services/backend.service';
import { Ticket, User } from '../types';
import {
    AssignTicketAction,
    CompleteTicketAction,
    DeselectTicketAction,
    FetchTicketsAction,
    FetchUsersAction,
    NewTicketAction,
    SelectTicketAction,
} from './tickets.actions';
import { NgZone } from '@angular/core';

export interface TicketsStateModel {
  tickets: Ticket[];
  users: User[];
  selectedTicket: Ticket;
}

@State<TicketsStateModel>({
  name: 'tickets',
  defaults: {
    tickets: undefined,
    users: undefined,
    selectedTicket: undefined,
  }
})
export class TicketsState {
  constructor(private backendService: BackendService, private router: Router, private zone: NgZone, private snackBar: MatSnackBar) {}

  @Selector()
  public static tickets(state: TicketsStateModel): Ticket[] {
    return state.tickets;
  }

  @Selector()
  public static users(state: TicketsStateModel): User[] {
    return state.users;
  }

  @Selector()
  public static selectedTicket(state: TicketsStateModel) {
      return state.selectedTicket;
  }

  @Action(FetchTicketsAction)
  private fetchTickets({ patchState }: StateContext<TicketsStateModel>) {
      return this.backendService.tickets().pipe(
        tap(tickets => patchState({ tickets: tickets.map(t => Object.assign({}, t)) }))
      )
  }

  @Action(FetchUsersAction)
  private fetchUsers({ patchState }: StateContext<TicketsStateModel>) {
      return this.backendService.users().pipe(
          tap(users => patchState({ users: [...users] }))
      )
  }

  @Action(NewTicketAction)
  private createTicket({ dispatch }: StateContext<TicketsStateModel>, { payload }: NewTicketAction) {
      return this.backendService.newTicket(payload).pipe(
          tap(() => {
              dispatch(new FetchTicketsAction())
            })
      )
  }

  @Action(SelectTicketAction)
  private fetchTicket({ patchState }: StateContext<TicketsStateModel>, { id }: SelectTicketAction) {
      return this.backendService.ticket(id).pipe(
          tap(ticket => {
              if (!ticket) {
                  this.snackBar.open(`Ticket id: ${id} was not found`, 'Ok', {
                    duration: 2000,
                  });
                  this.zone.run(() => this.router.navigateByUrl(''));
              } else {
                  patchState({ selectedTicket: { ...ticket } });
              }
            })
      )
  }

  @Action(DeselectTicketAction)
  private deselectTicket({ patchState }: StateContext<TicketsStateModel>) {
      patchState({  selectedTicket: undefined });
  }

  @Action(AssignTicketAction)
  private assignTicket({ patchState }: StateContext<TicketsStateModel>, {  ticketId, userId }: AssignTicketAction) {
      return this.backendService.assign(ticketId, userId).pipe(
          map(t => Object.assign({}, t))
      );
  }

  @Action(CompleteTicketAction)
  private completeTicket({ patchState }: StateContext<TicketsStateModel>, { ticketId, complete }: CompleteTicketAction) {
      return this.backendService.complete(ticketId, complete).pipe(
          map(t => Object.assign({}, t))
      );
  }

}
