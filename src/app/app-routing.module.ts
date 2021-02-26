import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { AlertComponent } from './alert/alert.component';

const routes: Routes = [
  { path : 'login', component: LoginComponent},
  { path : 'home', component: ChatBotComponent},
  { path : 'forgetPassword', component: ForgetPasswordComponent},
  {  path : 'alert', component: AlertComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
