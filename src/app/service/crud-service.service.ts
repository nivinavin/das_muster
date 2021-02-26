import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Book } from '../shared/Book'

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<Book>;
  books: Book[]

  constructor(public db: AngularFireDatabase) { }

  AddBook(book: Book) {
    this.booksRef.push({
      author: book.author
    })
  }
  printData() {
    var ref = this.db.database.ref("/userinfo");
    console.log(ref.toJSON);
    ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});
  }

  GetBooksList() {
    this.booksRef = this.db.list('books');
    console.log(this.booksRef);
    this.booksRef.snapshotChanges().subscribe((data: any) => {  
      this.books = data.map((e: { payload: { data: () => any; }; }) => {  
        return {  
          author: e.payload.data.name,    
        } as Book;  
      });  
      console.log(this.books);  
    });
    return this.books;
  }

  UpdateBook(book: Book) {
    this.bookRef.update({
      author: book.author
    })
  }

  DeleteBook(id: string) {
    this.bookRef = this.db.object('books/'+id);
    this.bookRef.remove();
  }
}
