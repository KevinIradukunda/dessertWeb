import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-button',
  templateUrl: './quantity-button.component.html',
  styleUrl: './quantity-button.component.css'
})
export class QuantityButtonComponent {
 
  @Input() quantity!: number;  
  @Output() quantityChange = new EventEmitter<number>();  

  increaseQuantity() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);  
  }

  decreaseQuantity() {
    console.log('Decrement button clicked'); 
    if (this.quantity > 1) {  
      this.quantity--;
      console.log('Quantity after decrement:', this.quantity); 
      this.quantityChange.emit(this.quantity);  
    }
  }
}
