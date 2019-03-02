import { Ticket } from '../types';

export class FetchTicketsAction {
    static readonly type = '[Tickets] Fetch Tickets';
}
export class FetchUsersAction {
    static readonly type = '[Tickets] Fetch Users';
}

export class NewTicketAction {
    static readonly type = '[Tickets] Create Ticket';
    constructor(public payload: { description: string }) {}
}

export class FetchTicketAction {
    static readonly type = '[Tickets] Fetch Ticket';
    constructor(public id: string) {}
}