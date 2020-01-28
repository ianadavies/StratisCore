import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SmartContractCode, SmartContractsContractItem, SmartContractsService } from '../../smart-contracts.service';
import { Animations } from '@shared/animations/animations';

@Component({
  selector: 'app-contract-editor',
  templateUrl: './contract-editor.component.html',
  styleUrls: ['./contract-editor.component.scss'],
  animations: Animations.fadeIn
})
export class ContractEditorComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public smartContract = new BehaviorSubject<SmartContractCode>(null);
  public smartContracts: Observable<SmartContractsContractItem[]>;
  public selectedContract: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private smartContractsService: SmartContractsService) {

    this.smartContracts = this.smartContractsService.GetContracts();
    this.subscriptions.push(activatedRoute.params.subscribe(params => {
      if (params.address) {
        this.getCode(params.address);
      }
    }));
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public selectContract(address: string): void {
    this.getCode(address);
  }

  private getCode(address: string): Promise<SmartContractCode> {
    this.smartContract.next(null);
    return this.smartContractsService.GetCode(address).toPromise().then(r => {
      this.smartContract.next(r);
      this.selectedContract = address;
      return r;
    });
  }
}
