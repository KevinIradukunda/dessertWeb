import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {
  @Input() cartItems$!: Observable<any[]>;
  @Input() cartTotals$!: Observable<number>;

  getItemName(itemId: number): string {
    const item = this.desserts.find(d => d.id === itemId);
    return item ? item.name : '';
  }

  getItemPrice(itemId: number): number {
    const item = this.desserts.find(d => d.id === itemId);
    return item ? parseFloat(item.price.substring(1)) : 0;
  }

  getItemImage(itemId: number): string {
    const item = this.desserts.find(d => d.id === itemId);
    return item ? item.image : '';
  }

  calculateItemTotal(item: any): number {
    return item.quantity * this.getItemPrice(item.id);
  }

  desserts = [
    { id: 1, name: 'Waffle with Berries', description: 'Waffle', price: '$6.50', image: '/assets/images/image-waffle-desktop.jpg' },
    { id: 2, name: 'Vanilla Bean Crème Brûlée', description: 'Crème Brûlée', price: '$7.00', image: 'assets/images/image-creme-brulee-desktop.jpg' },
    { id: 3, name: 'Macaron Mix of Five', description: 'Macaron', price: '$8.00', image: 'assets/images/image-macaron-desktop.jpg' },
    { id: 4, name: 'Classic Tiramisu', description: 'Tiramisu', price: '$5.50', image: 'assets/images/image-tiramisu-desktop.jpg' },
    { id: 5, name: 'Pistachio Baklava', description: 'Baklava', price: '$4.00', image: 'assets/images/baklava.jpg' },
    { id: 6, name: 'Lemon Meringue Pie', description: 'Pie', price: '$5.00', image: 'assets/images/image-meringue-desktop.jpg' },
    { id: 7, name: 'Red Velvet Cake', description: 'Cake', price: '$4.50', image: 'assets/images/image-cake-desktop.jpg' },
    { id: 8, name: 'Salted Caramel Brownie', description: 'Brownie', price: '$5.50', image: 'assets/images/image-brownie-desktop.jpg' },
    { id: 9, name: 'Vanilla Panna Cotta', description: 'Panna Cotta', price: '$6.50', image: 'assets/images/image-panna-cotta-desktop.jpg' }
  ];
}
