import { TemplatesEntity } from './templates.models';
import { templatesAdapter, TemplatesPartialState, initialTemplatesState } from './templates.reducer';
import * as TemplatesSelectors from './templates.selectors';

describe('Templates Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTemplatesId = (it: TemplatesEntity) => it.id;
  const createTemplatesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as TemplatesEntity);

  let state: TemplatesPartialState;

  beforeEach(() => {
    state = {
      templates: templatesAdapter.setAll(
        [createTemplatesEntity('PRODUCT-AAA'), createTemplatesEntity('PRODUCT-BBB'), createTemplatesEntity('PRODUCT-CCC')],
        {
          ...initialTemplatesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Templates Selectors', () => {
    it('selectAllTemplates() should return the list of Templates', () => {
      const results = TemplatesSelectors.selectAllTemplates(state);
      const selId = getTemplatesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TemplatesSelectors.selectEntity(state) as TemplatesEntity;
      const selId = getTemplatesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTemplatesLoaded() should return the current "loaded" status', () => {
      const result = TemplatesSelectors.selectTemplatesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTemplatesError() should return the current "error" state', () => {
      const result = TemplatesSelectors.selectTemplatesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
