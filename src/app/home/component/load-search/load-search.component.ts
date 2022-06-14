import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../../../models/tag';
import {HomeService} from '../home/home.service';

@Component({
  selector: 'app-load-search',
  templateUrl: './load-search.component.html',
  styleUrls: ['./load-search.component.scss']
})
export class LoadSearchComponent implements OnInit {

  @Input()
  savedNames: any[] = [];

  @Output()
  close: EventEmitter<any> = new EventEmitter<any>();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

  searchByName(tags: any[]) {
    this.close.emit(tags.map(tag => tag.tagName || ''));
  }
}
