import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { TicketsState, TicketsStateModel } from './tickets.state';
import { TicketsAction } from './tickets.actions';

describe('Tickets store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TicketsState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: TicketsStateModel = {
      items: ['item-1']
    };
    store.dispatch(new TicketsAction('item-1'));
    const actual = store.selectSnapshot(TicketsState.getState);
    expect(actual).toEqual(expected);
  });

});
