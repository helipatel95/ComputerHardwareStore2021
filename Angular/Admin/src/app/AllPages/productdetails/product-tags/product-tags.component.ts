import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-tags',
  templateUrl: './product-tags.component.html',
  styleUrls: ['./product-tags.component.scss'],
})
export class ProductTagsComponent implements OnInit {
  @Input() producttaginfo: any;
  submitted: boolean = false;
  @Output() producttaginfochange: EventEmitter<any> = new EventEmitter();
  producttagsInfoForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.producttagsInfoForm = this.fb.group({
      tagtitle: ['', Validators.required],
    });
  }
  get f() {
    return this.producttagsInfoForm.controls;
  }
  Submitform() {
    this.submitted = true;
    if (this.producttagsInfoForm.invalid) {
      return;
    } else {
      this.addvalue(this.producttagsInfoForm.get('tagtitle').value);
    }
  }
  addvalue(value: any) {
    if (this.producttaginfo == 0) {
      this.producttaginfo = [];
      this.producttaginfo.push(value);
    } else {
      this.producttaginfo.push(value);
    }
    this.submitted = false;
    this.producttagsInfoForm.reset();
    this.producttaginfochange.emit(this.producttaginfo);
  }

  delete(element: any) {
    this.producttaginfo = this.producttaginfo.filter(
      (item) => item !== element
    );
    if (this.producttaginfo.length == 0) {
      this.producttaginfo = 0;
    }
    this.producttaginfochange.emit(this.producttaginfo);
  }
}
