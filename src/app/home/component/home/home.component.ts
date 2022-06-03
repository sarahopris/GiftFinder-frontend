import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../authentication/service/authentication.service';
import {MenuItem} from 'primeng/api';
import {HomeService} from './home.service';
import {Tag} from '../../../models/tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayMaximizable= false;

  activeIndex = 0;

  tags: Tag[] = [];
  optionalTags: Tag[] = [];
  gender: Tag = {};
  budget: Tag = {};
  age: Tag = {};
  occasion: Tag = {};
  relationship: Tag = {};

  personalInformation: any;

  submitted: boolean = false;

  items: MenuItem[] =  [
    {label: 'I need a gift for ...',
      command: (event: any) => {
        this.activeIndex = 0;
      }},
    {label: 'How old is it?',
      command: (event: any) => {
        this.activeIndex = 1;
      }},
    {label: 'Your relationship with it',
      command: (event: any) => {
        this.activeIndex = 2;
      }},
    {label: 'What\'s your budget for this gift?',
      command: (event: any) => {
        this.activeIndex = 3;
      }},
    {label: 'So many reasons to give an awesome gift! What are you celebrating?',
      command: (event: any) => {
        this.activeIndex = 4;
      }},
    {label: 'What does he enjoy in his free time?',
      command: (event: any) => {
        this.activeIndex = 5;
      }},
  ];

  constructor(private authenticationService: AuthenticationService,
              private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.getTags().subscribe((data: Tag[]) => {
      this.tags = data;
    });
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

  showMaximizableDialog() {
    this.displayMaximizable = true;
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

  search() {
    console.log(this.optionalTags);
  }

  nextPage() {
    this.activeIndex++;
  }

  backPage() {
    this.activeIndex--;
  }

  logout() {
    this.authenticationService.logout();
  }
}
