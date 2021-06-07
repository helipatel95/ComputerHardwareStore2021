import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssemblyserviceService } from 'src/app/services/assemblyservice/assemblyservice.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { UploadimageService } from 'src/app/services/uploadimage/uploadimage.service';
import Assemble from 'src/app/Shared/AllPojos/assemble';
import Category from 'src/app/Shared/AllPojos/category';

@Component({
  selector: 'app-assemblypage',
  templateUrl: './assemblypage.component.html',
  styleUrls: ['./assemblypage.component.scss'],
})
export class AssemblypageComponent implements OnInit, AfterViewInit {
  assemblyForm: FormGroup;
  submitted: boolean = false;
  assemblyCategoryForm: FormGroup;
  submittedcategory: boolean = false;
  downloadedurl: string = '';
  fileToUpload: File = null;
  categoryArray?: Category[];
  categorySelectedArray: Category[] = [];
  uploadProgress$: Observable<number>;
  button: any = 'Add';
  dataSource: MatTableDataSource<Assemble>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['Sno', 'Assembly Title', 'Active', 'Action'];
  filter: string;
  assemleyArry: Assemble[] = [];

  assemblyTobeUpdate: Assemble = new Assemble();
  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoryService,
    public storeageservice: UploadimageService,
    public assemblyservice: AssemblyserviceService
  ) {
    this.dataSource = new MatTableDataSource(this.assemleyArry);
  }

  ngOnInit(): void {
    this.assemblyForm = this.fb.group({
      assemblyTitle: ['', Validators.required],
    });
    this.assemblyCategoryForm = this.fb.group({
      categoryid: ['', Validators.required],
    });
    this.getAllCategories();
    this.getAllAssemblyData();
  }
  getAllAssemblyData() {
    this.assemblyservice
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.assemleyArry = data.filter((item) => item.isdeleted === false);
        this.dataSource.data = this.assemleyArry;
      });
  }
  getAllCategories() {
    this.categoriesService
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.categoryArray = data.filter((item) => item.isdeleted === false);
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  get f() {
    return this.assemblyForm.controls;
  }
  get g() {
    return this.assemblyCategoryForm.controls;
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  Submitform() {
    this.submitted = true;
    if (this.assemblyForm.invalid) {
      return;
    } else {
      if (this.categorySelectedArray.length == 0) {
        return;
      }
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
    }
  }

  togglechange(event, assemble: Assemble) {
    assemble.isActive = event.checked;
    this.assemblyservice.update(assemble).then(() => {});
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateData(url: string) {
    debugger;
    Object.keys(this.assemblyForm.value).forEach((key) => {
      this.assemblyTobeUpdate[key] = this.assemblyForm.get(key).value;
    });
    if (url) {
      this.assemblyTobeUpdate.imagepath = url;
    }
    this.assemblyTobeUpdate.allcategories = this.categorySelectedArray;
    this.assemblyservice
      .update(this.assemblyTobeUpdate)
      .then((result) => {
        debugger;
        this.assemblyForm.reset();
        this.submitted = false;
        this.assemblyCategoryForm.reset();
        this.submittedcategory = false;
        this.button = 'Add';
        this.downloadedurl = '';
        this.categorySelectedArray = [];
      })
      .catch((err) => {});
  }

  deletedata(assemble: Assemble) {
    assemble.isdeleted = true;
    assemble.isActive = false;
    this.assemblyservice
      .update(assemble)
      .then((result) => {})
      .catch((err) => {});
  }

  editdata(data) {
    this.assemblyTobeUpdate = data;
    this.downloadedurl = this.assemblyTobeUpdate.imagepath;
    this.categorySelectedArray = this.assemblyTobeUpdate.allcategories;
    const { assemblyTitle } = data;
    this.assemblyForm.patchValue({
      assemblyTitle,
    });
    this.button = 'Update';
  }

  updateFileUpload() {
    if (this.downloadedurl) {
      this.storeageservice.deletefile(this.downloadedurl);
    }
    this.dofileupload();
  }
  dofileupload() {
    const mediaFolderPath = `Assembley/`;

    const { downloadUrl$, uploadProgress$ } =
      this.storeageservice.uploadFileAndGetMetadata(
        mediaFolderPath,
        this.fileToUpload
      );

    this.uploadProgress$ = uploadProgress$;

    downloadUrl$.subscribe((downloadUrl) => {
      this.fileToUpload = null;
      if (this.button == 'Add') {
        this.addAssembly(downloadUrl);
      } else {
        this.updateData(downloadUrl);
      }
    });
  }
  addAssembly(downloadUrl: string) {
    let assembley = new Assemble(this.assemblyForm.value);
    assembley.imagepath = downloadUrl;
    assembley.allcategories = this.categorySelectedArray;
    this.assemblyservice.create(assembley).then(() => {
      this.assemblyForm.reset();
      this.assemblyCategoryForm.reset();
      this.categorySelectedArray = [];
      this.submittedcategory = false;
      this.submitted = false;
      this.fileToUpload = null;
      this.downloadedurl = '';
    });
  }
  Submitformcategory() {
    this.submittedcategory = true;
    if (this.assemblyCategoryForm.invalid) {
      return;
    } else {
      const categoryData = this.categoryArray.filter(
        (item) =>
          item.id === this.assemblyCategoryForm.controls['categoryid'].value
      )[0];
      this.addselectedCategorie(categoryData);
    }
  }
  addselectedCategorie(categoryData: Category) {
    if (!this.categorySelectedArray) {
      this.categorySelectedArray = [];
      this.pushcategoryData(categoryData);
    } else {
      this.pushcategoryData(categoryData);
    }
  }
  pushcategoryData(categoryData: Category) {
    if (this.categorySelectedArray.length == 0) {
      this.categorySelectedArray.push(categoryData);
    } else {
      const data = this.categorySelectedArray.filter(
        (iteam) => iteam.id === categoryData.id
      )[0];
      if (!data) {
        this.categorySelectedArray.push(categoryData);
      }
    }
  }
  delete(catgoryData: Category) {
    this.categorySelectedArray = this.categorySelectedArray.filter(
      (item) => item.id !== catgoryData.id
    );
  }
}
