import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutConfirmationComponent } from './logout-confirmation/logout-confirmation.component';
import { TaskBarService } from '@shared/services/task-bar-service';
import { GlobalService } from '@shared/services/global.service';

@Component({
  selector: 'wallet-component',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  sidechainEnabled: any;

  constructor(
    private globalService: GlobalService,
    private taskBarService: TaskBarService,
    private modalService: NgbModal) {
    this.sidechainEnabled = globalService.getSidechainEnabled();
  }

  public logout(): void {
    this.modalService.open(LogoutConfirmationComponent, {
      backdrop: 'static',
    });
  }
}
