import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { DealService } from 'src/app/services/deal/deal.service';
import Deal from 'src/app/Shared/AllPojos/deal';

@Component({
  selector: 'app-deal-info',
  templateUrl: './deal-info.component.html',
  styleUrls: ['./deal-info.component.scss'],
})
export class DealInfoComponent implements OnInit {
  @Input() dealinfo: any;
  submitted: boolean = false;
  @Output() dealInfoChanged: EventEmitter<any> = new EventEmitter();
  dealInfoForm: FormGroup;
  dealArray: Deal[] = [];
  dealhide: boolean = false;
  minDate = new Date();
  dealName: string = '';
  constructor(
    private fb: FormBuilder,
    private dealservices: DealService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dealInfoForm = this.fb.group({
      dealselection: ['', Validators.required],
      dealid: [''],
      stardate: ['', Validators.required],
      enddat: ['', Validators.required],
      percentage: [
        '',
        [Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')],
      ],
    });
    this.getAllDeals();
    this.setdata();
  }

  setdata() {
    if (this.dealinfo.discountId) {
      this.dealInfoForm.controls['dealselection'].setValue('auto');
      this.dealInfoForm.controls['dealid'].setValue(this.dealinfo.discountId);
      this.dealInfoForm.controls['stardate'].setValue(this.dealinfo.startDate);
      this.dealInfoForm.controls['enddat'].setValue(this.dealinfo.enddate);
      this.dealInfoForm.controls['percentage'].setValue(
        this.dealinfo.discountPercentage
      );
      this.dealName = this.dealinfo.discountName;
      this.dealhide = true;
      this.setradio('auto');
    } else {
      this.dealhide = false;
      this.dealInfoForm.controls['dealselection'].setValue('manual');
      this.dealInfoForm.controls['stardate'].setValue(this.dealinfo.startDate);
      this.dealInfoForm.controls['enddat'].setValue(this.dealinfo.enddate);
      this.dealInfoForm.controls['percentage'].setValue(
        this.dealinfo.discountPercentage
      );
      this.dealName = '';
      this.setradio('manual');
    }
  }

  setradio(data) {
    debugger;
    if (data === 'auto') {
      this.dealInfoForm.get('dealid').setValidators(Validators.required);
      this.onOptionsSelected('dummy');
      this.dealhide = true;
    } else {
      this.dealhide = false;
      this.dealInfoForm.get('dealid').clearValidators();
    }
  }

  onOptionsSelected(dealid) {
    const id = this.dealInfoForm.controls['dealid'].value;
    if (id) {
      const dealdata = this.dealArray.filter((iteam) => iteam.id === id)[0];
      this.dealName = dealdata.dealTitle;
      this.dealInfoForm.controls['stardate'].setValue(dealdata.startdate);
      this.dealInfoForm.controls['enddat'].setValue(dealdata.enddate);
    }
  }

  Submitform() {
    this.submitted = true;
    if (this.dealInfoForm.invalid) {
      return;
    } else {
      this.checkdate();
    }
  }
  checkdate() {
    const stardate = new Date(this.dealInfoForm.controls['stardate'].value);
    const enddate = new Date(this.dealInfoForm.controls['enddat'].value);

    if (enddate.getTime() < stardate.getTime()) {
      this.datemessage('');
      return;
    }
    if (stardate.getTime() < this.minDate.getTime()) {
      this.datemessage('');
      return;
    }
    if (enddate.getTime() < this.minDate.getTime()) {
      this.datemessage('');
      return;
    } else {
      this.senddata();
    }
  }
  datemessage(arg0: string) {
    this._snackBar.open('Please select proper dates', 'Error', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2 * 1000,
    });
  }
  senddata() {
    const redioselection = this.dealInfoForm.controls['dealselection'].value;
    if (redioselection === 'auto') {
      this.dealinfo = {
        discountId: this.dealInfoForm.controls['dealid'].value,
        discountName: this.dealName,
        discountPercentage: this.dealInfoForm.controls['percentage'].value,
        enddate: this.dealInfoForm.controls['enddat'].value,
        startDate: this.dealInfoForm.controls['stardate'].value,
        productPrice: this.dealinfo.productPrice,
      };
    } else {
      this.dealinfo = {
        discountId: '',
        discountName: '',
        discountPercentage: this.dealInfoForm.controls['percentage'].value,
        enddate: this.dealInfoForm.controls['enddat'].value,
        startDate: this.dealInfoForm.controls['stardate'].value,
        productPrice: this.dealinfo.productPrice,
      };
    }
    this.dealInfoChanged.emit(this.dealinfo);
    this._snackBar.open('Deal Gets Updated', 'Updated', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2 * 1000,
    });
  }

  get f() {
    return this.dealInfoForm.controls;
  }

  getAllDeals() {
    this.dealservices
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.dealArray = data.filter(
          (item) => item.isdeleted === false && item.isActive === true
        );
      });
  }
}
