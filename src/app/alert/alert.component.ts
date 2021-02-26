import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextToSpeachService } from '../service/text-to-speach.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  userNewEmailId:string 

  constructor(public router:Router, public textSpeech: TextToSpeachService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userEmail')) {
      const userEmail =JSON.parse(localStorage.getItem('userEmail'));
      this.userNewEmailId = userEmail;
      console.log(this.userNewEmailId);
      const finalData = "Password Reset Link is sent to your Email : ".concat(this.userNewEmailId);
      this.textSpeech.textToAudio(finalData);
    }
  }
  goToSignInPage() {
    this.router.navigate(['login']);
  }
}
