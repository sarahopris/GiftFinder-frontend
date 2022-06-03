import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../../../models/tag';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  public getTags(): any {
    return this.httpClient.get<Tag[]>("assets/tags.json");
  }
}
