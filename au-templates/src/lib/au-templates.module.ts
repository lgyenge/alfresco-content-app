import { NgModule } from '@angular/core';
import { AuTemplatesComponent } from './au-templates.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ExtensionService, provideExtensionConfig } from '@alfresco/adf-extensions';
import { CoreModule, MaterialModule, TRANSLATION_PROVIDER } from '@alfresco/adf-core';

import { AuTemplatesService } from './au-templates.service';

export function components() {
  return [AuTemplatesComponent];
}

@NgModule({
  //declarations: [AuTemplatesComponent],
  imports: [CoreModule, BrowserModule, FormsModule, MaterialModule],
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
  //exports: [AuTemplatesComponent],
  exports: components(),
  declarations: components()
})
export class AuTemplatesModule {
  constructor(extensions: ExtensionService) {
    extensions.setComponents({
      'au-templates.main.component': AuTemplatesComponent
    });
  }
}
