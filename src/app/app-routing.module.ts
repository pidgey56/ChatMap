import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { AuthentificatedGuard } from './guards/authentificated.guard';
import { NotloggedGuard } from './guards/notlogged.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupFormComponent,
    canActivate: [NotloggedGuard],
  },
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [NotloggedGuard],
  },
  {
    path: 'chat',
    component: ChatroomComponent,
    canActivate: [AuthentificatedGuard],
  },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
