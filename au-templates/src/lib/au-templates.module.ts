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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ExtensionService, provideExtensionConfig } from '@alfresco/adf-extensions';
import { CoreModule, MaterialModule, TRANSLATION_PROVIDER, AuthGuardEcm, SidenavLayoutComponent } from '@alfresco/adf-core';
import { AuTemplatesService } from './services/au-templates.service';
import { AuTemplateItemsComponent } from './components/au-template-items/au-template-items.component';
import { AuTemplatesComponent } from './components/au-templates/au-templates.component';
import { ShellLayoutComponent } from '@alfresco/adf-core/shell';
import { InMemoryDataService } from './au.db';

export function components() {
  return [AuTemplatesComponent];
}

export const AU_TEMPLATES_ROUTES: Routes = [
  {
    path: 'templates',
    component: ShellLayoutComponent,
    canActivate: [AuthGuardEcm],
    children: [
      {
        path: '',
        component: AuTemplatesComponent,
        data: {
          title: 'Ügyfelek',
          icon: 'folder',
          defaultNodeId: '-my-'
        }
      }
    ],
    canActivateChild: [AuthGuardEcm]
  },
  {
    path: 'templates/:folderId',
    component: ShellLayoutComponent,
    canActivate: [AuthGuardEcm],
    children: [
      {
        path: '',
        component: AuTemplateItemsComponent,
        data: {
          title: 'Ügyfél',
          icon: 'folder',
          defaultNodeId: '-my-'
        }
      }
    ],
    canActivateChild: [AuthGuardEcm]
  }
];

@NgModule({
  declarations: [AuTemplateItemsComponent],
  imports: [
    CoreModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    RouterModule.forChild(AU_TEMPLATES_ROUTES),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { delay: 100 })
  ],
  providers: [
    {
      provide: TRANSLATION_PROVIDER,
      multi: true,
      useValue: {
        name: 'adf-au-templates',
        source: 'assets/adf-au-templates'
      }
    },
    AuTemplatesService,
    /* provideExtensionConfig(['au-templates.json']) */
    provideExtensionConfig(['../../assets/au-templates.json'])
  ],
  exports: [AuTemplateItemsComponent]
  /* exports: components(), */
  /* declarations: components() */
})
export class AuTemplatesModule {
  constructor(extensions: ExtensionService) {
    extensions.setComponents({
      'au-templates.main.component': AuTemplatesComponent,
      'au-templates.main': ShellLayoutComponent,
      'au-templates.sidenav': SidenavLayoutComponent
    });
  }
}
