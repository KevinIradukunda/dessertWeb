import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-remove-button',
  templateUrl: './remove-button.component.html',
  styleUrl: './remove-button.component.css'
})
export class RemoveButtonComponent {

  @Output() click = new EventEmitter<void>();

  onRemoveClick() {
    this.click.emit();
  }

}
