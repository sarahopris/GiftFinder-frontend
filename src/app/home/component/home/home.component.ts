import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../authentication/service/authentication.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayMaximizable= false;

  activeIndex = 0;

  personalInformation: any;

  submitted: boolean = false;

  items: MenuItem[] =  [
    {label: 'Choose gender',
      command: (event: any) => {
        this.activeIndex = 0;
      }},
    {label: 'Step 2',
      command: (event: any) => {
        this.activeIndex = 1;
      }},
    {label: 'Step 3'}
  ];

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
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
