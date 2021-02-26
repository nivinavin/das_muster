import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireList } from '@angular/fire/database';
import { CrudServiceService } from '../service/crud-service.service';
import { Book } from '../shared/Book';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})

export class ChatBotComponent implements OnInit {
  sampleData:any
  userName: string;
  public books: AngularFireList<Book[]>;
  book: Book[];

  constructor(public authService: AuthService, public route:Router, public db: CrudServiceService) {
      this.db.printData();
      // this.sampleData = this.db.GetBooksList('navin.kumar@db.com');
      // console.log(this.sampleData);
      
   }

  ngOnInit(): void {

    if(!this.authService.isLoggedIn) {
      this.route.navigate(['login']);
    } else {
      const user =JSON.parse(localStorage.getItem('user'));
      this.userName = user.email;
      console.log(this.userName);
    }

  }

  logout() {
    this.authService.logout();
    this.route.navigate(['login']);
  }

}
