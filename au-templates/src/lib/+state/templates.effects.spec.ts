import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TemplatesActions from './templates.actions';
import { TemplatesEffects } from './templates.effects';

describe('TemplatesEffects', () => {
  let actions: Observable<Action>;
  let effects: TemplatesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [TemplatesEffects, provideMockActions(() => actions), provideMockStore()]
    });

    effects = TestBed.inject(TemplatesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TemplatesActions.initTemplates() });

      const expected = hot('-a-|', { a: TemplatesActions.loadTemplatesSuccess({ templates: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
