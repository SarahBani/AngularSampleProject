import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../models/IBook.model';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() private model: IBook;

  constructor() { }

  public ngOnInit(): void {
  }

}
