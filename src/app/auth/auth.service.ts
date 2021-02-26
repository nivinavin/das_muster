import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {firebase} from '@firebase/app';
import '@firebase/auth';
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from '@firebase/auth-types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) { 
    this.afAuth.authState.subscribe(
      user => {
        if(user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user))
        } else {
          localStorage.setItem('user', null);
        }
      }
    )
  }

  async login(email: string, password: string) : Promise<string> {
    var errorCode;
    var errorMessage;
    await this.afAuth.signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      errorCode = error.code;
      errorMessage = error.message;
      console.log("error" + error);
    })
    return errorCode;
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password)
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    localStorage.setItem('userEmail', JSON.stringify(passwordResetEmail))
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get isLoggedIn(): boolean {
    const user =JSON.parse(localStorage.getItem('user'));
    return user != null;
  }

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    this.router.navigate(['Home']);
  }
}
