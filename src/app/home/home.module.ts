import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './component/home/home.component';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {StepsModule} from 'primeng/steps';
import {CardModule} from 'primeng/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectButtonModule} from 'primeng/selectbutton';
import { WizzardComponent } from './component/wizzard/wizzard.component';
import { AddTagComponent } from './component/add-tag/add-tag.component';
import {TranslateModule} from '@ngx-translate/core';
import { AddGiftComponent } from './component/add-gift/add-gift.component';
import { SaveSearchComponent } from './component/save-search/save-search.component';
import { LoadSearchComponent } from './component/load-search/load-search.component';
import {CarouselModule} from 'primeng/carousel';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [
    HomeComponent,
    WizzardComponent,
    AddTagComponent,
    AddGiftComponent,
    SaveSearchComponent,
    LoadSearchComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    DialogModule,
    ButtonModule,
    StepsModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    TranslateModule,
    CarouselModule,
    ProgressSpinnerModule,
    SplitButtonModule,
    DropdownModule
  ]
})
export class HomeModule {
}
