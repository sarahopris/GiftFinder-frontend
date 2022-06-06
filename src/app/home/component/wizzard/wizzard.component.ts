import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../../models/tag';
import {MenuItem} from 'primeng/api';
import {HomeService} from '../home/home.service';

@Component({
  selector: 'app-wizzard',
  templateUrl: './wizzard.component.html',
  styleUrls: ['./wizzard.component.scss']
})
export class WizzardComponent implements OnInit {

  @Input()
  tags: Tag[] = [];

  @Input()
  extraTags: Tag[] = [];

  @Output()
  close: EventEmitter<any> = new EventEmitter<any>();

  optionalTags: Tag[] = [];
  gender: Tag = {};
  budget: Tag = {};
  age: Tag = {};
  occasion: Tag = {};
  relationship: Tag = {};
  activeIndex = 0;
  items: MenuItem[] =  [
    {label: 'Gender',
      command: (event: any) => {
        this.activeIndex = 0;
      }},
    {label: 'Age?',
      command: (event: any) => {
        this.activeIndex = 1;
      }},
    {label: 'Relationship',
      command: (event: any) => {
        this.activeIndex = 2;
      }},
    {label: 'Budget',
      command: (event: any) => {
        this.activeIndex = 3;
      }},
    {label: 'Reason',
      command: (event: any) => {
        this.activeIndex = 4;
      }},
    {label: 'Hobbies',
      command: (event: any) => {
        this.activeIndex = 5;
      }},
  ];

  constructor(private service: HomeService) {
  }

  ngOnInit(): void {
  }

  getTagsByCategory(category: string | null): Tag[] {
    return this.tags.filter((tag: Tag) => {
      return tag.category === category;
    })
  }

  getRelationshipTags(): Tag[] {
    return this.getTagsByCategory('relationship').filter((tag: Tag) => {
      return tag.value[0] === parseInt(this.gender.value) && tag.value[1] <= parseInt(this.age.value);
    })
  }

  selectGender(tag: Tag) {
    this.gender = tag;
    this.nextPage();
  }

  selectAge(tag: Tag) {
    this.age = tag;
    this.nextPage();
  }

  selectBudget(tag: Tag) {
    this.budget = tag;
    this.nextPage();
  }

  selectRelationship(tag: Tag) {
    this.relationship = tag;
    this.nextPage();
  }

  selectOccasion(tag: Tag) {
    this.occasion = tag;
    this.nextPage();
  }

  nextPage() {
    this.activeIndex++;
  }

  backPage() {
    this.activeIndex--;
  }

  search() {
    this.close.emit([this.gender, this.age, this.relationship, this.budget, this.occasion, ...this.optionalTags].map(tag => tag.tagName || ''));
    this.optionalTags = [];
    this.gender = {};
    this.budget= {};
    this.age = {};
    this.occasion = {};
    this.relationship = {};
    this.activeIndex = 0;
    this.activeIndex = 0;
  }
}
