import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { DealService } from 'src/app/services/deal/deal.service';
import Deal from 'src/app/Shared/AllPojos/deal';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss'],
})
export class DealsComponent implements OnInit, AfterViewInit {
  dealForm: FormGroup;
  submitted: boolean = false;
  minDate = new Date();
  @ViewChild('formDirective') private formDirective: NgForm;

  displayedColumns: string[] = [
    'Sno',
    'Deal Name',
    'Start date',
    'End Date',
    'Active',
    'Action',
  ];
  dataSource: MatTableDataSource<Deal>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filter: string;
  button: any = 'Add';
  dealToBeUpdate: Deal = new Deal();

  dealArray?: Deal[];

  constructor(private fb: FormBuilder, public dealService: DealService) {
    this.dataSource = new MatTableDataSource(this.dealArray);
  }

  ngOnInit(): void {
    this.dealForm = this.fb.group({
      dealTitle: ['', Validators.required],
      startdate: ['', Validators.required],
      enddate: ['', Validators.required],
      dealDescription: ['', Validators.required],
    });
    this.getAllDeals();
  }
  getAllDeals() {
    this.dealService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.dealArray = data.filter((item) => item.isdeleted === false);
        this.dataSource.data = this.dealArray;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get f() {
    return this.dealForm.controls;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Submitform() {
    this.submitted = true;
    if (this.dealForm.invalid) {
      return;
    } else {
      if (this.button == 'Add') {
        this.addDeal();
      } else {
        this.updateData();
      }
    }
  }
  updateData() {
    Object.keys(this.dealForm.value).forEach((key) => {
      this.dealToBeUpdate[key] = this.dealForm.get(key).value;
    });
    this.dealService
      .update(this.dealToBeUpdate)
      .then((result) => {
        this.dealForm.reset();
        this.submitted = false;
        this.formDirective.resetForm();
        this.button = 'Add';
      })
      .catch((err) => {});
  }

  togglechange(event, deal: Deal) {
    deal.isActive = event.checked;
    this.dealService.update(deal).then(() => {});
  }

  delete(deal: Deal) {
    deal.isdeleted = true;
    deal.isActive = false;
    this.dealService
      .update(deal)
      .then((result) => {})
      .catch((err) => {});
  }

  editdata(data) {
    this.dealToBeUpdate = data;
    const { dealTitle, startdate, enddate, dealDescription } = data;
    this.dealForm.patchValue({
      dealTitle,
      startdate,
      enddate,
      dealDescription,
    });
    this.button = 'Update';
  }

  addDeal() {
    let deal = new Deal(this.dealForm.value);
    this.dealService.create(deal).then(() => {
      this.dealForm.reset();
      this.submitted = false;
      this.formDirective.resetForm();
    });
  }
}
