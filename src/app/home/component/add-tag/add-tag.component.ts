import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {

  loading = false;
  submitted = false;
  isFormInvalid = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  get formControls() {
    return this.form.controls;
  }

}
