import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function () {
      console.log("document is ready");
      $('[data-toggle="offcanvas"], #navToggle').on('click', function () {
          $('.offcanvas-collapse').toggleClass('open')
      })
  });
  }

}
