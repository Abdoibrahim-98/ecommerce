import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  cartProducts: any[] = [];
  subTotal: number = 0;

  constructor(private productService: ProductService, private router: Router){
    this.productService.cartAddedSubject.subscribe(res =>{
      this.loadCart();
    })
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(){
    this.subTotal = 0;
    this.productService.getCartItemsByCustId(1).subscribe((res: any) => { 
      this.cartProducts = res.data;
      this.cartProducts.forEach(element =>{
        this.subTotal = this.subTotal + element.productPrice;
      })
    })
  }

  redirectToSale(){
    this.router.navigateByUrl("sale");
  }

}
