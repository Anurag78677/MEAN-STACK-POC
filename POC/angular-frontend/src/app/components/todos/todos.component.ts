import { Component, OnInit } from '@angular/core';
import { TodosService } from 'src/app/service/todos.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { CustomValidationComponent } from 'src/app/model/common/custom-validation/custom-validation.component';
import { formValidation } from '../../model/common/constants/validation-constant';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoForm: FormGroup;
  todos:any;
  editMode: boolean;
  selected = [];
  isSelected: boolean;
  todoId;
  validationMessage = formValidation;
  
  constructor(private todoService: TodosService,
    private fb: FormBuilder,) {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required, new CustomValidationComponent().checkTitle]),
      content: new FormControl('', [Validators.required]),
      // hours: new FormControl('', [Validators.required])
    });
    this.editMode = false;
    this.isSelected = false;
  }

  ngOnInit() {
    this.getTodosList();
    this.isSelected = false;
  }

  // Get All Todo List
  getTodosList() {
    this.todoService.getAllTodos().subscribe((result: any) => {
      console.log('Result: ', result);
      this.todos = result;
      result.reverse();
    });
  }

  // Add new Todo
  addTodo() {
    console.log('save value: ', this.todoForm.value);
    const todo = {
      title: this.todoForm.value.title,
      content: this.todoForm.value.content
    }
    this.todoService.saveTodos(this.todoForm.value, todo).subscribe((data: any) => {
      console.log('data', data);
      // if (data.status === 'SUCCESS') {
        Swal.fire({
          title: 'Successfuly Save...',
          timer: 1500,
          showConfirmButton: false
        });
        this.getTodosList();
        this.todoForm.reset();
    });
  }

  // Edit Todo
  editTodo(_id: number) {
    console.log('Edit: ', _id);
    this.editMode = true;
    this.todos.filter((todo) => todo._id === _id).map((todoDetails) => {
      console.log('Value:', todoDetails);
      this.todoId = _id;
      this.todoForm = new FormGroup({
        title: new FormControl(todoDetails.title, [Validators.required]),
        content: new FormControl(todoDetails.content, [Validators.required]),
      });
    });
  }

  // Update Todo
  updateTodo() {
    console.log('Update: ', this.todoId);
    const todo = {
      title: this.todoForm.value.title,
      content: this.todoForm.value.content
    }
    this.todoService.updateTodos(this.todoId, todo).subscribe((data: any) => {
       this.getTodosList();
       this.todoForm.reset();
    });
  }

  // Delete Todo
  deleteTodo(_id: number) {
    console.log('Delete: ', _id);
    this.todoService.deleteTodos(_id).subscribe((data: any) => {
      console.log('data', data);
      Swal.fire({
        title: 'Successfuly Deleted...',
        timer: 1500,
        showConfirmButton: false
      });
      this.getTodosList();
    });
  }

  // Reset Form
  reset() {
    this.editMode = false;
  }

}
