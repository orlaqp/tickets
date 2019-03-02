import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from './services/backend.service';
import { NgxsModule } from '@ngxs/store';
import { TicketsState } from './state';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([TicketsState])],
  providers: [BackendService]
})
export class DataAccessTicketsModule {}
