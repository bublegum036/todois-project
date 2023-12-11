import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { CategoryAddType } from 'src/types/category-add.type';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  public categoriesKey: string = 'categories';
  public categoriesForEditKey: string = 'categoryForEdit';
  private categories: CategoryAddType[] | null = null;
  public categories$: Subject<CategoryAddType[] | null> = new Subject<CategoryAddType[] | null>();
  private categoryForEdit: CategoryAddType | null = null;
  public categoryForEdit$: Subject<CategoryAddType | null> = new Subject<CategoryAddType | null>();


  getCategories(): Observable<CategoryAddType[] | null> {
    const categories = localStorage.getItem(this.categoriesKey);
    if (categories) {
      this.categories = JSON.parse(categories);
    } else {
      this.setCategories(null);
      this.categories = null;
    }
    return of(this.categories);
  }

  setCategories(categories: CategoryAddType[] | null) {
    localStorage.setItem(this.categoriesKey, JSON.stringify(categories));
    this.categories$.next(categories);
  }

  getEditCategory(): Observable<CategoryAddType | null> {
    const categoryForEdit = localStorage.getItem(this.categoriesForEditKey);
    if (categoryForEdit) {
      this.categoryForEdit = JSON.parse(categoryForEdit);
    } else {
      this.setEditCategory(null);
      this.categoryForEdit = null;
    }
    return of(this.categoryForEdit);
  }

  setEditCategory(categoryForEdit: CategoryAddType | null) {
    localStorage.setItem(this.categoriesForEditKey, JSON.stringify(categoryForEdit));
    this.categoryForEdit$.next(categoryForEdit);
  }
}
