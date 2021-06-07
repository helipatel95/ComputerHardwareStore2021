import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UploadimageService } from 'src/app/services/uploadimage/uploadimage.service';

@Component({
  selector: 'app-images-prducts',
  templateUrl: './images-prducts.component.html',
  styleUrls: ['./images-prducts.component.scss'],
})
export class ImagesPrductsComponent implements OnInit {
  @Input() picinfo: any;

  @Output() picinfochange: EventEmitter<any> = new EventEmitter();
  fileToUpload: File = null;
  uploadProgress$: Observable<number>;
  submitted: boolean = false;

  constructor(public storeageservice: UploadimageService) {}

  ngOnInit(): void {}

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  Submitform() {
    this.uploadfile();
  }
  uploadfile() {
    const mediaFolderPath = `products/`;
    this.submitted = true;
    const { downloadUrl$, uploadProgress$ } =
      this.storeageservice.uploadFileAndGetMetadata(
        mediaFolderPath,
        this.fileToUpload
      );

    this.uploadProgress$ = uploadProgress$;
    downloadUrl$.subscribe((downloadUrl) => {
      this.fileToUpload = null;
      this.submitted = false;
      this.inserturl(downloadUrl);
    });
  }

  deleteUrl(data: string) {
    this.storeageservice.deletefile(data);
    this.picinfo = this.picinfo.filter((item) => item !== data);
    if (this.picinfo.length == 0) {
      this.picinfo = 0;
    }
    this.picinfochange.emit(this.picinfo);
  }
  inserturl(data: string) {
    if (this.picinfo == 0) {
      this.picinfo = [];
      this.picinfo.push(data);
    } else {
      this.picinfo.push(data);
    }

    this.picinfochange.emit(this.picinfo);
  }
}
