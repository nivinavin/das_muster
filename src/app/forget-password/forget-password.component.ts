import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TextToSpeachService } from '../service/text-to-speach.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm;
  loadingCircle: boolean = false;
  signInLoading: boolean = false;
  submitted = false;

  constructor(
              public authService: AuthService,
              public textSpeach: TextToSpeachService,
              public router: Router,
              public activatedRouter: ActivatedRoute,
              public formBuilder: FormBuilder) { 
                this.forgetPasswordForm = this.formBuilder.group({
                  email: ["",Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]
                })
              }

  ngOnInit(): void {
    console.log("You are in Forget Password Page");
    this.textSpeach.textToAudio("You are in Forget Password Page");
  }

  onFOrgetPassword() {
    this.delay(300);
    this.loadingCircle = true;
    this.submitted = true;
        // stop here if form is invalid
        if (this.forgetPasswordForm.invalid) {
            alert("Please Enter Another Email ID")
            return false;
        }
    console.log(this.authService.sendPasswordResetEmail(this.forgetPasswordForm.controls['email'].value));
    
    this.router.navigate(['alert']);
  }

  onSignIn(){
    this.router.navigate(['login']);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

speakIt(data: string) {
  console.log(data);
  this.textSpeach.textToAudio(data);
}
}
