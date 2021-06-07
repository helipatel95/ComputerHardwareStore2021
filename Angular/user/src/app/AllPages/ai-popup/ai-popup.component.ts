import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ai-popup',
  templateUrl: './ai-popup.component.html',
  styleUrls: ['./ai-popup.component.scss'],
})
export class AiPopupComponent implements OnInit {
  questionForm: FormGroup;
  submitted: boolean = false;

  categoryArray: string[] = [
    'Architecture',
    'IT',
    'Civil',
    'Accounting',
    'Non Tech',
  ];
  speedArray: string[] = ['High Speed', 'Moderate Speed', 'Low Speed'];
  storageArray: string[] = ['Huge Storage', 'Moderate Storage', 'Low Storage'];
  adviser: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AiPopupComponent>
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      category: ['', Validators.required],
      speed: ['', Validators.required],
      storage: ['', Validators.required],
    });
  }
  get f() {
    return this.questionForm.controls;
  }
  Submitform() {
    this.submitted = true;
    if (this.questionForm.invalid) {
      return;
    } else {
      this.adviser.push(this.questionForm.controls['category'].value);
      this.adviser.push(this.questionForm.controls['storage'].value);
      this.adviser.push(this.questionForm.controls['speed'].value);
      localStorage.setItem('adviser', JSON.stringify(this.adviser));
      this.dialogRef.close({ event: 'close', data: this.adviser });
    }
  }
}
