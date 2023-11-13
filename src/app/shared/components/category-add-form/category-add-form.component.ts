import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'category-add-form',
  templateUrl: './category-add-form.component.html',
  styleUrls: ['./category-add-form.component.scss']
})
export class CategoryAddFormComponent {
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

}
