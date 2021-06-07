import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AssemblyserviceService } from 'src/app/services/assemblyservice/assemblyservice.service';
import Assemble from 'src/app/shared/AllPojos/assemble';
import { AiPopupComponent } from '../ai-popup/ai-popup.component';

@Component({
  selector: 'app-list-of-assembley',
  templateUrl: './list-of-assembley.component.html',
  styleUrls: ['./list-of-assembley.component.scss'],
})
export class ListOfAssembleyComponent implements OnInit {
  assemblyArray: Assemble[] = [];
  adviser: string[] = [];

  constructor(
    public dialog: MatDialog,
    public router: Router,
    public assemblyservices: AssemblyserviceService
  ) {
    this.getAllAssembly();
    const advisor = JSON.parse(localStorage.getItem('adviser'));
    if (advisor) {
      this.adviser = advisor;
    }
  }
  getAllAssembly() {
    this.assemblyservices
      .getAll()
      .snapshotChanges()
      .pipe(map((changes) => changes.map((c) => ({ ...c.payload.val() }))))
      .subscribe((data) => {
        this.assemblyArray = data.filter(
          (item) => item.isdeleted === false && item.isActive === true
        );
      });
  }

  ngOnInit(): void {}
  openPopup() {
    const dialogRef = this.dialog.open(AiPopupComponent, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.adviser = result.data;
    });
  }
  resetAi() {
    localStorage.removeItem('adviser');
    this.adviser = [];
  }
  openAssemblySelection(data: Assemble) {
    let url = 'Dashboard/AssemblySelection/' + data.id;
    this.router.navigate([url]);
  }
}
