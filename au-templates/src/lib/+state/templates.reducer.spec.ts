import { Action } from '@ngrx/store';

import * as TemplatesActions from './templates.actions';
import { TemplatesEntity } from './templates.models';
import { TemplatesState, initialTemplatesState, templatesReducer } from './templates.reducer';

describe('Templates Reducer', () => {
  const createTemplatesEntity = (id: string, name = ''): TemplatesEntity => ({
    id,
    name: name || `name-${id}`
  });

  describe('valid Templates actions', () => {
    it('loadTemplatesSuccess should return the list of known Templates', () => {
      const templates = [createTemplatesEntity('PRODUCT-AAA'), createTemplatesEntity('PRODUCT-zzz')];
      const action = TemplatesActions.loadTemplatesSuccess({ templates });

      const result: TemplatesState = templatesReducer(initialTemplatesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = templatesReducer(initialTemplatesState, action);

      expect(result).toBe(initialTemplatesState);
    });
  });
});
