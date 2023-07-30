import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(public http: HttpClient) {}
  getMenu(): any {
    return this.http.get('assets/sample.json');
  }
  getMenuList() {
    return this.http.get('http://localhost:8080/api/menu');
  }
  getMenuCategoryItemList(id: string) {
    return this.http.get(`http://localhost:8080/api/${id}/items`);
  }
  createItedmByCategory(id: any, data: any) {
    ///api/create/:category/item
    return this.http.put(`http://localhost:8080/api/create/${id}/item`, data);
  }
  login(logdata: any): any {
    return this.http.post('http://localhost:8080/api/login', logdata);
  }
  signUp(userdata: any) {
    return this.http.post('http://localhost:8080/api/signup', userdata);
  }
}
