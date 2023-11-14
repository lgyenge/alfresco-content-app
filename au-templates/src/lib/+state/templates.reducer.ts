/*!
 * Copyright © 2005-2023 Hyland Software, Inc. and its affiliates. All rights reserved.
 *
 * Alfresco Example Content Application
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail. Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * from Hyland Software. If not, see <http://www.gnu.org/licenses/>.
 */

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TemplatesActions from './templates.actions';
import { TemplatesEntity } from './templates.models';

export const TEMPLATES_FEATURE_KEY = 'templates';

export interface TemplatesState extends EntityState<TemplatesEntity> {
  selectedId?: string | number; // which Templates record has been selected
  loaded: boolean; // has the Templates list been loaded
  error?: string | null; // last known error (if any)
}

export interface TemplatesPartialState {
  readonly [TEMPLATES_FEATURE_KEY]: TemplatesState;
}

export const templatesAdapter: EntityAdapter<TemplatesEntity> = createEntityAdapter<TemplatesEntity>();

export const initialTemplatesState: TemplatesState = templatesAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const reducer = createReducer(
  initialTemplatesState,
  on(TemplatesActions.initTemplates, (state) => ({ ...state, loaded: false, error: null })),
  on(TemplatesActions.loadTemplatesSuccess, (state, { templates }) => templatesAdapter.setAll(templates, { ...state, loaded: true })),
  on(TemplatesActions.loadTemplatesFailure, (state, { error }) => ({ ...state, error }))
);

export function templatesReducer(state: TemplatesState | undefined, action: Action) {
  return reducer(state, action);
}
