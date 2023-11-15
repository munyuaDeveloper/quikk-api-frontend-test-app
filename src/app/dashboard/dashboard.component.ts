import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SharedService } from '../shared/services/shared.service';
import { Observable, lastValueFrom, map, take } from 'rxjs';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { IFormField } from '../shared/interfaces';
import { formFields } from '../shared/form-fields';
import { DialogFormComponent } from '../shared/dialog-form/dialog-form.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    imports: [CommonModule, NavbarComponent]
})
export class DashboardComponent implements OnInit {

    myRecentTransactions$!: Observable<any>;
    accountBalance$!: Observable<any>;
    profileDetails: any;

    bsModalRef!: BsModalRef;
    sendMoneyFormFields: IFormField[] = formFields.sendMoney;

    constructor(private sharedService: SharedService,
        private modalService: BsModalService,) {

    }

    ngOnInit(): void {
        const user = localStorage.getItem('user') as string
        this.profileDetails = JSON.parse(user)

        this.getAccountBalance();
        this.getRecentTransactions();
    }

    getRecentTransactions() {
        this.myRecentTransactions$ = this.sharedService.getRequest('/api/v1/transactions').pipe(
            map((res: any) => res.data)
        )
    }

    getAccountBalance() {
        this.accountBalance$ = this.sharedService.getRequest('/api/v1/wallet').pipe(
            map((res: any) => res.data)
        )
    }

    openModalComponent(action: string) {
        const initialState: ModalOptions = {
            initialState: {
                title: action === 'SEND_MONEY' ? 'Send Money' : 'Top Up Balance',
                dynamicFormFields: this.sendMoneyFormFields
            },
            class: 'modal-md modal-dialog-centered',
        };
        this.bsModalRef = this.modalService.show(DialogFormComponent, initialState);
        this.bsModalRef.content.closeBtnName = action === 'SEND_MONEY' ? 'Send Money' : 'Top Up Balance';
        this.bsModalRef.content.action.pipe(take(1)).subscribe((value: any) => {
            const url = action === 'SEND_MONEY' ? '/api/v1/wallet/send-money' : '/api/v1/wallet/topUp'
            if (value) {
                this.makeRequest(url, value)
            }
        });
    }

    makeRequest(url: string, value: any) {
        lastValueFrom(this.sharedService.postRequest(url, value))
            .then(() => {
                this.getAccountBalance();
                this.getRecentTransactions();
            })
    }
}
