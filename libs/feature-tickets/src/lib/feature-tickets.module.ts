import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatSlideToggleModule, MatCheckboxModule, MatInputModule, MatSelectModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { DataAccessTicketsModule } from '@tickets/data-access-tickets';


import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketFormComponent } from './containers/ticket-form/ticket-form.component';
import { TicketsComponent } from './containers/tickets/tickets.component';
import { TicketShowComponent } from './containers/ticket-show/ticket-show.component';

export const featureTicketsRoutes: Route[] = [
  {
    path: '',
    component: TicketsComponent,
    children: [
        { path: '', component: TicketListComponent },
        { path: 'new', component: TicketFormComponent },
        { path: ':id', component: TicketShowComponent },
    ]
  }
];

const materialModules = [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule
]

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(featureTicketsRoutes),
    ReactiveFormsModule,
    ...materialModules,
    DataAccessTicketsModule
  ],
  declarations: [TicketsComponent, TicketListComponent, TicketFormComponent, TicketShowComponent]
})
export class FeatureTicketsModule {}
