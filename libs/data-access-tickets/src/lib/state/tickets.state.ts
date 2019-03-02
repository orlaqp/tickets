import { State, Action, Selector, StateContext } from '@ngxs/store';
import { FetchTicketsAction } from './tickets.actions';
import { Ticket } from '../types';
import { BackendService } from '../services/backend.service';
import { tap } from 'rxjs/operators';

export interface TicketsStateModel {
  tickets: Ticket[];
}

@State<TicketsStateModel>({
  name: 'tickets',
  defaults: {
    tickets: undefined
  }
})
export class TicketsState {
  constructor(private backendService: BackendService) {}

  @Selector()
  public static tickets(state: TicketsStateModel) {
    return state.tickets;
  }

  @Action(FetchTicketsAction)
  public fetchTickets({ patchState }: StateContext<TicketsStateModel>) {
      return this.backendService.tickets().pipe(
        tap(tickets => patchState({ tickets }))
      )
  }
}
