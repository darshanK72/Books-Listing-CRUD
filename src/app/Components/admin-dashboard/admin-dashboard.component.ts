import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/Models/book';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('myForm')
  myform!: NgForm;

  @ViewChild('fileInputLabel')
  fileInputLable!:ElementRef;

  Math = Math;

  isInserting: boolean = false;
  isEditing: boolean = false;
  insertFile!:File;
  bookToEdit!: string;


  bookList: Book[] = [];

  constructor(private bookService: BookService,private renderer:Renderer2) {}

  ngOnInit(): void {
    this.bookList = [];
    this.bookService.getAllBooks().then((books) => {
      books.forEach((b) => {
        let book = { ...b.data(), bookId: b.id };
        this.bookList.push(book as Book);
      });

      this.bookList = this.bookList.sort((a: Book, b: Book) =>
        a.id > b.id ? 1 : -1
      );
    });
  }

  onInsertClicked() {
    this.isInserting = true;
    this.isEditing = false;
  }

  onInsertCancle() {
    this.isInserting = false;
  }

  onFormSubmit() {
    console.log(this.myform.value);
    if (this.isInserting) {
      this.isInserting = false;
      console.log(this.insertFile);
      let book :Book = {
        ...this.myform.value.insertDetails,
        id:this.bookList.length + 1
      }
      this.bookService.postBook(this.insertFile,book);
      this.bookList = [];
      this.ngOnInit();
    } 
    else if (this.isEditing) {
      this.isEditing = false;
      let book : Book = {
        ...this.myform.value.editDetails,
        bookId:this.bookToEdit
      }

      this.bookService.updateBook(book).then((data)=>{
        console.log(data);
      });

      this.bookList = [];
      this.ngOnInit();
    }
  }

  onFileSelect(event:any){
    let file = event.target.files[0];
    this.insertFile = file;
    console.log(this.fileInputLable.nativeElement);
    this.renderer.removeClass(this.fileInputLable.nativeElement,'btn-primary');
    this.renderer.addClass(this.fileInputLable.nativeElement,'btn-success');
    this.renderer.setProperty(this.fileInputLable.nativeElement,'innerText','Selected');
  }

  onEditClicked(bookId: string) {
    this.isEditing = true;
    this.isInserting = false;
    this.bookToEdit = bookId;

    this.bookService.getBook(bookId).then((data) => {
      this.myform.form.patchValue({
        editDetails: data.data(),
      });
    });
  }

  onClickDelete(bookId: string) {
    console.log(bookId);
    this.bookService.deleteBook(bookId).then((data)=>{
      console.log(data);
      this.ngOnInit();
    })
  }
  onEditCancled() {
    this.isEditing = false;
    this.bookToEdit = '';
  }
}
