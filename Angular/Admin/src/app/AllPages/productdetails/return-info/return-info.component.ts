import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-return-info',
  templateUrl: './return-info.component.html',
  styleUrls: ['./return-info.component.scss'],
})
export class ReturnInfoComponent implements OnInit {
  @Input() returninfo: any;
  submitted: boolean = false;
  @Output() returninfochange: EventEmitter<any> = new EventEmitter();
  returnInfoForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.returnInfoForm = this.fb.group({
      returninfotitle: ['', Validators.required],
    });
  }
  get f() {
    return this.returnInfoForm.controls;
  }

  Submitform() {
    this.submitted = true;
    if (this.returnInfoForm.invalid) {
      return;
    } else {
      this.addvalue(this.returnInfoForm.get('returninfotitle').value);
    }
  }
  addvalue(value: any) {
    if (this.returninfo == 0) {
      this.returninfo = [];
      this.returninfo.push(value);
    } else {
      this.returninfo.push(value);
    }
    this.submitted = false;
    this.returnInfoForm.reset();
    this.returninfochange.emit(this.returninfo);
  }

  delete(element: any) {
    this.returninfo = this.returninfo.filter((item) => item !== element);
    if (this.returninfo.length == 0) {
      this.returninfo = 0;
    }
    this.returninfochange.emit(this.returninfo);
  }
}
