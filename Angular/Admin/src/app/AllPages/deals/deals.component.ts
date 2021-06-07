import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DealService } from 'src/app/services/deal/deal.service';
import { UploadimageService } from 'src/app/services/uploadimage/uploadimage.service';
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

  fileToUpload: File = null;
  uploadProgress$: Observable<number>;

  downloadedurl: string = '';

  dealArray?: Deal[];
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  constructor(
    private fb: FormBuilder,
    public dealService: DealService,
    public storeageservice: UploadimageService
  ) {
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
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
      if (this.fileToUpload) {
        if (this.button == 'Add') {
          this.dofileupload();
        } else {
          this.updateFileUpload();
        }
      } else {
        if (this.button == 'Update') {
          debugger;
          this.updateData('');
        }
      }
      // if (this.button == 'Add') {
      //   this.addDeal();
      // } else {
      //   this.updateData();
      // }
    }
  }
  updateFileUpload() {
    if (this.downloadedurl) {
      this.storeageservice.deletefile(this.downloadedurl);
    }
    this.dofileupload();
  }
  dofileupload() {
    const mediaFolderPath = `deals/`;

    const { downloadUrl$, uploadProgress$ } =
      this.storeageservice.uploadFileAndGetMetadata(
        mediaFolderPath,
        this.fileToUpload
      );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$.subscribe((downloadUrl) => {
      this.fileToUpload = null;
      if (this.button == 'Add') {
        this.addDeal(downloadUrl);
      } else {
        this.updateData(downloadUrl);
      }
    });
  }

  updateData(url: string) {
    debugger;
    Object.keys(this.dealForm.value).forEach((key) => {
      this.dealToBeUpdate[key] = this.dealForm.get(key).value;
    });
    if (url) {
      this.dealToBeUpdate.imagepath = url;
    }
    this.dealService
      .update(this.dealToBeUpdate)
      .then((result) => {
        debugger;
        this.dealForm.reset();
        this.submitted = false;
        this.formDirective.resetForm();
        this.button = 'Add';
        this.myInputVariable.nativeElement.value = '';
        this.downloadedurl = '';
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
    this.downloadedurl = this.dealToBeUpdate.imagepath;
    const { dealTitle, startdate, enddate, dealDescription } = data;
    this.dealForm.patchValue({
      dealTitle,
      startdate,
      enddate,
      dealDescription,
    });
    this.button = 'Update';
  }

  addDeal(downloadurl: string) {
    let deal = new Deal(this.dealForm.value);
    deal.imagepath = downloadurl;
    this.dealService.create(deal).then(() => {
      this.dealForm.reset();
      this.submitted = false;
      this.formDirective.resetForm();
      this.myInputVariable.nativeElement.value = '';
      this.downloadedurl = '';
    });
  }
}
