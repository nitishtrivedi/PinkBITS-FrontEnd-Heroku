import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';

export const uiSharedLibRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule, ButtonModule],
  declarations: [BannerComponent, SliderComponent, GalleryComponent ],
  exports: [BannerComponent, SliderComponent, GalleryComponent],
})
export class UiSharedLibModule {}
