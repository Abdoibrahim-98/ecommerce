import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  cartObj: any = {
    "cartId": 0, 
    "custId": 1,
    "productId": 0,
    "Quantity": 0,
    "AddedDate": "2024-04-30T07:12:40.00"
  }

  productList: any[];
  
  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any)=>{
      this.productList = result.data;
      console.log(this.productList);
    })
  }

  addItemToCart(productId: number) {
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result: any)=>{
       if(result.result) {
        alert("Product Added To Cart");
        this.productService.cartAddedSubject.next(true);
       }
    })
  }
  
}
