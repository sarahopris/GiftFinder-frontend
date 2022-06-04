import {Component, Input, OnInit} from '@angular/core';
import {Tag} from '../../../models/tag';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-add-gift',
  templateUrl: './add-gift.component.html',
  styleUrls: ['./add-gift.component.scss']
})
export class AddGiftComponent implements OnInit {

  @Input()
  tags: Tag[] = [];

  optionalTags: Tag[] = [];
  genders: Tag[] = [];
  budgets: Tag[] = [];
  ages: Tag[] = [];
  occasions: Tag[] = [];
  relationships: Tag[] = [];
  activeIndex = 0;
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

  constructor() { }

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

  search() {
  }

}
