import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../home/home.service';

@Component({
  selector: 'app-save-search',
  templateUrl: './save-search.component.html',
  styleUrls: ['./save-search.component.scss']
})
export class SaveSearchComponent implements OnInit {
  loading = false;
  submitted = false;
  form: FormGroup;
  name: string = '';

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private formBuilder: FormBuilder,
              private homeService: HomeService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.form.controls;
  }

  search() {
    this.homeService.saveSearch(this.name).subscribe(
        () => this.closeAndClear(), () => this.closeAndClear()
    );
  }

  closeAndClear() {
    this.name = '';
    this.close.emit(true);
  }
}
