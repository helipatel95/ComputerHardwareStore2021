import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss']
})
export class AIComponent implements OnInit {
  componentProducts:any=[
    {icons:'fa fa-desktop fa-5x',name:'CPU'},
    {icons:'fa fa-desktop fa-5x',name:'Motherboard'},
    {icons:'fa fa-desktop fa-5x',name:'Memory'},
    {icons:'fa fa-desktop fa-5x',name:'Video Cards'},
    {icons:'fa fa-desktop fa-5x',name:'Case'},
    {icons:'fa fa-desktop fa-5x',name:'Power Supply'},
    {icons:'fa fa-desktop fa-5x',name:'Storage'},
    {icons:'fa fa-desktop fa-5x',name:'CPU Cooler'},
    {icons:'fa fa-desktop fa-5x',name:'CIS'},
    {icons:'fa fa-desktop fa-5x',name:'Accessaries'}
  ]  //Catogory related products 
  addProducts:any=[
    {img:'fa fa-keyboard-o fa-5x',description:'24 inch Curved monitor with an industry leading 1000R curvature lets you fully immerse in game and entertainment experience AMD FreeSync & Multiple game modes - optimized game experience without screen tearing. Optimal colour settings and image contrast for more vivid scenes; Brightness: 250cd/㎡',price:'250'},
    {img:'fa fa-keyboard-o fa-5x',description:'26 inch full HD (1920 x 1080) IPS display; Power Input: 100~240V (50/60Hz) Ultra slim bezel Radeon free sync technology',price:'150'},
    {img:'fa fa-keyboard-o fa-5x',description:'AMD Radeon FreeSync reduces image tear and stutter.27" Full HD (1,920 x 1,080). HDMI Cable Included.',price:'350'}
  ]
  selectedProductsArr:any=[]
  constructor() { }

  ngOnInit(): void {
  }
  relatedProducts()
  {// get products from API(firebase) and add to addproducts array 
    $(`#relatedProducts`).modal('show');
  }
  selectedProducts(y)
  {
    this.selectedProductsArr.push(y);
  }
  removeAddProduct(i)
  {
    this.selectedProductsArr.splice(i,1)
  }
  submit(){
    console.log(this.selectedProductsArr)
  }
}
