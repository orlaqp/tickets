import { State, Action, Selector, StateContext } from '@ngxs/store';
import { FetchTicketsAction, FetchUsersAction, NewTicketAction, FetchTicketAction } from './tickets.actions';
import { Ticket, User } from '../types';
import { BackendService } from '../services/backend.service';
import { tap } from 'rxjs/operators';

export interface TicketsStateModel {
  tickets: Ticket[];
  users: User[];
}

@State<TicketsStateModel>({
  name: 'tickets',
  defaults: {
    tickets: undefined,
    users: undefined,
  }
})
export class TicketsState {
  constructor(private backendService: BackendService) {}

  @Selector()
  public static tickets(state: TicketsStateModel): Ticket[] {
    return state.tickets;
  }

  @Selector()
  public static users(state: TicketsStateModel): User[] {
    return state.users;
  }

  @Action(FetchTicketsAction)
  public fetchTickets({ patchState }: StateContext<TicketsStateModel>) {
      return this.backendService.tickets().pipe(
        tap(tickets => patchState({ tickets: [...tickets] }))
      )
  }

  @Action(FetchUsersAction)
  public fetchUsers({ patchState }: StateContext<TicketsStateModel>) {
      return this.backendService.users().pipe(
          tap(users => patchState({ users }))
      )
  }

  @Action(NewTicketAction)
  public createTicket({ dispatch }: StateContext<TicketsStateModel>, { payload }: NewTicketAction) {
      return this.backendService.newTicket(payload).pipe(
          tap(() => {
              dispatch(new FetchTicketsAction())
            })
      )
  }

}
