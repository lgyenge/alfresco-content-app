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

import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import * as TemplatesActions from './templates.actions';
// import * as TemplatesFeature from './templates.reducer';
import { NodesApiService } from '@alfresco/adf-content-services';
// import { NodePaging } from '@alfresco/js-api'
// import { AbstractControl } from '@angular/forms';


@Injectable()
export class TemplatesEffects {
  private actions$ = inject(Actions);
  private nodesApi = inject(NodesApiService);
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TemplatesActions.initTemplates),
      // switchMap(() => of(TemplatesActions.loadTemplatesSuccess({ templates: [] }))),
      switchMap(() =>
        this.nodesApi.getNodeChildren('-my').pipe(
          switchMap(() => of(TemplatesActions.loadTemplatesSuccess({ templates: [] }))),
          catchError((error) => {
            console.error('Error', error);
            return of(TemplatesActions.loadTemplatesFailure({ error }));
          })
        )
      )
    )
  );
}
