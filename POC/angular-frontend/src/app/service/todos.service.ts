import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../model/todo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private _http: HttpClient) { }
  // Get All Todos  
  getAllTodos() {
    return this._http.get(`${environment.baseUrl}notes`);
  }

  // To save the Todo Object
  saveTodos(hours: number, todo: any) {
    console.log(todo)
    return this._http.post(`${environment.baseUrl}notes`, todo);
  }


  // Update Todo
  updateTodos(id: number, todo) {
    return this._http.put(`${environment.baseUrl}notes/${id}`, todo);
  }

  // Delete Todo
  deleteTodos(id: number) {
    return this._http.delete(`${environment.baseUrl}notes/${id}`)
  }

  // Delete Multiple
  deleteMultiple(id: number, multipleDelete) {
    console.log("ram:")
    return this._http.delete(`${environment.baseUrl}notes/multipleDelete`, multipleDelete);
  }

}

