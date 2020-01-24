import { Injectable } from '@angular/core';
import { ApiService } from '@shared/services/api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalService } from '@shared/services/global.service';
import { ErrorService } from '@shared/services/error-service';
import { catchError, map } from 'rxjs/operators';
import { TokenBalanceRequest } from '../tokens/models/token-balance-request';
import { LocalExecutionResult } from '@shared/models/local-execution-result';
import { SmartContractsServiceBase } from './smart-contracts-service.base';
import { WalletInfo } from '@shared/models/wallet-info';
import { CurrentAccountService } from '@shared/services/current-account.service';
import { WalletService } from '@shared/services/wallet.service';

export class SmartContractsContractItem {
  constructor(
    public blockId: string, public type: string, public hash: string, public destinationAddress: string, public amount: number) {
  }
}

export enum ContractItemType {
  Received = 0,
  Sent = 1,
  Staked = 2,
  Call = 3,
  Create = 4,
  GasRefund = 5
}


export interface ContractTransactionItem {
  blockHeight: number;
  type: ContractItemType;
  hash: string;
  to: string;
  amount: number;
  transactionFee: number;
  gasFee: number;
}

@Injectable()
export class SmartContractsService extends ApiService implements SmartContractsServiceBase {
  private historySubject = new BehaviorSubject<ContractTransactionItem[]>([]);
  private currentWallet: WalletInfo;
  private lastBalance: number = null;
  private currentAddress: string;

  constructor(
    httpClient: HttpClient,
    globalService: GlobalService,
    walletService: WalletService,
    currentAccountService: CurrentAccountService,
    errorService: ErrorService) {
    super(httpClient, globalService, errorService);

    globalService.currentWallet.subscribe((wallet) => {
      this.currentWallet = wallet;
    });

    currentAccountService.currentAddress.subscribe(address => {
      this.currentAddress = address;
    });

    walletService.wallet().subscribe(wallet => {
      if (wallet && this.currentAddress && this.lastBalance !== (wallet.amountConfirmed + wallet.amountUnconfirmed)) {
        this.lastBalance = (wallet.amountConfirmed + wallet.amountUnconfirmed);
        this.GetHistoryFromApi(this.currentWallet.walletName, this.currentAddress);
      }
    });
  }

  public GetReceipt(hash: string, silent = false): Observable<string> {
    const params = new HttpParams().set('txHash', hash);
    return this.get<string>('smartcontracts/receipt', params).pipe(
      catchError(err => this.handleHttpError(err, silent))
    );
  }

  /// Setting the silent flag is not enough because the error format returned by
  /// receipt still causes a modal to be displayed.
  public GetReceiptSilent(hash: string): Observable<string> {
    const params = new HttpParams().set('txHash', hash);
    return this.get<string>('smartcontracts/receipt', params);
  }

  /// Get the active smart contract wallet address.
  public GetAddress(walletName: string): Observable<any> {
    const params = new HttpParams().set('walletName', walletName);
    return this.get('smartcontractwallet/account-address', params).pipe(
      catchError(err => this.handleHttpError(err))
    );
  }

  public GetAddresses(walletName: string): any {
    const params = new HttpParams().set('walletName', walletName);
    return this.get('smartcontractwallet/account-addresses', params).pipe(
      catchError(err => this.handleHttpError(err))
    );
  }

  /// Get the balance of the active smart contract address.
  public GetBalance(walletName: string): Observable<any> {
    const params = new HttpParams().set('walletName', walletName);
    return this.get('smartcontractwallet/account-balance', params).pipe(
      catchError(err => this.handleHttpError(err))
    );
  }

  /// Gets the transaction history of the smart contract account.
  public GetHistory(walletName: string, address: string): Observable<ContractTransactionItem[]> {
    return this.historySubject.asObservable();
  }

  public GetHistoryFromApi(walletName: string, address: string): void {
    const params = new HttpParams()
      .set('walletName', walletName)
      .set('address', address);
    this.get<ContractTransactionItem[]>('smartcontractwallet/history', params).pipe(
      catchError(err => this.handleHttpError(err))
    ).toPromise().then(response => {
      this.historySubject.next(response);
    });
  }

  /// Posts a contract creation transaction
  public PostCreate(transaction: any): Observable<any> {
    return this.post('smartcontractwallet/create', transaction).pipe(
      catchError(err => this.handleHttpError(err))
    );
  }

  /// Posts a contract call transaction
  public PostCall(transaction: any): Observable<any> {
    return this.post('smartcontractwallet/call', transaction).pipe(
      catchError(err => this.handleHttpError(err))
    );
  }

  public LocalCall(localCall: TokenBalanceRequest): Observable<LocalExecutionResult> {
    return this.post<LocalExecutionResult>('smartcontracts/local-call', localCall).pipe(
      catchError(err => this.handleHttpError(err))
    );
  }

  public GetContracts(): Observable<SmartContractsContractItem[]> {
    return this.GetHistory(this.currentWallet.walletName, this.currentAddress).pipe(map(items => {
      const smartContracts = items.filter(item => item.type === ContractItemType.Create);
      return smartContracts.map(create => {
        return new SmartContractsContractItem(create.blockHeight.toFixed(), '', create.hash, create.to, create.amount);
      });
    }))
  }

  GetSenderAddresses(walletName: string): Observable<string[]> {
    return of([
      'SarP7wvxZmaG7t1UAjaxyB6RNT9FV1Z2Sn',
      'SbrP8wvxZmaG7t2UAjbxyB7RNT9FV1Z2Sn',
      'ScrP9wvxZmaG7t3UAjcxyB8RNT9FV1Z2Sn'
    ]);
  }

  GetParameterTypes(walletName: string): Observable<string[]> {
    return of([
      'Type 1',
      'Type 2',
      'Type 3'
    ]);
  }
}
