import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { TicketsComponent } from './containers/tickets/tickets.component';
import { DataAccessTicketsModule } from '@tickets/data-access-tickets';

export const featureTicketsRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, DataAccessTicketsModule],
  declarations: [TicketsComponent]
})
export class FeatureTicketsModule {}
