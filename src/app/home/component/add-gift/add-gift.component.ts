import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Tag} from '../../../models/tag';
import {MenuItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomeService} from "../home/home.service";

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.scss']
})
export class AddGiftComponent implements OnInit {

  @Input()
  tags: Tag[] = [];
  @Input()
  categories: string[] = [];
  @Input()
  extraTags: Tag[] = [];

  form: FormGroup;
  optionalTags: Tag[] = [];
  genders: Tag[] = [];
  budgets: Tag[] = [];
  ages: Tag[] = [];
  occasions: Tag[] = [];
  relationships: Tag[] = [];
  activeIndex = 0;
  fileName: string = '';
  image: any | null = null;
  items: MenuItem[] =  [
    {label: 'Details',
      command: (event: any) => {
        this.activeIndex = 0;
      }},
    {label: 'Gender',
      command: (event: any) => {
        this.activeIndex = 1;
      }},
    {label: 'Age?',
      command: (event: any) => {
        this.activeIndex = 2;
      }},
    {label: 'Relationship',
      command: (event: any) => {
        this.activeIndex = 3;
      }},
    {label: 'Budget',
      command: (event: any) => {
        this.activeIndex = 4;
      }},
    {label: 'Reason',
      command: (event: any) => {
        this.activeIndex = 5;
      }},
    {label: 'Hobbies',
      command: (event: any) => {
        this.activeIndex = 6;
      }},
  ];

  close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private homeService: HomeService) {
    this.form = this.formBuilder.group({
      itemName: ['', Validators.required],
      categoryName: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  getTagsByCategory(category: string | null): Tag[] {
    return this.tags.filter((tag: Tag) => {
      return tag.category === category;
    })
  }

  nextPage() {
    this.activeIndex++;
  }

  backPage() {
    this.activeIndex--;
  }


  get formControls() {
    return this.form.controls;
  }

  handleFileInput(event: any) {
    // const target = files as HTMLInputElement;
    this.image = event.target.files?.item(0);
    this.fileName = this.image.name;
    this.formControls['image'].setValue(this.fileName);
  }

  upload() {
    // this.close.emit([...this.genders, ...this.ages, ...this.relationships, ...this.budgets, ...this.occasions, ...this.optionalTags].map(tag => tag.tagName || ''));
    // this.optionalTags = [];
    // this.genders = [];
    // this.budgets= [];
    // this.ages = [];
    // this.occasions = [];
    // this.relationships = [];
    // this.activeIndex = 0;
    const fd = new FormData();
    fd.append('itemName', this.formControls['itemName'].value);
    fd.append('categoryName', this.formControls['categoryName'].value.categoryName);
    fd.append('image', this.image);
    const giftTags = [...this.genders, ...this.ages, ...this.relationships, ...this.budgets, ...this.occasions, ...this.optionalTags].map(tag => tag.tagName || '');
    this.homeService.addNewItemWithTags(fd, giftTags).subscribe();
  }

}
