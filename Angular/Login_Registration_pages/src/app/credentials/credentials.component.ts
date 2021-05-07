import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  credentialStatus = false
  constructor() { }

  ngOnInit(): void {
    
    
  }
  signInPage()
  {
    this.credentialStatus = !this.credentialStatus
  }
}
