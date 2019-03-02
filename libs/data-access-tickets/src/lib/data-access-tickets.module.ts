import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from './services/backend.service';
import { NgxsModule } from '@ngxs/store';
import { TicketsState } from './state';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([TicketsState]), MatSnackBarModule],
  providers: [BackendService]
})
export class DataAccessTicketsModule {}
