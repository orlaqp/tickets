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

export class SelectTicketAction {
    static readonly type = '[Tickets] Fetch Ticket';
    constructor(public id: number) {}
}

export class DeselectTicketAction {
    static readonly type = '[Tickets] Deselect Ticket';
}

export class AssignTicketAction {
    static readonly type = '[Tickets] Assign Ticket';
    constructor(public ticketId: number, public userId: number) {}
}

export class CompleteTicketAction {
    static readonly type = '[Tickets] Complete Ticket';
    constructor(public ticketId: number, public complete: boolean) {}
}