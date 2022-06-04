import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../../../models/tag';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  public getTags(): any {
    return this.httpClient.get<Tag[]>("assets/tags.json");
  }

  public getOptionalTags(): any {
    return this.httpClient.get<Tag[]>(`${environment.webServiceEndpointURL}tag/getAllOptionalTags`);
  }

  public getProducts(): any {
    return this.httpClient.get<any>(`${environment.webServiceEndpointURL}item/getAll`);
  }

  public getCategories(): any {
    return this.httpClient.get<any>(`${environment.webServiceEndpointURL}category/getAllCategories`);
  }

  public getProductsURL(): any {
    return this.httpClient.get<any>(`${environment.webServiceEndpointURL}item/getItemsLists`);
  }

  public search(receiverName: string, tags: string[], username: string): any {
    return this.httpClient.post<any>(`${environment.webServiceEndpointURL}receiver/addTagsToReceiver?receiverName=${receiverName}&tags=${tags}&username=${username}`, {});
  }
}
