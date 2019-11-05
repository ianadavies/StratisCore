import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionInfo } from '@shared/models/transaction-info';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalService } from '@shared/services/global.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WalletService } from '@shared/services/wallet.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  private transactionCount: number;
  private prevOutputTxTime: number;
  private prevOutputIndex: number;
  public currentPage: number;

  protected pageCount: number;
  public transactions: Observable<TransactionInfo[]>;
  @Input() public enablePagination: boolean;
  @Input() public itemsPerPage = 10;
  @Input() public enableShowHistoryButton: boolean;
  @Input() public maxTransactionCount: number;
  @Input() public title: string;
  @Output() public rowClicked: EventEmitter<TransactionInfo> = new EventEmitter();
  public pageNumber = 1;

  public constructor(
    private globalService: GlobalService,
    private walletService: WalletService,
    private router: Router,
    private modalService: NgbModal) {
  }

  public ngOnInit(): void {
    this.walletService.getTransactionCount().toPromise().then(result => {
      this.transactionCount = result;
      this.pageCount = Math.ceil(result / this.itemsPerPage);
      this.onPageChanged(1);
    });
  }

  public openTransactionDetailDialog(transaction: TransactionInfo): void {
    this.rowClicked.emit(transaction);
    const modalRef = this.modalService.open(TransactionDetailsComponent, {backdrop: 'static', keyboard: false});
    modalRef.componentInstance.transaction = transaction;
  }

  public onPageChanged(page: number): void {
    this.transactions = this.walletService.getWalletHistoryPaginated(Math.max((page - this.pageNumber) * 10, 10),
      this.prevOutputTxTime, this.prevOutputIndex)
      .pipe(map((historyItems => {
        return (null != historyItems && historyItems.length > 0)
          ? TransactionInfo.mapFromTransactionsHistoryItems(historyItems, this.maxTransactionCount)
          : null;
      })), tap(response => {
        this.prevOutputIndex = 1;
        this.prevOutputTxTime = response[response.length - 1].transactionTimestamp;
      }));
    this.pageNumber = page;
  }

  public goToHistory(): Promise<boolean> {
    return this.router.navigate(['/wallet/history']);
  }
}
