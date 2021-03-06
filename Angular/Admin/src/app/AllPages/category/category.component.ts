import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/services/category/category.service';
import { map } from 'rxjs/operators';
import Category from 'src/app/Shared/AllPojos/category';
import { UploadimageService } from 'src/app/services/uploadimage/uploadimage.service';
import { Observable } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, AfterViewInit {
  categoryForm: FormGroup;
  button: any = 'Add';
  submitted: boolean = false;
  filter: string;
  categoryArray?: Category[];
  displayedColumns: string[] = ['Sno', 'categoryName', 'Active', 'Action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  tobeUpadateCategory: Category = new Category();
  uploadedImagePath: string = '';

  filetobeupload: any;
  fileToUpload: File = null;
  uploadProgress$: Observable<number>;

  downloadedurl: string = '';

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public catregoryservice: CategoryService,
    public storeageservice: UploadimageService
  ) {
    this.dataSource = new MatTableDataSource(this.categoryArray);
    this.getAllCategories();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get f() {
    return this.categoryForm.controls;
  }

  togglechange(event, categorie: Category) {
    categorie.isActive = event.checked;
    this.catregoryservice.update(categorie).then(() => {});
  }

  getAllCategories(): void {
    this.catregoryservice
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.categoryArray = data.filter((item) => item.isdeleted === false);
        this.dataSource.data = this.categoryArray;
      });
  }

  Submitform() {
    this.submitted = true;
    console.log(this.categoryForm);
    if (this.categoryForm.invalid) {
      return;
    } else {
      if (this.fileToUpload) {
        if (this.button == 'Add') {
          this.dofileupload();
        } else {
          this.updateFileUpload();
        }
      } else {
        if (this.button == 'Modify') {
          let categorie: Category = new Category();
          categorie.categoryname = this.categoryForm.get('categoryName').value;
          this.addCategory(categorie);
        }
      }
    }
  }

  updateFileUpload() {
    if (this.downloadedurl) {
      this.storeageservice.deletefile(this.downloadedurl);
    }
    this.dofileupload();
  }

  dofileupload() {
    const mediaFolderPath = `categories/`;

    const { downloadUrl$, uploadProgress$ } =
      this.storeageservice.uploadFileAndGetMetadata(
        mediaFolderPath,
        this.fileToUpload
      );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$.subscribe((downloadUrl) => {
      this.fileToUpload = null;
      let categorie: Category = new Category();
      categorie.imagepath = downloadUrl;
      this.tobeUpadateCategory.imagepath = downloadUrl;
      categorie.categoryname = this.categoryForm.get('categoryName').value;
      this.addCategory(categorie);
    });
  }

  editdata(category: Category) {
    this.tobeUpadateCategory = category;
    this.categoryForm.setValue({
      categoryName: category.categoryname,
    });
    this.downloadedurl = category.imagepath;
    this.button = 'Modify';
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  delete(category: Category) {
    category.isdeleted = true;
    category.isActive = false;
    this.catregoryservice
      .update(category)
      .then((result) => {})
      .catch((err) => {});
  }

  addCategory(category: Category) {
    if (this.button == 'Add') {
      this.catregoryservice.create(category).then(() => {
        console.log('Created new item successfully!');
        this.submitted = false;
        this.categoryForm.reset();
        this.button = 'Add';
      });
    } else {
      this.tobeUpadateCategory.categoryname =
        this.categoryForm.get('categoryName').value;

      this.catregoryservice
        .update(this.tobeUpadateCategory)
        .then((result) => {
          this.submitted = false;
          this.categoryForm.reset();
          this.button = 'Add';
        })
        .catch((err) => {});
    }
    
  }

  edit(data) {
    this.categoryForm.setValue({
      categoryName: data.categoryName,
    });
    this.button = 'Modify';
  }
}
