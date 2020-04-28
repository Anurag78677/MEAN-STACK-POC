import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-custom-validation',
  templateUrl: './custom-validation.component.html',
  styleUrls: ['./custom-validation.component.css']
})
export class CustomValidationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkTitle(control: AbstractControl): { [key: string]: any } | null {
    const title: string = control.value;

    if (title === '' || title !== 'mp') {
      return null;
    } else {
      return { isTitleExist: true };
    }
  }

}
