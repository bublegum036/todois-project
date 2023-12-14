import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { CategoryAddType } from 'src/types/category-add.type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private auth: AuthService) { }
  public categoriesKey: string = 'categories';
  public categoriesForEditKey: string = 'categoryForEdit';
  private categories: CategoryAddType[] | [] = [];
  public categories$: Subject<CategoryAddType[] | []> = new Subject<CategoryAddType[] | []>();
  private categoryForEdit: CategoryAddType | null = null;
  public categoryForEdit$: Subject<CategoryAddType | null> = new Subject<CategoryAddType | null>();


  getCategories(activeUser: string): Observable<CategoryAddType[] | []> {
    const userArrayFromLS = localStorage.getItem(activeUser);
    if (userArrayFromLS && userArrayFromLS.length > 0) {
      const userArray = JSON.parse(userArrayFromLS)
      const activeUserCategories = userArray.find((item: CategoryAddType | []) => {
        return item.hasOwnProperty("categories")
      })
      if(activeUserCategories && activeUserCategories.categories) {
        this.categories = activeUserCategories.categories
        console.log(this.categories)
      } else {
        const arrayWithCategories = userArray.concat({ categories: [] })
        this.auth.updateUser(activeUser, arrayWithCategories)
      }
    }
    return of(this.categories);
  }

  setCategories(categoriesArray: CategoryAddType[], activeUser: string) {
    
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
