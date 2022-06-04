import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-load-search',
  templateUrl: './load-search.component.html',
  styleUrls: ['./load-search.component.scss']
})
export class LoadSearchComponent implements OnInit {

  @Input()
  savedNames = ['Mom', 'John', "Steve", "Mary", "Tupac"]

  constructor() { }

  ngOnInit(): void {
  }

  searchByName(name: any) {

  }
}
