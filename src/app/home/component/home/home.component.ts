import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../authentication/service/authentication.service';
import {HomeService} from './home.service';
import {Tag} from '../../../models/tag';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displaySearchWizard= false;
  displayAddTagWizard= false;
  displayAddGiftWizard= false;
  displayLoadSearchWizard= false;
  displaySaveSearchWizard= false;
  loading = false;
  firstSearch = false;
  noResults = false;
  imageType : string = 'data:image/PNG;base64,';
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '768px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1
    }
  ];

  tags: Tag[] = [];
  extraTags: Tag[] = [];
  allProducts: any[] = [];
  categories: any[] = [];
  savedNames: any[] = [];

  submitted: boolean = false;

  constructor(private authenticationService: AuthenticationService,
              private homeService: HomeService,
              private sanitizer:DomSanitizer) {
  }

  ngOnInit(): void {
    this.homeService.getTags().subscribe((data: Tag[]) => {
      this.tags = data;
    });
    this.homeService.getOptionalTags().subscribe((data: Tag[]) => {
      this.extraTags = data;
    });
    this.homeService.getCategories().subscribe((data: Tag[]) => {
      this.categories = data;
    });
    // this.homeService.getProductsURL().subscribe((products: any) => this.allProducts = products.filter((product: any) => {
    //   this.loading = false;
    //   return product.imgURL ;
    // }));
    this.homeService.getAllReceiversOfUser().subscribe((data: any[]) => {
      this.savedNames = data;
    });
  }

  showSearchDialog() {
    this.displaySearchWizard = true;
  }

  showAddTagDialog() {
    this.displayAddTagWizard = true;
  }

  showAddGiftDialog() {
    this.displayAddGiftWizard = true;
  }

  showSaveSearchDialog() {
    this.displaySaveSearchWizard = true;
  }

  showLoadSearchDialog() {
    this.displayLoadSearchWizard = true;
  }

  getItemsByCategory(category: string | null): any[] {
    return this.allProducts.filter((product: any) => {
      return product.category === category;
    })
  }

  tagAdded() {
    this.displayAddTagWizard = false;
    this.homeService.getOptionalTags().subscribe((data: Tag[]) => {
      this.extraTags = data;
    });
  }

  searchSaved() {
    this.displaySaveSearchWizard = false;
    this.homeService.getAllReceiversOfUser().subscribe((data: any[]) => {
      this.savedNames = data;
    });
  }


  sanitizeImagePath(imageUrl: string){

    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  searchInitiated(tags: any) {
    this.loading = true;
    this.firstSearch = true;
    this.homeService.search(tags).subscribe(
      (products: any) => {
        this.loading = false;
        this.allProducts = products.filter((product: any) => {
          this.loading = false;
          return product.imgURL;
        });
        this.noResults = this.allProducts.length === 0;
      }
    );
    this.displaySearchWizard = false;
    this.displayLoadSearchWizard = false;
  }

  getImage(data: string) {
    return 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(data) as any).changingThisBreaksApplicationSecurity;
  }

  logout() {
    this.authenticationService.logout();
  }
}
