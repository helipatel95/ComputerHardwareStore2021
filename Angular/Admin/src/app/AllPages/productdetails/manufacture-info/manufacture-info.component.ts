import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manufacture-info',
  templateUrl: './manufacture-info.component.html',
  styleUrls: ['./manufacture-info.component.scss'],
})
export class ManufactureInfoComponent implements OnInit {
  @Input() manufactureinfo: any;
  submitted: boolean = false;
  @Output() manufactureinfochange: EventEmitter<any> = new EventEmitter();
  manufactureInfoForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.manufactureInfoForm = this.fb.group({
      manufactureinfotitle: ['', Validators.required],
    });
  }

  get f() {
    return this.manufactureInfoForm.controls;
  }
  Submitform() {
    this.submitted = true;
    if (this.manufactureInfoForm.invalid) {
      return;
    } else {
      this.addvalue(this.manufactureInfoForm.get('manufactureinfotitle').value);
    }
  }
  addvalue(value: any) {
    if (this.manufactureinfo == 0) {
      this.manufactureinfo = [];
      this.manufactureinfo.push(value);
    } else {
      this.manufactureinfo.push(value);
    }
    this.submitted = false;
    this.manufactureInfoForm.reset();
    this.manufactureinfochange.emit(this.manufactureinfo);
  }
  delete(element: any) {
    this.manufactureinfo = this.manufactureinfo.filter(
      (item) => item !== element
    );
    if (this.manufactureinfo.length == 0) {
      this.manufactureinfo = 0;
    }
    this.manufactureinfochange.emit(this.manufactureinfo);
  }
}
