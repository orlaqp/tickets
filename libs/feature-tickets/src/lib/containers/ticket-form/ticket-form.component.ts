import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { NewTicketAction, TicketsState, User } from '@tickets/data-access-tickets';
import { Observable } from 'rxjs';

@Component({
  selector: 'tickets-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {
  @Select(TicketsState.users)
  users$: Observable<User>;

  fg: FormGroup;

  constructor(
    fb: FormBuilder,
    actions$: Actions,
    zone: NgZone,
    router: Router,
    private store: Store
  ) {
    this.fg = fb.group({
      description: new FormControl(undefined, Validators.required),
    });

    actions$.pipe(ofActionSuccessful(NewTicketAction)).subscribe(() => {
      zone.run(() => router.navigateByUrl(''));
    });
  }

  save() {
    if (!this.fg.valid) return;
    this.store.dispatch(new NewTicketAction(this.fg.value));
  }
}
