import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-more-info-page',
  templateUrl: './more-info-page.component.html',
  styleUrls: ['./more-info-page.component.scss'],
})
export class MoreInfoPageComponent implements OnInit {
  @Input() moreinfo: any;
  submitted: boolean = false;
  @Output() moreInfoChanged: EventEmitter<any> = new EventEmitter();
  morInfoForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.morInfoForm = this.fb.group({
      morinfotitle: ['', Validators.required],
    });
  }

  get f() {
    return this.morInfoForm.controls;
  }

  Submitform() {
    this.submitted = true;
    if (this.morInfoForm.invalid) {
      return;
    } else {
      this.addvalue(this.morInfoForm.get('morinfotitle').value);
    }
  }
  addvalue(value: any) {
    if (this.moreinfo == 0) {
      this.moreinfo = [];
      this.moreinfo.push(value);
    } else {
      this.moreinfo.push(value);
    }
    this.submitted = false;
    this.morInfoForm.reset();
    this.moreInfoChanged.emit(this.moreinfo);
  }

  delete(element: any) {
    this.moreinfo = this.moreinfo.filter((item) => item !== element);
    if (this.moreinfo.length == 0) {
      this.moreinfo = 0;
    }
    this.moreInfoChanged.emit(this.moreinfo);
  }
}
