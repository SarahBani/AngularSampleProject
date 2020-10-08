import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../models/IBook.model';
import { BookService } from '../../services/book-service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {

  @Input() model: IBook;

  constructor(private bookService: BookService) { }

  public ngOnInit(): void {
  }

  private onSelect(): void {
    this.bookService.select(this.model);
  }

}
