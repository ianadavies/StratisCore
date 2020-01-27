import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SmartContractsService } from './smart-contracts.service';
import { SmartContractsComponent } from './components/smart-contracts.component';
import { TransactionComponent } from './components/modals/transaction/transaction.component';
import { AddNewAddressComponent } from '../address-book/modals/add-new-address/add-new-address.component';
import { SharedModule } from '@shared/shared.module';
import { ScBalanceComponent } from './components/balance/balance.component';
import { ContractTypePipe } from './components/contract-type.pipe';
import { AddressSelectionComponent } from './components/address-selection/address-selection.component';
import { SmartContractsServiceBase } from './smart-contracts-service.base';
import { ContractEditorComponent } from './components/contract-editor/contract-editor.component';
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor';
import MonacoConfig from '@shared/monaco-config';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  imports: [
    CommonModule,
    NgbModalModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HighlightModule,
    MonacoEditorModule.forRoot()
  ],


  providers: [
    {
      provide: SmartContractsServiceBase, useClass: SmartContractsService
    },
    {
      provide: NGX_MONACO_EDITOR_CONFIG, useValue: MonacoConfig
    }
  ],
  exports: [
    ScBalanceComponent
  ],
  declarations: [
    SmartContractsComponent,
    TransactionComponent,
    ScBalanceComponent,
    ContractTypePipe,
    AddressSelectionComponent,
    ContractEditorComponent,

  ],

  entryComponents: [
    TransactionComponent, AddNewAddressComponent
  ]
})
export class SmartContractsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SmartContractsModule,
      providers: [
        {provide: SmartContractsServiceBase, useClass: SmartContractsService}
      ]
    };
  }
}
