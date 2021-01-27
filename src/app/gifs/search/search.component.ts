import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!:ElementRef<HTMLInputElement>; //(!) Not Null assignation operator
  search() {
    const value = this.txtSearch.nativeElement.value;

    console.log(value);

    this.txtSearch.nativeElement.value = '';
  }
}