import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  productsList:any = [{product:'Deals',icons:'fa fa-laptop fa-5x'},
  {product:'Laptops',icons:'fa fa-television fa-5x'},
  {product:'Mouse',icons:'fa fa-desktop fa-5x'},
  {product:'Keyboard',icons:'fa fa-keyboard-o fa-5x'},
  {product:'Monitor',icons:'fa fa-television fa-5x'},
  {product:'RAM ',icons:'fa fa-television fa-5x'},
  {product:'Cpu',icons:'fa fa-television fa-5x'},
  {product:'Speakers',icons:'fa fa-television fa-5x'},
  {product:'Coolers',icons:'fa fa-television fa-5x'},
  {product:'Printers',icons:'fa fa-television fa-5x'},
  {product:'Mobiles',icons:'fa fa-television fa-5x'},
  {product:'Pendrive',icons:'fa fa-television fa-5x'}]
  product:any = document.getElementsByClassName('product');
  product_page:any = Math.ceil(this.product.length/4);
  l:any = 0;
  movePer:any = 14.0;
  maxMove:any = 203;
  todayBestDeals=[
    {productDiscription:"Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost:"656"},
    {productDiscription:"Some quick example text to build on the card title and make up the bulk of the card's content.",
    productCost:"656"},
    {productDiscription:"Some quick example text to build on the card title and make up the bulk of the card's content.",
    productCost:"656"},
    {productDiscription:"Some quick example text to build on the card title and make up the bulk of the card's content.",
    productCost:"656"}
  ]
  recentViews=[
    {productDiscription:"Some quick example text to build on the card title and make up the bulk of the card's content.",
      productCost:"656"},
    {productDiscription:"Some quick example text to build on the card title and make up the bulk of the card's content.",
    productCost:"656"},
    {productDiscription:"Some quick example text to build on the card title and make up the bulk of the card's content.",
    productCost:"656"},
  ]
  corousal=[
    {
      heading:"Update home Office",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. A similique maxime modi?",
      image:"../../../assets/images/computer.png",
      fromDate:"20/20/2021",
      toDate:"25/20/2021",
      active:true
    },
    {
      heading:"Update home Office",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. A similique maxime modi?",
      image:"../../../assets/images/computer.png",
      fromDate:"20/20/2021",
      toDate:"25/20/2021",
      active:false
    },
    {
      heading:"Update home Office",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. A similique maxime modi?",
      image:"../../../assets/images/computer.png",
      fromDate:"20/20/2021",
      toDate:"25/20/2021",
      active:false
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  right_mover(){
    this.l = this.l + this.movePer;
		if (this.product == 1){this.l = 0; }
		for(const i of this.product)
		{
			if (this.l > this.maxMove){this.l = this.l - this.movePer;}
			i.style.left = '-' + this.l + '%';
		}
  }

  left_mover(){
    
    this.l = this.l - this.movePer;
		if (this.l<=0){this.l = 0;
    }
		for(const i of this.product){
			if (this.product_page<1){
				i.style.left = '-' + this.l + '%';
			}
		}
  }

}
