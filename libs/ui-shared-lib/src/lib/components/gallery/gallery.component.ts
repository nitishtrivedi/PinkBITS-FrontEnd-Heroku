import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-pinkbits-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  //Global Variables

  selectedImageURL: string;

  @Input() images: string[];

  constructor() { }

  ngOnInit(): void {
    if (this.images.length) {
      this.selectedImageURL = this.images[0];
    }
  }

//Functions

  changeSelectedImage(imageURL: string) {
    this.selectedImageURL = imageURL;
  }

  get hasImages() {
    return this.images?.length > 0;
  }

}
