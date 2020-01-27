import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SmartContractCode, SmartContractsService } from '../../smart-contracts.service';
import { Animations } from '@shared/animations/animations';

@Component({
  selector: 'app-contract-editor',
  templateUrl: './contract-editor.component.html',
  styleUrls: ['./contract-editor.component.scss'],
  animations : Animations.fadeIn
})
export class ContractEditorComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private smartContract = new BehaviorSubject<SmartContractCode>(null);
  public code: string = 'test';
  public options: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private smartContractsService: SmartContractsService) {
    this.subscriptions.push(activatedRoute.params.subscribe(params => {
      if (params.address) {

        this.smartContractsService.GetCode(params.address).toPromise().then(r => {
          this.smartContract.next(r);

        });


      }
    }));
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
