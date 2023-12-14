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
  private categories: CategoryAddType[] | null = null;
  public categories$: Subject<CategoryAddType[] | null> = new Subject<CategoryAddType[] | null>();
  private categoryForEdit: CategoryAddType | null = null;
  public categoryForEdit$: Subject<CategoryAddType | null> = new Subject<CategoryAddType | null>();


  getCategories(activeUser: string): Observable<CategoryAddType[] | null> {
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
    this.getCategories(activeUser).subscribe(data => {
      let userCategory = data;
      if(userCategory === null || userCategory.length === 0) userCategory = []  
      const newUserCategoriesArray = userCategory.concat(categoriesArray)
      console.log(newUserCategoriesArray)
      const userArrayFromLS = localStorage.getItem(activeUser);
      if (userArrayFromLS !== null && userArrayFromLS.length > 0) {
        let userArray = JSON.parse(userArrayFromLS)
        const categoriesIndex = userArray.findIndex((item: {categories: CategoryAddType[]} | {categories: []}) => {
          return item.hasOwnProperty("categories");
        })
        if (categoriesIndex !== -1) {
          let newUserArray = userArray.splice(categoriesIndex, 1);
          console.log(newUserArray)
          this.auth.updateUser(activeUser, newUserArray)
        }
      }
    })

    this.categories$.next(categoriesArray);
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
