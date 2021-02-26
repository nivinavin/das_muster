import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})


export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  
  loadAPI: Promise<any>;

  constructor(public chat: ChatService, public authService: AuthService, public route:Router) {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
  });
   }

   public loadScript() {        
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = ["https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }

    }
}
  ngOnInit(): void {
    localStorage.clear();
    
    this.messages = this.chat.conversation.asObservable()
      .pipe(
        scan((acc, val) => acc.concat(val))
      )

      if(this.authService.isLoggedIn ){
        this.route.navigate(['home']);
      } else {
        this.route.navigate(['login']);
      }
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue= '';
  }
}