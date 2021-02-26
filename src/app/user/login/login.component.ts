import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TextToSpeachService } from 'src/app/service/text-to-speach.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  loginDetailsForm: FormGroup;
  isLoggedIn = false;
  loggedIn: string;
  loadingCircle: boolean = false;
  loadingGoogle: boolean = false;
  loadingReset: boolean = false;

  constructor(public textSpeach: TextToSpeachService,
              public authService: AuthService, 
              public router: Router,
              public formBuilder: FormBuilder) { 
                this.loginDetailsForm = this.formBuilder.group({
                email: ["",Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
                password: ''
              })
                }

  ngOnInit(): void {
    this.textSpeach.textToAudio("Welcome To DB First Virtual Heckathon")
    this.isLoggedIn = true;
  }

  login(email: string, password: string) {
    return this.authService.login(email, password);
  }

  async onLogin() {
    await this.delay(300);
    this.loadingCircle = true;
    this.submitted = true;

        // stop here if form is invalid
        if (this.loginDetailsForm.invalid) {
          
          alert("please Enter Email and Password");
            return false;
        }
    // this.playAudio("../../../assets/sound/beep-07.mp3");
    console.log(this.loginDetailsForm)
    this.loggedIn =await this.login(this.loginDetailsForm.controls['email'].value, this.loginDetailsForm.controls['password'].value)
    if(this.loggedIn === "auth/user-not-found" || this.loggedIn === "auth/wrong-password")
    {
      this.loadingCircle = false;
      console.log(this.loggedIn);
      this.router.navigate(['login']);
    }
    else {
      this.isLoggedIn=false;
        this.router.navigate(['home']);
    }
  }

  playAudio(fileName: string){
    let audio = new Audio();
    audio.src = fileName;
    audio.load();
    audio.play();
  }
  

  onReset() {
    this.submitted = false;
    this.loginDetailsForm.reset();
  }

  loginWithGoogle() {
    this.loadingGoogle = true;
    this.authService.loginWithGoogle();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

speakIt(data: string) {
  console.log(data);
  this.textSpeach.textToAudio(data);
}
}