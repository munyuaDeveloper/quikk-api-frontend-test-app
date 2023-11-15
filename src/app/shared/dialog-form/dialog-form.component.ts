import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { IFormField } from '../interfaces';

@Component({
  selector: 'app-dialog-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="btn-close close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true" class="visually-hidden">&times;</span>
      </button>
    </div>
    <div class="modal-body" [formGroup]="createForm" >
    <div *ngFor="let control of dynamicFormFields">
        <div [ngSwitch]="control.input_type">
          <div class="form-floating mb-2" *ngSwitchCase="'INPUT'">
            <input [type]="control.field_type.toLowerCase()" [formControlName]="control.code" class="form-control" [id]="control.code" [placeholder]="control.place_holder" >
            <label [for]="control.code">{{control.name}}</label>
            <div *ngIf="createForm.get(control.code)!.dirty || createForm.get(control.code)!.touched">
                <small class="text-danger" *ngIf="!createForm.get(control.code)!.valid">{{control.name + ' ' }}is required</small>
            </div>
          </div>
        </div>
    </div>

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" [disabled]="createForm.invalid" (click)="submitData()">{{closeBtnName}}</button>
    </div>
  `,
  styles: [
  ]
})
export class DialogFormComponent implements OnInit {
  title?: string;
  closeBtnName?: string;
  formConstructed = false;
  createForm!: FormGroup;
  dynamicFormFields: IFormField[] = [];
  @Output() action = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm = this.fb.group({})

    this.createFormControls();
  }

  createFormControls() {
    if (this.dynamicFormFields.length !== 0) {
      this.dynamicFormFields.forEach((element: IFormField) => {
        if (element.required) {
          this.createForm.addControl(element.code, new UntypedFormControl('',
            [Validators.required, Validators.pattern('')]))
        } else {
          this.createForm.addControl(element.code, new UntypedFormControl())
        }
        this.formConstructed = true;
      });
    }
  }

  submitData(): void {
    this.action.emit(this.createForm.value);
    this.bsModalRef.hide();
  }
  convertDate(date: string) {
    return new Date(date).toISOString().slice(0, 10)
  }
}
