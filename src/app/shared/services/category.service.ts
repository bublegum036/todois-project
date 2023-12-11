import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { CategoryAddType } from 'src/types/category-add.type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private categories: CategoryAddType[] | null = null;
  public categories$: Subject<CategoryAddType[] | null> = new Subject<CategoryAddType[] | null>();
  private categoryForEdit: CategoryAddType | null = null;
  public categoryForEdit$: Subject<CategoryAddType | null> = new Subject<CategoryAddType | null>();


  getCategories(): Observable<CategoryAddType[] | null> {
    const categories = localStorage.getItem('categories');
    if (categories) {
      this.categories = JSON.parse(categories);
    } else {
      this.setCategories(null);
      this.categories = null;
    }
    return of(this.categories);
  }

  setCategories(categories: CategoryAddType[] | null) {
    localStorage.setItem('categories', JSON.stringify(categories));
    this.categories$.next(categories);
  }

  getEditCategory(): Observable<CategoryAddType | null> {
    const categoryForEdit = localStorage.getItem('categoryForEdit');
    if (categoryForEdit) {
      this.categoryForEdit = JSON.parse(categoryForEdit);
    } else {
      this.setEditCategory(null);
      this.categoryForEdit = null;
    }
    return of(this.categoryForEdit);
  }

  setEditCategory(categoryForEdit: CategoryAddType | null) {
    localStorage.setItem('categoryForEdit', JSON.stringify(categoryForEdit));
    this.categoryForEdit$.next(categoryForEdit);
  }
}
