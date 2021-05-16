import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tech-and-spec',
  templateUrl: './tech-and-spec.component.html',
  styleUrls: ['./tech-and-spec.component.scss'],
})
export class TechAndSpecComponent implements OnInit {
  @Input() techinfo: any;
  @Output() techInfoChanged: EventEmitter<any> = new EventEmitter();

  submitted: boolean = false;
  techInfoForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.techInfoForm = this.fb.group({
      techTitle: ['', Validators.required],
      techSpec: ['', Validators.required],
    });
  }

  get f() {
    return this.techInfoForm.controls;
  }

  Submitform() {
    this.submitted = true;
    if (this.techInfoForm.invalid) {
      return;
    } else {
      let object = {
        techTitle: this.techInfoForm.get('techTitle').value,
        techSpec: this.techInfoForm.get('techSpec').value,
      };
      this.addvalue(object);
    }
  }
  addvalue(formdata: any) {
    if (this.techinfo == 0) {
      this.techinfo = [];
      this.techinfo.push(formdata);
    } else {
      this.techinfo.push(formdata);
    }
    this.submitted = false;
    this.techInfoForm.reset();
    this.techInfoChanged.emit(this.techinfo);
  }
  delete(element: any) {
    this.techinfo = this.techinfo.filter(
      (item) => item.techTitle !== element.techTitle
    );
    if (this.techinfo.length == 0) {
      this.techinfo = 0;
    }
    this.techInfoChanged.emit(this.techinfo);
  }
}
