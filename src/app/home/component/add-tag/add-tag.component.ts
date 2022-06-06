import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../home/home.service';

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
  tag: string = '';

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private homeService: HomeService) {
    this.form = this.formBuilder.group({
      tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.homeService.addTag(this.tag).subscribe(
        (data: any) => {
          this.closeAndClear();
        },
        () => {
          this.closeAndClear();
        }
    );
  }

  closeAndClear() {
    this.tag = '';
    this.close.emit(true);
  }

  get formControls() {
    return this.form.controls;
  }

}
