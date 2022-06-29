import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../../../models/tag';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    private tags: string[] = [];

    constructor(private httpClient: HttpClient) {
    }

    public getTags(): any {
        return this.httpClient.get<Tag[]>("assets/tags.json");
    }

    public addTag(name: string): any {
        return this.httpClient.post<any>(`${environment.webServiceEndpointURL}tag/addTag`, [{mandatory: 0, tagName: name}]);
    }

    public getOptionalTags(): any {
        return this.httpClient.get<Tag[]>(`${environment.webServiceEndpointURL}tag/getAllOptionalTags`);
    }

    public getProducts(): any {
        return this.httpClient.get<any>(`${environment.webServiceEndpointURL}item/getAll`);
    }

    public getAllReceiversOfUser(): any {
        return this.httpClient.get<any>(`${environment.webServiceEndpointURL}receiver/getAllReceiversOfUser?username=${localStorage.getItem('currentUsername') || ''}`);
    }

    public getCategories(): any {
        return this.httpClient.get<any>(`${environment.webServiceEndpointURL}category/getAllCategories`);
    }

    public getProductsURL(): any {
        return this.httpClient.get<any>(`${environment.webServiceEndpointURL}item/getItemsLists`);
    }

    public saveSearch(receiverName: string): any {
        return this.httpClient.post<any>(`${environment.webServiceEndpointURL}receiver/addTagsToReceiver?receiverName=${receiverName}&tags=${this.tags}&username=${localStorage.getItem('currentUsername') || ''}`, {});
    }

    public addNewItemWithTags(item: any, tags: string[]): any {
      return this.httpClient.post<any>(`${environment.webServiceEndpointURL}item/addNewItemWithTags?tags=${tags}`, item);
    }

    public search(selectedTagNames: string[]): any {
        this.tags = selectedTagNames;
        return this.httpClient.get<any>(`${environment.webServiceEndpointURL}item/getSuggestedItems?selectedTagNames=${selectedTagNames}`);
    }

    public deleteReceiver(receiverName: string): any {
        return this.httpClient.delete<any>(`${environment.webServiceEndpointURL}receiver/deleteReceiver?receiverName=${receiverName}`);
    }
}
